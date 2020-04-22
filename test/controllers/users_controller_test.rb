require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "show" do
    user = users(:one)
    get("/users/#{user.id}")
    assert_equal("200", @response.code)
    assert_equal(JSON.parse(user.to_json), json_response(@response.body)["user"])
  end
end
