module Api
  class GiftsController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :load_gift, only: [:update, :show]

    def index
      gifts = Gift.visible.with_attached_images.map{|gift| Serializers::GiftSerializer.new(gift).to_h}
      render json: gifts
    end

    def create
      gift = Services::CreateGiftService.new(gift_params.merge({gifter: current_user})).call

      if gift.valid?
        render json: Serializers::GiftSerializer.new(gift).to_h
      else
        render json: {error: gift.errors.full_messages}
      end
    end

    def update
      authorize! :update, @gift
      gift = Services::UpdateGiftService.new(@gift, gift_params).call

      if gift.valid?
        render json: Serializers::GiftSerializer.new(gift).to_h
      else
        render json: {error: gift.errors.full_messages}
      end
    end

    def show
      render json: Serializers::GiftSerializer.new(@gift).to_h
    end

    private

    def gift_params
      params.require(:gift).permit(:name, :description, :published, images: [])
    end

    def load_gift
      @gift = Gift.find(params[:id])
    end
  end
end