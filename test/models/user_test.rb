require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "creates a user" do
    user = User.create(password: "fakepassword", email: "foo@example.com")
    assert_equal(true, user.persisted?)
  end
end
