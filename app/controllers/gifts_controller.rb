class GiftsController < ApplicationController
  def index
    gifts = Gift.visible.map{|gift| Serializers::GiftSerializer.new(gift).to_h}
    render json: gifts
  end

  def create
    render json: {error: "Must Login"}, status: :unauthorized if current_user.blank?
  end
end
