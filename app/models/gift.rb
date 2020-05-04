class Gift < ApplicationRecord
  belongs_to :gifter, class_name: "User"
  belongs_to :receiver, class_name: "User", optional: true

  scope :visible, -> {where(private: false).where.not(published_at: nil)}
end
