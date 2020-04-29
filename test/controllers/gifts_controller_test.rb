require 'test_helper'

class GiftsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "index with no user logged in " do
    get('/gifts')
    assert_equal(
      [].to_json,
      @response.body
    )
  end

  test "index with user logged in " do
    sign_in users(:one)
    get('/gifts')
    assert_equal(
      [GiftSerializer.new(gifts(:one))].to_json,
      @response.body
    )
  end
end
