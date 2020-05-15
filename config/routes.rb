Rails.application.routes.draw do
  root 'landing#main'

  namespace :api do
    resources :gifts, only: [:index, :show, :create, :update] do
      resources :trade_requests, only: [:create, :index], controller: 'gifts/trade_requests'
    end
    resources :trade_requests, only: [:index, :show]
  end

  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  devise_scope :user do
    get '/signed_in' => 'sessions#signed_in'
  end

  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match '*path', to: 'landing#main', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
