Rails.application.routes.draw do
  resources :users, only: [:create, :show]

  root 'landing#main'
end
