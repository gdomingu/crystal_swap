class Gift < ApplicationRecord
  belongs_to :gifter, class_name: "User"
  belongs_to :receiver, class_name: "User", optional: true
end
