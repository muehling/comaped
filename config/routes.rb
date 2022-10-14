Rails.application.routes.default_url_options[ENV['RAILS_RELATIVE_URL_ROOT']]
Rails.application.routes.draw do
  resources :concept_maps, path: 'maps', param: :code, only: %i[edit update show] do
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
          resources :concept_maps, param: :code, except: %i[edit update]
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
end
