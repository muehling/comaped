# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "ConceptMap", preload: true

pin "chroma-js", to: "https://ga.jspm.io/npm:chroma-js@2.4.2/chroma.js"
pin "events", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.24/nodelibs/browser/events.js"
pin "@rails/activestorage", to: "https://ga.jspm.io/npm:@rails/activestorage@6.0.5/app/assets/javascripts/activestorage.js"

pin "vis-network", to: "https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"
pin "vis-timeline", to: "https://unpkg.com/vis-timeline@7.5.1/standalone/umd/vis-timeline-graph2d.min.js"

pin "bootstrap", to: "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js", preload: true
pin "jquery", to: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js", preload: true

pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @7.1.3
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @7.1.0
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.0.3
