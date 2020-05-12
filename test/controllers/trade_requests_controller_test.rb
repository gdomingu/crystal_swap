require 'test_helper'

class TradeRequestsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "create - can request a trade" do
    user = users(:two)
    gift = gifts(:one)
    sign_in user
    assert_difference -> {TradeRequest.count}, +1 do
      post("/api/gifts/#{gift.id}/trade_requests", params: {
          gift_request: {message: "I would like to trade"}
      })
    end

    assert_equal(user, TradeRequest.last.user)
    assert_response 200
  end

   test "create - not logged in" do
    gift = gifts(:one)
    assert_no_changes -> {TradeRequest.count} do
      post("/api/gifts/#{gift.id}/trade_requests")
    end
    assert_response 302
  end
end