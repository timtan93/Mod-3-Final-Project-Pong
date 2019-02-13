Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #state
  resources :users, only: [:index, :show, :create]
  resources :games, only: [:index, :show, :create]

  get '/state', to: 'state#index'
  post '/state', to: 'state#edit'
  get '/pong', to: 'state#pong'
end
