require 'test_helper'

class TradeRequestsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "index - not logged in" do
    get("/api/trade_requests")
    assert_response 302
  end

  test "index - logged in" do
    user = users(:one)
    trade_request = trade_requests(:one)
    sign_in user
    get("/api/trade_requests")
    assert_response 200
    assert_equal(
      [Serializers::TradeRequestSerializer.new(trade_request).to_h].to_json,
      @response.body
    )
  end

  test "show - not logged in" do
    trade_request = trade_requests(:one)
    get("/api/trade_requests/#{trade_request.id}")
    assert_response 302
  end

  test "show - logged in" do
    user = users(:one)
    trade_request = trade_requests(:one)
    sign_in user
    get("/api/trade_requests/#{trade_request.id}")
    assert_response 200
    assert_equal(
      Serializers::TradeRequestSerializer.new(trade_request).to_h.to_json,
      @response.body
    )
  end

  test "show - not authorized" do
    user = User.create(name: "Gaia", email: "pachamama@example.com")
    sign_in user
    gift = gifts(:two)
    trade_request = trade_requests(:one)

    get("/api/trade_requests/#{trade_request.id}")
    assert_response 302
  end
end