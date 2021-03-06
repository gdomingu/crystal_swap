module Api
  class Gifts::TradeRequestsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_gift

    def index
      trade_request = TradeRequest.find_by(user: current_user, gift: @gift)

      if trade_request.present?
        render json: Serializers::TradeRequestSerializer.new(trade_request).to_h
      else
        render_not_found
      end
    end

    def create
      trade_request = Services::CreateTradeRequestService.new(
        message_params, {user: current_user, gift: @gift}
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

    def message_params
      params.require(:message).permit(:body)
    end
  end
end
