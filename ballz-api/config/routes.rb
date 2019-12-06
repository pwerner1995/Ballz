Rails.application.routes.draw do
  resources :scores, only: [:index, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # get "/scores", to: "scores#index", as: "scores"
  # post "/scores", to: "scores#create"

end
