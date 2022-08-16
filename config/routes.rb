Rails.application.routes.draw do

  resources :concept_maps, path: 'maps', param: :code, only: [:edit, :update, :update_multi_nodes, :show] do
    put 'concept_maps/:id/update_multi_nodes', to: 'concept_maps#update_multi_nodes'
    resources :concepts
    resources :links
    resources :versions
  end

  scope 'backend' do
    root 'application#backend'
    resources :users do
      post '/projects/import', to: 'projects#import'
      resources :projects do
        resources :surveys do
          get 'concept_maps/page', to: 'concept_maps#page'
          resources :concept_maps, param: :code, except: [:edit, :update]
        end
      end
    end
  end

  post 'login' => 'application#login'
  get 'logout' => 'application#logout'
  post 'send_code' => 'application#send_code'
  get 'map/(:code)' => 'application#map_link'
  post 'map' => 'application#map_form'

  root 'application#frontend', as: :frontend
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
