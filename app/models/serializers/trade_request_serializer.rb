module Serializers
  class TradeRequestSerializer
    def initialize(trade_request)
      @trade_request = trade_request
    end

    def to_h
      {
        id: trade_request.id,
        initial_message: trade_request.messages.first,
        created_at: trade_request.created_at,
        gift: GiftSerializer.new(trade_request.gift).to_h,
        requested_by: trade_request.user.email
      }
    end

    private

    attr_reader :trade_request
  end
end