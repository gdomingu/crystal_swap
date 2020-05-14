# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user.present?
      can :read, Gift
      can :update, Gift, gifter: user
      can :delete, Gift, gifter: user
    end
  end
end
