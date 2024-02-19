require "test_helper"

class PixelArtGeneratorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pixel_art_generator_index_url
    assert_response :success
  end
end
