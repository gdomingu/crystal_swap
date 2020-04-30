require 'test_helper'

class GiftsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "index" do
    sign_in users(:one)
    get('/gifts')
    assert_equal(
      [Serializers::GiftSerializer.new(gifts(:one))].to_json,
      @response.body
    )
  end
end
