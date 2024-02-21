![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/mylesvarns/PixelArtGenerator/main.yml)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fmylesvarns%2FPixelArtGenerator%2Fblob%2Fmain%2F.github%2Flogs%2Fbrakeman_status.json&query=%24.status&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAMAAAD3Y3VMAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAHdUExURQMGDQQGCAUHCAMFBgQGBwUGBwQFBgIEBAAAAAMEBAMEBQABAQAAAQQGBwQHBwUGCAQGCAQHCAUHCAQGBwQGBwQHBwQGBwQGBwQHCAQGBwQGBwQGBwUGBwQGBwQGBwQGBwQGBwQGBwUHBwUGBwQFCAAAAAQGBwQGBwQGCAUHCAAAAAAAAAAAAAAAAQAAAAQGBwQGBwUGCAUHCAAAAAAAAAcHCRYXGhgZHQoKDAEBAQQGBwUGCAQGBwEBAQUFBiUnKkFCRjk7Px0eIQICAwQFBgQGBwUHCAMFBQQFBQsLDBcWGBsZGhgXGQwNDgMEBQQHCAUHCAIDAwgKCzAYHTEbHw0PEQIDAwUGCAQGBwIDAwgLDkUfIUkkKBwfJAEDAwQGBwUHBwIEBAYICSoYGS4dHxMVGAIDAwQGBwUHCAMEBAECAh8gIyIhIxIOECMiIycoKwUFBgIDAwUHCAECAgAAAB0dHy8xMykqLDIzNiUmKAQEBQEBAQAAAAAAACYmKFRUWFpaXmBgZEFCRgkKDAAAAAAAAAwMDSUlKC8vMzc4PCMkKAUFBwAAAAAAAAAAAAEBAgMDBQQEBgEBAgAAAAMDBHgmKWwsKXcmKI8xMpEtMowuMWspJ2YfJmclJf%2F%2F%2F1g8240AAACUdFJOUwAAAAAAAAAAAAAAAAAniaGZn48wKpVMEAQNQpM3C4k9LZEUgQECclJeXUqLiY1LTnhWYSmo0OXZrCtvU7y92OXv7eG%2BtV%2Bc4v75%2B%2Fz8%2FOadc9LZ9Pjd1XJHl7f0%2BsWeRUynzfb7165LJL%2FX7%2Fr%2B%2FPTdwSNg1evz%2BPnx2F8dr9nl7O3ishurz9fb29OrCoezsbKztQtKdIUWAAAAAWJLR0Sen7KjCwAAAAd0SU1FB%2BgCFRQiGIQ1ElgAAAB9SURBVAgdBcGxaUJRGAbQe%2B770e%2F5LAIpLIJNkPRZwcZhnMUhskbAwhGygmKRJqkFBc%2FRLIF%2F6gXg15prd%2B9vVC%2B1bu1y3ujj7Po%2Bm%2Bcj4%2BgT4O%2B1FgCTmgC7b7XAluMpKhgIKhgIKvhhguwBDjWMgFvVI4DbvbckSfK1ak85fhNEJ101yAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wMi0yMVQyMDozNDoyNCswMDowMJnQ0%2B0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDItMjFUMjA6MzQ6MjQrMDA6MDDojWtRAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTAyLTIxVDIwOjM0OjI0KzAwOjAwv5hKjgAAAABJRU5ErkJggg%3D%3D&logoColor=white&label=brakeman)


