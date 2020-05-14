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
end