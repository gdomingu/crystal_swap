require 'test_helper'

class TradeRequestSerializerTest < ActiveSupport::TestCase
  test "it correctly serializes" do
    trade_request = trade_requests(:one)
    expected = {
      id: trade_request.id,
      message: trade_request.message,
      created_at: trade_request.created_at,
      gift: Serializers::GiftSerializer.new(trade_request.gift).to_h,
      requested_by: trade_request.user.email
    }
    assert_equal(expected, Serializers::TradeRequestSerializer.new(trade_request).to_h)
  end
end
