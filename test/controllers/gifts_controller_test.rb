require 'test_helper'

class GiftsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "index" do
    get('/gifts')
    assert_equal(
      [Serializers::GiftSerializer.new(gifts(:one)).to_h].to_json,
      @response.body
    )
  end

  test "create" do
    sign_in users(:one)
    payload = {
      gift: {
        name: "Smokey Quartz",
        description: "This is a beautifl crystal"
      }
    }
    assert_changes "Gift.count", +1 do
      post('/gifts', params: payload.to_json)
    end
    assert_equal(
      [Serializers::GiftSerializer.new(Gift.last)].to_json,
      @response.body
    )
  end

   test "create - not authorized" do
    payload = {}
    assert_no_changes "Gift.count"  do
      post('/gifts', params: payload.to_json)
    end
    assert_response 401
  end

end
