Rails.application.routes.draw do
  get "/share", to: "landing#main"
  resources :gifts, only: [:index, :show, :create]
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  devise_scope :user do
    get '/signed_in' => 'sessions#signed_in'
  end
  root 'landing#main'
end
