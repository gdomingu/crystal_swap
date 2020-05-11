class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  def devise_current_user
    @devise_current_user ||= warden.authenticate(:scope => :user)
  end

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to main_app.root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end
end
