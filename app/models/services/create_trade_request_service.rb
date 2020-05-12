module Services
  class CreateTradeRequestService
    def initialize(trade_request_params)
      @trade_request_params = trade_request_params
    end
    attr_accessor :trade_request_params

    def call
      TradeRequest.create(trade_request_params)
    end
  end

end