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
        gift_from: {
          id: gift.gifter.id,
          email: gift.gifter.email,
        }
      }
    end

    private

    attr_reader :gift
  end
end