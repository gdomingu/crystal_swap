module Serializers
  class TradeRequestSerializer
    def initialize(trade_request)
      @trade_request = trade_request
    end

    def to_h
      {
        id: trade_request.id,
        message: trade_request.message,
        requested_at: trade_request.created_at,
        gift: GiftSerializer.new(trade_request.gift).to_h,
      }
    end

    private

    attr_reader :trade_request
  end
end