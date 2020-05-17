require 'test_helper'

class TradeRequestSerializerTest < ActiveSupport::TestCase
  test "it correctly serializes" do
    trade_request = trade_requests(:one)
    Message.create(
      trade_request: trade_request,
      body: "Wonderous Moonstar",
      sender: users(:one),
      receiver: users(:two)
    )
    expected = {
      id: trade_request.id,
      initial_message: trade_request.messages.first,
      created_at: trade_request.created_at,
      gift: Serializers::GiftSerializer.new(trade_request.gift).to_h,
      requested_by: trade_request.user.email
    }
    assert_equal(expected, Serializers::TradeRequestSerializer.new(trade_request).to_h)
  end
end
