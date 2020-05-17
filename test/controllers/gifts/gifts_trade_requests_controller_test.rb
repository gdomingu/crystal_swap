require 'test_helper'

class GiftsTradeRequestsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "create - can request a trade" do
    user = users(:one)
    gift = gifts(:two)
    sign_in user
    assert_difference -> {Message.count}, +1 do
      assert_difference -> {TradeRequest.count}, +1 do
        post("/api/gifts/#{gift.id}/trade_requests", params: {
            message: {body: "I would like to trade"}
        })
      end
    end

    assert_equal(user, TradeRequest.last.user)
    assert_equal("I would like to trade", Message.last.body)
    assert_response 200
  end

  test "create - limits 1 per gift per user" do
    user = users(:two)
    gift = gifts(:one)
    sign_in user
    post("/api/gifts/#{gift.id}/trade_requests", params: {
        message: {body: "I would like to trade"}
    })
    assert_no_difference -> {TradeRequest.count} do
      post("/api/gifts/#{gift.id}/trade_requests", params: {
          message: {body: "I would like to trade"}
      })
    end
  end

  test "create - not logged in" do
    gift = gifts(:one)
    assert_no_changes -> {TradeRequest.count} do
      post("/api/gifts/#{gift.id}/trade_requests")
    end
    assert_response 302
  end

  test "index - not logged in" do
    gift = gifts(:one)
    assert_no_changes -> {TradeRequest.count} do
      get("/api/gifts/#{gift.id}/trade_requests")
    end
    assert_response 302
  end


  test "index - logged in" do
    user = users(:two)
    gift = gifts(:one)
    trade_request = trade_requests(:one)
    sign_in user
    get("/api/gifts/#{gift.id}/trade_requests")
    assert_response 200
    assert_equal(
      Serializers::TradeRequestSerializer.new(trade_request).to_h.to_json,
      @response.body
    )
  end
end