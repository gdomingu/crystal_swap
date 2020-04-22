require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "show" do
    user = users(:one)
    get("/users/#{user.id}")
    assert_equal("200", @response.code)
    assert_equal(JSON.parse(user.to_json), json_response(@response.body)["user"])
  end

  test "create fails with invalid params" do
    post("/users",
      params: {user: {name: "Alder"}}
    )
    assert_equal("500", @response.code)
    assert_equal("Password can't be blank", json_response(@response.body)["errors"].first)
  end

  test "create success" do
    post("/users",
      params: {user: {name: "Alder", email: "alder@example.com", password: "fakepassword"}}
    )
    assert_equal("200", @response.code)
    assert_equal("Alder", json_response(@response.body)["user"]["name"])
  end
end
