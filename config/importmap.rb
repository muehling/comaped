# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "ConceptMap", preload: true

pin "chroma-js", to: "https://ga.jspm.io/npm:chroma-js@2.4.2/chroma.js"
pin "events", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.24/nodelibs/browser/events.js"
pin "@rails/activestorage", to: "https://ga.jspm.io/npm:@rails/activestorage@6.0.5/app/assets/javascripts/activestorage.js"

pin "vis-data/peer/umd/vis-data.js", to: "vis-data--peer--umd--vis-data.js"
pin "vis-network", to: "vis-network.js"
pin "vis-timeline", to: "vis-timeline.js"

pin "jquery", to: "jquery.js", preload: true

pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @7.1.3
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @7.1.0
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.0.3

pin "popper", to: 'popper.js', preload: true
pin "bootstrap", to: 'bootstrap.min.js', preload: true
pin "moment", to: 'moment.js', preload: true

pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"
