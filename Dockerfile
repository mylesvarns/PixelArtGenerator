# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.3
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Install packages needed for SSL and build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    openssl build-essential git libvips pkg-config \
    curl libsqlite3-0 libvips && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Generate self-signed SSL certificates in /app/ssl directory
RUN mkdir -p /rails/app/ssl && \
    openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
    -keyout /rails/app/ssl/server.key -out /rails/app/ssl/server.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"

# Copy application code
COPY . .

# Throw-away build stage to reduce size of final image, though still chunky, need to refine it further later
FROM base as build

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Adjust binfiles to be executable on Linux
RUN chmod +x bin/* && \
    sed -i "s/\r$//g" bin/* && \
    sed -i 's/ruby\.exe$/ruby/' bin/*

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile

# Final stage for app image
FROM base as final

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails /rails/db /rails/log /rails/storage /rails/tmp

# Configure Rails to use SSL from /rails/app/ssl directory
COPY --from=build /rails/app/ssl /rails/app/ssl

# Change permissions for SSL files
RUN chmod 600 /rails/app/ssl/server.key /rails/app/ssl/server.crt

# Entrypoint prepares the database and generates secret key base.
COPY --from=build /rails/bin/docker-entrypoint /rails/bin/docker-entrypoint
RUN chmod +x /rails/bin/docker-entrypoint

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000 3001
CMD ["./bin/rails", "server"]
