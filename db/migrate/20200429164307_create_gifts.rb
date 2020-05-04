class CreateGifts < ActiveRecord::Migration[6.0]
  def change
    create_table :gifts do |t|
      t.string :name, null: false
      t.text :description
      t.integer :weight_g
      t.float :height_cm
      t.float :length_cm
      t.float :depth_cm
      t.belongs_to :gifter, foreign_key: { to_table: 'users' }, null: false
      t.belongs_to :receiver, foreign_key: { to_table: 'users' }
      t.datetime :gifted_at
      t.datetime :published_at
      t.boolean :private, default: false, null: false

      t.timestamps
    end
  end
end
