require 'test_helper'

class GiftSerializerTest < ActiveSupport::TestCase
  test "it correctly serializes" do
    gift = gifts(:one)
    expected = {
      id: gift.id,
      name: gift.name,
      description: gift.description,
      gift_from: {
        id: gift.gifter.id,
        email: gift.gifter.email,
      }
    }
    assert_equal(expected, Serializers::GiftSerializer.new(gift).to_h)
  end
end
