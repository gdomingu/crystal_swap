require 'test_helper'

class FooTest < ActiveSupport::TestCase
  test "it does the thing" do
    Foo.do_it
  end
   test "it does the thing again" do
    Foo.do_it
  end
end

class Foo
  def self.do_it
    byebug
  end
end