Welcome to the Pixel Art Generator! This web application allows users to create pixel art easily by providing a canvas with customizable grid sizes and various features for an enhanced pixel art creation experience. Or at least, that is what one would hope. The truth is that at the moment this is just being used as a PoC and test image for CI/CD automation processes. It works, but you can find better images elsewhere as I just spun this app up from scratch in a day with no real plan on what to throw into it.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - Acquire Image
    - [Building from Source](#1a-recommended-building-from-source)
    - [Pulling from Docker Hub](#1b-pulling-from-docker-hub)
  - Deploy Container
    - [Docker CLI or Similar (Yacht, Portainer, etc)](#2a-docker-cli-or-similar-yacht-portainer-etc)
      - [Generating SECRET_KEY_BASE](#generating-secret-key-base)
    - [Deploy Container with Terraform](#2b-deploy-container-with-terraform)
- [Usage](#usage)
  - [Main Webpage](#main-webpage)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the Pixel Art Generator, follow the instructions below.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Bundler](https://bundler.io/)

Optional:
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) (for deploying with Terraform if desired)

# Installation

## 1a (Recommended): Building from Source

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pixel-art-generator.git
   ```

2. Change into the project directory:

   ```bash
   cd pixel-art-generator
   ```

3. docker build -t pixel-art-generator .

   ```bash
   docker build -t pixel-art-generator .
   ```

  Skip 1b and move to [Docker Installation](#docker-installation) for next steps
  

## 1b: Pulling from Docker Hub

If you prefer not to build the image locally, you can pull the Docker image directly from Docker Hub:

```bash
docker pull mylesvarns/pixelartgenerator
```

## 2a. Docker cli or similar (Yacht, Portainer, etc)

Run the following Docker command to start the Pixel Art Generator:

```bash
docker run -p 3000:3000 3001:3001 -e SECRET_KEY_BASE=$(docker run --rm pixel-art-generator bin/rails secret) pixel-art-generator
```
#### Generating SECRET_KEY_BASE

When creating the container manually you will need to state the SECRET_KEY_BASE value before running the app or you will get an immediate termination of the container. The secret key base is the string that Rails uses to encrypt your credentials file. If the above docker run command does not work due to permissions, then it is recommended that you generate a new `SECRET_KEY_BASE` value using one of the following commands:

- Linux/Mac:

  ```bash
  < /dev/urandom tr -dc 'a-zA-Z0-9' | head -c 64
  ```

- Windows (PowerShell):
  ```powershell
  $randomString = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
  $randomString
  ```
## 2b: Deploy container with Terraform

If you prefer using Terraform to manage your infrastructure, you can deploy the Pixel Art Generator with the following steps:

1. Install Terraform on your machine. You can follow the official installation guide [here](https://learn.hashicorp.com/tutorials/terraform/install-cli).

2. Create a terraform file, in this case we will call it `main.tf`, with the following content:

   ```hcl
   terraform {
     required_providers {
       docker = {
         source  = "kreuzwerker/docker"
         version = "~> 3.0.2"
       }
     }
   }

   resource "random_password" "rails_secret_key_base" {
     length  = 64
     special = true
   }

   provider "docker" {
     host = "npipe:////.//pipe//docker_engine"
   }

   resource "docker_image" "pixelartgenerator" {
     name = "pixelartgenerator:0.1"
   }

   resource "docker_container" "pixelartgenerator" {
     image = docker_image.pixelartgenerator.name
     name  = "pixelartgenerator"
     logs  = true

     ports {
       internal = 3000
       external = 3000
     }

     ports {
       internal = 3001
       external = 3001
     }

     env = [
       "SECRET_KEY_BASE=${random_password.rails_secret_key_base.result}",
     ]
   }

   ```

3. Replace the docker provider above with this if you are using windows and docker instead of linux.

   ```hcl
   provider "docker" {
     host = "npipe:////.//pipe//docker_engine"
   }
   ```

   #### If you have changed the default path to your docker_engine from the defaults on windows, linux, or mac, then you must enter that path correctly in the above code instead.

4. Run the following commands in your terminal:

   ```bash
   terraform init
   terraform apply
   ```
5. Terraform will prompt you to confirm the changes. Type yes to proceed.
6. Voila. The image is now running as a container.


## Usage

The application will be accessible at http://localhost on ports 3000 (http) and 3001 (https) by default. If you have this behind a reverse proxy then you will need to follow the configuration requirements for your proxy setup.

### Main Webpage

Main webpage allows you to select a pixel grid size and upload an image that will be pixalated. 

## Customization

To modify this page, open the `index.html.erb` file located in `app/views/pixel_art_generator/` within the container to view the main webpage. This HTML file contains the structure for the Pixel Art Generator interface. Note that any change you make to the running container will not persist and is recommended. If you plan on modifying, it is recommened to build from source so you can modify the container and rebuild it when required.

Customize the appearance of the Pixel Art Generator by modifying the CSS file located at `app/assets/stylesheets/pixel_art_generator.css`. Adjust pixel sizes, container styles, and button appearances as needed.

For additional functionality, explore the JavaScript file at `app/assets/javascripts/pixel_art_generator.js`. The main logic for pixel manipulation and canvas creation resides here.

Note that any functions you add to the .js file where you expect user interaction to work with will require a corresponding element in the html.erb file, a depending on what it is likely a small change to the .css file to make it look correct.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the Pixel Art Generator.

## License

This project is licensed under the [MIT License](LICENSE).
