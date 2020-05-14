module Api
  class TradeRequestsController < ApplicationController
    before_action :authenticate_user!

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
  end
end
