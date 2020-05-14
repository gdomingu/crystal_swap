module Serializers
  class TradeRequestSerializer
    def initialize(trade_request)
      @trade_request = trade_request
    end

    def to_h
      {
        id: trade_request.id,
        message: trade_request.message,
      }
    end

    private

    attr_reader :trade_request
  end
end