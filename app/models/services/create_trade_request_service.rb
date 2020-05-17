module Services
  class CreateTradeRequestService
    def initialize(message_params, trade_request_params)
      @trade_request_params = trade_request_params
      @message_params = message_params
    end
    attr_reader :trade_request_params, :message_params

    def call
      trade_request = TradeRequest.find_or_create_by(trade_request_params)
      if trade_request.messages.none?
        m = Message.create(
          body: message_params[:body],
          trade_request: trade_request,
          sender: trade_request.user,
          receiver: trade_request.gift.gifter,
        )
      end
      trade_request
    end
  end

end