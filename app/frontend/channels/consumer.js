// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from '@rails/actioncable'

// für das aktuelle Staging-System:
export default createConsumer('wss://ruapehu.informatik.uni-kiel.de/comaped/cable')

//export default createConsumer()
