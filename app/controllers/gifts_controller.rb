class GiftsController < ApplicationController
  def index
    gifts = Gift.visible.map{|gift| Serializers::GiftSerializer.new(gift).to_h}
    render json: gifts
  end
end
