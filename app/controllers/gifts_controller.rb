class GiftsController < ApplicationController
  def index
    gifts = Gift.visible.map{|gift| GiftSerializer.new(gift)}
    render json: gifts
  end
end
