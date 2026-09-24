Rails.application.routes.draw do
  devise_for :users

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  get 'dashboard' => 'dashboard#show', as: :dashboard

  # JSON API for a future mobile client — JWT auth, separate from the web
  # session login above. See app/controllers/api/v1/. Wrapped in devise_scope
  # so Api::V1::SessionsController (a Devise::SessionsController subclass)
  # resolves the :user devise mapping correctly.
  devise_scope :user do
    namespace :api do
      namespace :v1 do
        post 'login' => 'sessions#create'
        delete 'logout' => 'sessions#destroy'
      end
    end
  end

  namespace :api do
    namespace :v1 do
      get 'me' => 'me#show'
    end
  end

  root 'home#index'
end
