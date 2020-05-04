class GiftsController < ApplicationController
  def index
    gifts = Gift.visible.with_attached_images.map{|gift| Serializers::GiftSerializer.new(gift).to_h}
    render json: gifts
  end

  def create
    return render json: {error: "Must Login"}, status: :unauthorized if current_user.blank?

    gift = Services::CreateGiftService.new(gift_params.merge({gifter: current_user})).call

    if gift.valid?
      render json: Serializers::GiftSerializer.new(gift).to_h
    else
      render json: {error: gift.errors.full_messages}
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:name, :description, :published, images: [])
  end
end