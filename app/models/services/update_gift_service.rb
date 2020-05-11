module Services
  class UpdateGiftService
    def initialize(gift, gift_params)
      @gift = gift
      @gift_params = gift_params
    end
    attr_accessor :gift_params, :gift

    def call
      published = gift_params.delete(:published)
      if ActiveRecord::Type::Boolean.new.cast(published)
        gift_params.merge!(published_at: Time.current)
      else
        gift_params.merge!(published_at: nil)
      end
      gift.update(gift_params)
      gift
    end
  end

end