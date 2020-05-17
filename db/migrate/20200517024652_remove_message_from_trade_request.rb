class RemoveMessageFromTradeRequest < ActiveRecord::Migration[6.0]
  def change
    remove_column :trade_requests, :message, :text
  end
end
