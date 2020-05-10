class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  def devise_current_user
    @devise_current_user ||= warden.authenticate(:scope => :user)
  end

  # def current_user
  #   devise_current_user || NullUser.new
  # end
end
