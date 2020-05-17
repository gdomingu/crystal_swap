class TradeRequest < ApplicationRecord
  belongs_to :user
  belongs_to :gift
  has_many :messages
end