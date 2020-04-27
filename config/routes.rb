Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:create, :show]

  root 'landing#main'
end
