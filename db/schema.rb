# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_07_033616) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "gifts", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.integer "weight_g"
    t.float "height_cm"
    t.float "length_cm"
    t.float "depth_cm"
    t.bigint "gifter_id", null: false
    t.bigint "receiver_id"
    t.datetime "gifted_at"
    t.datetime "published_at"
    t.boolean "private", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "given_at"
    t.index ["gifter_id"], name: "index_gifts_on_gifter_id"
    t.index ["receiver_id"], name: "index_gifts_on_receiver_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body"
    t.bigint "trade_request_id"
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["receiver_id", "sender_id"], name: "index_messages_on_receiver_id_and_sender_id"
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id", "receiver_id"], name: "index_messages_on_sender_id_and_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
    t.index ["trade_request_id"], name: "index_messages_on_trade_request_id"
  end

  create_table "trade_requests", force: :cascade do |t|
    t.bigint "gift_id"
    t.bigint "user_id"
    t.datetime "completed_at"
    t.datetime "canceled_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["gift_id", "user_id"], name: "index_trade_requests_on_gift_id_and_user_id"
    t.index ["gift_id"], name: "index_trade_requests_on_gift_id"
    t.index ["user_id", "gift_id"], name: "index_trade_requests_on_user_id_and_gift_id"
    t.index ["user_id"], name: "index_trade_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: ""
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "gifts", "users", column: "gifter_id"
  add_foreign_key "gifts", "users", column: "receiver_id"
  add_foreign_key "messages", "trade_requests"
  add_foreign_key "messages", "users", column: "receiver_id"
  add_foreign_key "messages", "users", column: "sender_id"
end
