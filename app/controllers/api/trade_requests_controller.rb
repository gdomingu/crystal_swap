module Api
  class TradeRequestsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_trade_request

    def index
      trade_requests = TradeRequest.joins(:gift).where(gifts: {gifter: current_user})

      response = trade_requests.collect do |trade_request|
        Serializers::TradeRequestSerializer.new(trade_request).to_h
      end

      if trade_requests.any?
        render json: response
      else
        render_not_found
      end
    end

    def show
      authorize! :show, @trade_request

      if @trade_request.present?
        render json: Serializers::TradeRequestSerializer.new(@trade_request).to_h
      else
        render_not_found
      end
    end

    private

    def load_trade_request
      @trade_request = TradeRequest.find_by(id: params[:id])
    end
  end
end
