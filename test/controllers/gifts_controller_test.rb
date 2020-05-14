require 'test_helper'

class GiftsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "index" do
    get('/api/gifts')
    assert_equal(
      [Serializers::GiftSerializer.new(gifts(:one)).to_h].to_json,
      @response.body
    )
  end

  test "create" do
    sign_in users(:one)
    file = fixture_file_upload(Rails.root.join('public', 'apple-touch-icon.png'), 'image/png')
    payload = {
      gift: {
        name: "Smokey Quartz",
        description: "This is a beautiful crystal",
        receiver_id: 2,
        images: [file],
        published: true,
      }
    }

    assert_difference "Gift.count", +1 do
      assert_difference "ActiveStorage::Attachment.count", +1 do
        post('/api/gifts', params: payload)
      end
    end
    gift = Gift.last
    assert_equal(users(:one), gift.gifter)
    assert_nil(gift.receiver_id, "expected receiver_id to be nil")
    refute_nil(gift.published_at)
    assert_equal(
      Serializers::GiftSerializer.new(gift).to_h.to_json,
      @response.body
    )
  end

   test "create - not authorized" do
    payload = {gift: {name: "foo"}}
    assert_no_changes "Gift.count"  do
      post('/api/gifts', params: payload)
    end
    assert_response 302
  end

  test "show" do
    gift = gifts(:one)
    get("/api/gifts/#{gift.id}")
    assert_equal(
      Serializers::GiftSerializer.new(gift).to_h.to_json,
      @response.body
    )
  end

  test "update" do
    sign_in users(:one)
    gift = gifts(:one)
    payload = {
      gift: {
        name: "Smokey Quartz",
        description: "This is a beautiful crystal",
        published: false,
      },
    }

    patch("/api/gifts/#{gift.id}", params: payload)
    gift.reload
    assert_equal("Smokey Quartz", gift.name)
    assert_nil(gift.published_at, "should have nil published at")
    assert_equal(
      Serializers::GiftSerializer.new(gift).to_h.to_json,
      @response.body
    )
  end

  test "update - not authorized" do
    sign_in users(:one)
    gift = gifts(:two)
    payload = {
      gift: {
        name: "Smokey Quartz",
        description: "This is a beautiful crystal",
        published: false,
      },
    }

    patch("/api/gifts/#{gift.id}", params: payload)
    assert_response 302
  end

end
