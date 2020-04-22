require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "creates a user" do
    user = User.create(name: "moonchild", password: "fakepassword", email: "moonchild@example.com")
    assert_equal(true, user.persisted?)
  end

  test "invalid email" do
    user = User.create(name: "moonchild", password: "fakepassword", email: "moonexample.com")
    assert_equal(false, user.persisted?)
  end
end
