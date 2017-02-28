Rails.application.routes.draw do

  resources :concept_maps, only: [:edit, :update] do
    resources :concepts
    resources :links
    resources :versions
  end

  scope 'backend' do
    root 'application#backend'
    resources :users do
      resources :projects do
        resources :surveys do
          resources :concept_maps, except: [:edit, :update]
        end
      end
    end
  end


  post 'login' => 'application#login'
  get 'logout' => 'application#logout'
  post 'send_code' => 'application#send_code'
  get 'map/(:id)' => 'application#map_link'
  post 'map' => 'application#map_form'

  root 'application#frontend'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
