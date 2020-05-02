class GiftsController < ApplicationController
  def index
    gifts = Gift.visible.map{|gift| Serializers::GiftSerializer.new(gift).to_h}
    render json: gifts
  end

  def create
    render json: {error: "Must Login"}, status: :unauthorized if current_user.blank?
    gift = Gift.create(gift_params.merge({gifter: current_user}))
    if gift.valid?
      render json: Serializers::GiftSerializer.new(gift).to_h
    else
      render json: {error: gift.errors.full_messages}
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:name, :description)
  end
end
