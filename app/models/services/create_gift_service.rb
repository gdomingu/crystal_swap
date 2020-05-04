module Services
  class CreateGiftService
    def initialize(gift_params)
      @gift_params = gift_params
    end
    attr_accessor :gift_params

    def call
      published = gift_params.delete(:published)

      if published
        gift_params.merge!(published_at: Time.current)
      end
      gift = Gift.create(gift_params)
    end
  end

end