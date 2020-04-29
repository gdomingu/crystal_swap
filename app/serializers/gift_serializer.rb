 class GiftSerializer
  def initialize(gift)
    @gift = gift
  end

  def to_json
    {
      id: gift.id,
      name: gift.name,
      description: gift.description,
      gift_from: {
        id: gift.user_id,
        email: gift.user.email,
      }
    }.to_json
  end

  private

  attr_reader :gift
end