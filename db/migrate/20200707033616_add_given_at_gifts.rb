class AddGivenAtGifts < ActiveRecord::Migration[6.0]
  def change
    add_column :gifts, :given_at, :timestamp
  end
end
