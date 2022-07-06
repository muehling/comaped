# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css.sass, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( jquery.js jquery.simplecolorpicker.* @hotwired--turbo-rails.js @hotwired--turbo.js @rails--actioncable--src.js )
Rails.application.config.assets.precompile += %w( bootstrap.min.js popper.js )
Rails.application.config.assets.precompile += %w( vis-network.js vis-timeline.js vis-data--peer--umd--vis-data.js moment.js )
Rails.application.config.assets.precompile += %w( ConceptMap.js )
Rails.application.config.assets.precompile += %w( application.scss )
