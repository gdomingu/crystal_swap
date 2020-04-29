Rails.application.routes.draw do

  resources :gifts, only: [:index, :show]
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  devise_scope :user do
    get '/signed_in' => 'sessions#signed_in'
  end
  root 'landing#main'
end
