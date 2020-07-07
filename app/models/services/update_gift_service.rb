module Services
  class UpdateGiftService
    def initialize(gift, gift_params)
      @gift = gift
      @gift_params = gift_params
    end
    attr_accessor :gift_params, :gift

    def call
      gift.update(sanitized_gift_params)
      gift
    end

    private

    def sanitized_gift_params
      new_gift_params = gift_params.dup
      [[:published, :published_at], [:given, :given_at]].each do |p_key, attr|
        toggle_attr(p_key, attr, new_gift_params)
      end
      new_gift_params
    end

    def toggle_attr(param_key, field, params)
      val = ActiveRecord::Type::Boolean.new.cast(params.delete(param_key))
      return if val.nil?
      if val
        params.merge!(field => Time.current)
      else
        params.merge!(field => nil)
      end
    end
  end

end