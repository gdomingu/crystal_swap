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
        description: "This is a beautiful crystal",
        receiver_id: 2
      }
    }
    assert_changes "Gift.count", +1 do
      post('/gifts', params: payload)
    end
    gift = Gift.last
    assert_equal(users(:one), gift.gifter)
    assert_nil(gift.receiver_id, "expected receiver_id to be nil")
    assert_equal(
      Serializers::GiftSerializer.new(gift).to_h.to_json,
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
