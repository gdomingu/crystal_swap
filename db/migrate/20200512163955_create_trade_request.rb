class CreateTradeRequest < ActiveRecord::Migration[6.0]
  def change
    create_table :trade_requests do |t|
      t.text :message
      t.belongs_to :gift
      t.belongs_to :user
      t.datetime :completed_at
      t.datetime :canceled_at
      t.index [:gift_id, :user_id]
      t.index [:user_id, :gift_id]
      t.timestamps
    end
  end
end
