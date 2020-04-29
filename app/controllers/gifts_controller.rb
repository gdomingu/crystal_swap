class GiftsController < ApplicationController
  def index
    gifts = current_user.gifts.map{|gift| GiftSerializer.new(gift)}
    render json: gifts
  end
end
