require 'test_helper'

class UpdateGiftServiceTest < ActiveSupport::TestCase
  test "it correctly publishes and unpublishes" do
    gift = gifts(:one)
    gift_params = {id: gift.id, published: "true"}
    service = Services::UpdateGiftService.new(gift, gift_params)
    service.call
    assert_same(true, gift.reload.published_at.present?)

    gift_params = {id: gift.id, published: "false"}
    service = Services::UpdateGiftService.new(gift, gift_params)
    service.call
    assert_same(false, gift.reload.published_at.present?)
  end

   test "it correctly toggles given_at" do
    gift = gifts(:one)
    gift_params = {id: gift.id, given: "true"}
    service = Services::UpdateGiftService.new(gift, gift_params)
    service.call
    assert_same(true, gift.reload.given_at.present?)

    gift_params = {id: gift.id, given: "false"}
    service = Services::UpdateGiftService.new(gift, gift_params)
    service.call
    assert_same(false, gift.reload.given_at.present?)
  end
end
