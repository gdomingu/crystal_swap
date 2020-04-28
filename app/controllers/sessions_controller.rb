class SessionsController < Devise::SessionsController
  respond_to :json

  def signed_in
    if user_signed_in?
      render json: {
        user: current_user
      }
    else
      render json: {
        message: "Must sign in"
      }
    end
  end
end