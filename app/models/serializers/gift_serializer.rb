include Rails.application.routes.url_helpers

 module Serializers
  class GiftSerializer
    def initialize(gift)
      @gift = gift
    end

    def to_h
      {
        id: gift.id,
        name: gift.name,
        description: gift.description,
        images: images,
        gift_from: {
          id: gift.gifter.id,
          email: gift.gifter.email,
        },
        published: gift.published_at.present?,
        given_at: gift.given_at&.strftime("%b %d %H:%M %z"),
      }
    end

    private

    attr_reader :gift

    def images
      gift.images.map do |image|
        url_for(image)
      end
    end
  end
end