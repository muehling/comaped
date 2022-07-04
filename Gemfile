source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0.2'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4.2'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'


# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

gem 'jbuilder'

# Use Capistrano for deployment
gem 'capistrano-rails'
gem 'capistrano-passenger'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'  
end

group :production do
  gem 'mysql2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

#Additional gems:
gem 'rubyzip'
gem 'bootstrap-sass', '~> 3.3.7'
gem "importmap-rails", "~> 1.1"
gem "js-routes"
gem 'mime-types', '~> 3.1'