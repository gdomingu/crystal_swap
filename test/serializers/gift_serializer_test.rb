require 'test_helper'

class GiftSerializerTest < ActiveSupport::TestCase
  test "it must have a name and a user" do
    gift = gifts(:one)
    expected = {
      id: gift.id,
      name: gift.name,
      description: gift.description,
      gift_from: {
        id: gift.user_id,
        email: gift.user.email,
      }
    }.to_json
    assert_equal(expected, GiftSerializer.new(gift).to_json)
  end
end