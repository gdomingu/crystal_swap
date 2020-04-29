require 'test_helper'

class GiftTest < ActiveSupport::TestCase
  test "it must have a name and a user" do
    gift = Gift.create
    assert_equal(false, gift.persisted?)
    gift = Gift.create(name: "Lemon citrine", user: users(:one))
  end
end
