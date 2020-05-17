class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :body
      t.belongs_to :trade_request, foreign_key: true
      t.belongs_to :sender, foreign_key: { to_table: 'users' }, null: false
      t.belongs_to :receiver, foreign_key: { to_table: 'users' }, null: false
      t.index [:sender_id, :receiver_id]
      t.index [:receiver_id, :sender_id]
      t.timestamps
    end
  end
end
