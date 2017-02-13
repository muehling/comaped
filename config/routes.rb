Rails.application.routes.draw do


  resources :concept_maps do
    resources :concepts
    resources :links
  end

  scope 'backend' do
    root 'application#backend'
    resources :users do
      resources :projects do
        resources :surveys
      end
    end
  end


  post 'login' => 'application#login'
  get 'logout' => 'application#logout'

  root 'application#frontend'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
