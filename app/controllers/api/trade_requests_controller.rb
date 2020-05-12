module Api
  class TradeRequestsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_gift
    def create
      trade_request = Services::CreateTradeRequestService.new(
        request_params.merge({user: current_user, gift: @gift})
      ).call

      if trade_request.valid?
        render json: Serializers::TradeRequestSerializer.new(trade_request).to_h
      else
        render json: {error: trade_request.errors.full_messages}
      end
    end

    private

    def load_gift
      @gift = Gift.find(params[:gift_id])
    end

    def request_params
      params.require(:gift_request).permit(:message)
    end
  end
end
