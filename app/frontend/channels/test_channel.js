import consumer from './consumer'
import { getLanguage } from '../js/helpers'

// If the user has other Subscriptions, make sure to remove them: Might be useful in the future
consumer.subscriptions.subscriptions.forEach(subscription => {
  consumer.subscriptions.remove(subscription)
})

// Create the TestChannel subscription
consumer.subscriptions.create(
  { channel: 'TestChannel' },
  {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('Connected!')
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('Terminated')
    },

    // Called when there's incoming data on the websocket for this channel
    received(data) {
      // function get the browser language of the user

      let language = getLanguage()

      // function to create or update a node
      function updateNode(id, label, x, y, color, lock, user_color) {
        let border = color
        let borderWidth = 2
        if (lock) {
          // change color and border for locked nodes
          color = '#9B9B9B'
          border = user_color
          borderWidth = 5
        }
        // create or update the Node with the parameters
        window.setNodeData({
          id: id,
          label: label,
          shape: 'ellipse',
          borderWidth: borderWidth,
          lock: lock,
          x: x,
          y: y,
          color: {
            background: color,
            border: border,
            hover: {
              background: color,
              border: border,
            },
            highlight: {
              background: color,
              border: 'black',
            },
          },
        })
      }

      // function to create or update an edge
      function updateEdge(id, from, to, label, lock, user_color) {
        // decide where to set the label
        let align = 'top'
        if (from < to) {
          align = 'bottom'
        }

        // Check the lock:
        let color = '#a0a0a0'
        let hover = '#808080'
        let highlight = '#808080'
        if (lock) {
          color = user_color
          hover = user_color
          highlight = user_color
        }
        // create or update the edge with the parameters
        window.setEdgeData({
          id: id,
          from: from,
          to: to,
          label: label,
          lock: lock,
          font: {
            align: align,
          },
          labelHighlightBold: false,
          arrowStrikethrough: false,
          color: {
            color: color,
            hover: hover,
            highlight: highlight,
          },
          hoverWidth: 0.5,
        })
      }

      // Get the current map
      let map_id = $('#map_id').html()

      // Only if the map of the current user is the same as the map of the sender, we should update the canvas
      if (data['map_id'] == map_id) {
        // Get the current user
        let current_user = $('#user_me_id').html()

        // Check who did an update
        if (data['user_id'] != current_user) {
          // An other user did the change
          switch (data['action']) {
            case 'user_left':
              // the user must be removed of the active users
              $('#student_' + data['user_id']).remove()

              // Update the log
              // All the changes the user did will be now under filter_left
              $('*[data-student="filter_' + data['user_id'] + '"]').attr(
                'data-student',
                'filter_left'
              )

              // Show the filter option for the left students
              $('#filter_left_students').show()
              break

            case 'user_joined':
              // add the user to the active users
              let new_user_id = data['user_id']
              let new_user_name = data['user']
              let new_user_color = data['user_color']
              let new_user =
                '<div id="student_' +
                new_user_id +
                '" style="display: inline-block; margin: 0.5em; border-bottom: 2px solid ' +
                new_user_color +
                '"><label> ' +
                new_user_name +
                ' <input type="checkbox" class="filter_students" id="filter_' +
                new_user_id +
                '" checked/></label></div>'
              $('#students').html($('#students').html() + new_user)
              break

            case 'create':
              if (data['type'] == 'node') {
                // Display the new node
                updateNode(data['id'], data['label'], data['x'], data['y'], data['color'])
              } else if (data['type'] == 'link') {
                // Display the new link
                updateEdge(data['id'], data['start'], data['end'], data['label'])
              }
              break

            case 'update':
              if (data['type'] == 'node') {
                // Display the updated node
                updateNode(
                  data['id'],
                  data['label'],
                  data['x'],
                  data['y'],
                  data['color'],
                  data['lock'],
                  data['user_color']
                )
              } else if (data['type'] == 'link') {
                // Display the updated link
                updateEdge(
                  data['id'],
                  data['start'],
                  data['end'],
                  data['label'],
                  data['lock'],
                  data['user_color']
                )
              }
              break

            case 'destroy':
              if (data['type'] == 'node') {
                // Destroy the node on the canvas
                window.nodes.remove(data['id'])
                if (
                  $('#edit-dialog').is(':visible') &&
                  ($('#start').val() == data['id'] || $('#end').val() == data['id'])
                ) {
                  // Close the edit-dialog
                  $('#edit-dialog').hide()
                  // IMPORTANT: Set the working mode to none (0), otherwise another object can't be edit
                  window.setMode(0)
                }
              } else if (data['type'] == 'link') {
                // Destroy the link on the canvas
                window.edges.remove(data['id'])
              }
              break
            default:
              break
          } // end switch
        } else {
          // Current user did the change
          // Check if the current user left the map
          if (data['action'] == 'user_left') {
            // current_student left the map -> opened new window
            let html = ''
            if (language == 'de') {
              html =
                '<div id="note" style="position: absolute;right: 50%; z-index: 1; display: inline-block;  -webkit-transform: translate(50%, 50%); transform: translate(50%, 50%); background-color: #1b809e; padding: 2em; color: white;">Du hast ComapEd in einem anderen Fenster geöffnet. Du kannst dieses Fenster nun schließen! </div>'
            } else {
              html =
                '<div id="note" style="position: absolute;right: 50%; z-index: 1; display: inline-block;  -webkit-transform: translate(50%, 50%); transform: translate(50%, 50%); background-color: #1b809e; padding: 2em; color: white;">You opened ComapEd in another browser tab. Close this tab, please</div>'
            }
            // overwrite the canvas
            $('body').html(html)
          }
        }

        // Update the recent changes container
        let log = ''
        let user = data['user'].split('-')
        user = user[0] + '<br>' + user[1]

        // Object Header
        let object = ''

        // The changes done to the object
        let change = ''

        // Fill the data
        switch (data['action']) {
          case 'create':
            if (data['type'] == 'node') {
              if (language == 'de') {
                object = 'ERSTELLTE KNOTEN'
                change += '<li>erstellte' + ' den Knoten ' + data['label'] + '</li>'
                change +=
                  "<li>die Farbe ist <span style='color: " +
                  data['color'] +
                  "'>&#9632;</span> (" +
                  data['color'] +
                  ')</li>'
                change +=
                  '<li>die Position lautet [x: ' +
                  Math.round(parseInt(data['x'])) +
                  '; y: ' +
                  Math.round(parseInt(data['y'])) +
                  ']</li>'
              } else {
                object = 'CREATED NODE'
                change += '<li>created' + ' the node ' + data['label'] + '</li>'
                change +=
                  "<li>the color is <span style='color: " +
                  data['color'] +
                  "'>&#9632;</span> (" +
                  data['color'] +
                  ')</li>'
                change +=
                  '<li>the position is [x: ' +
                  Math.round(parseInt(data['x'])) +
                  '; y: ' +
                  Math.round(parseInt(data['y'])) +
                  ']</li>'
              }
            } else if (data['type'] == 'link') {
              if (language == 'de') {
                object = 'ERSTELLTE VERBINDUNG'
                change += '<li>erstellte' + ' die Verbindung ' + data['label'] + '</li>'
              } else {
                object = 'CREATED EDGE'
                change += '<li>created' + ' the edge ' + data['label'] + '</li>'
              }
            }
            break

          case 'update':
            if (data['type'] == 'node') {
              // Update node
              if (language == 'de') {
                object = 'UPDATED KNOTEN "' + data['label_old'] + '"'
              } else {
                object = 'UPDATED NODE "' + data['label_old'] + '"'
              }

              if (data['label_old'] != data['label']) {
                if (language == 'de') {
                  change += '<li>änderte das Label zu "' + data['label'] + '"</li>'
                } else {
                  change += '<li>set the label to "' + data['label'] + '"</li>'
                }
              }
              if (data['color_old'] != data['color']) {
                if (language == 'de') {
                  change +=
                    "<li>änderte die Farbe zu <span style='color: " +
                    data['color'] +
                    "'>&#9632;</span> (" +
                    data['color'] +
                    ')</li>'
                } else {
                  change +=
                    "<li>set the color to <span style='color: " +
                    data['color'] +
                    "'>&#9632;</span> (" +
                    data['color'] +
                    ')</li>'
                }
              }
              if (data['x_old'] != data['x'] || data['y_old'] != data['y']) {
                if (language == 'de') {
                  change +=
                    '<li>änderte die Position zu [x: ' +
                    Math.round(parseInt(data['x'])) +
                    '; y: ' +
                    Math.round(parseInt(data['y'])) +
                    ']</li>'
                } else {
                  change +=
                    '<li>set the position to [x: ' +
                    Math.round(parseInt(data['x'])) +
                    '; y: ' +
                    Math.round(parseInt(data['y'])) +
                    ']</li>'
                }
              }
              if (data['lock_old'] != data['lock']) {
                if (data['lock']) {
                  if (language == 'de') {
                    change += '<li>sperrt den Knoten</li>'
                  } else {
                    change += '<li>set a lock</li>'
                  }
                } else {
                  if (language == 'de') {
                    change += '<li>entsperrt den Knoten</li>'
                  } else {
                    change += '<li>removed the lock </li>'
                  }
                }
              }
            } else if (data['type'] == 'link') {
              // Update edge
              if (language == 'de') {
                object = 'UPDATED VERBINDUNG  "' + data['label_old'] + '"'
              } else {
                object = 'UPDATED EDGE  "' + data['label_old'] + '"'
              }

              if (data['label_old'] != data['label']) {
                if (language == 'de') {
                  change += '<li>änderte das Label zu ' + data['label'] + '</li>'
                } else {
                  change += '<li>set the label to ' + data['label'] + '</li>'
                }
              }
              if (data['lock_old'] != data['lock']) {
                if (data['lock']) {
                  if (language == 'de') {
                    change += '<li>sperrt die Verbindung</li>'
                  } else {
                    change += '<li>set a lock</li>'
                  }
                } else {
                  if (language == 'de') {
                    change += '<li>entsperrt die Verbindung</li>'
                  } else {
                    change += '<li>removed the lock </li>'
                  }
                }
              }
            }
            break

          case 'destroy':
            if (data['type'] == 'node') {
              if (language == 'de') {
                object = 'LÖSCHTE KNOTEN "' + data['label'] + '"'
                change += '<li>löschte den Knoten ' + data['label'] + '</li>'
              } else {
                object = 'DELETED NODE "' + data['label'] + '"'
                change += '<li>deleted the node ' + data['label'] + '</li>'
              }
            } else if (data['type'] == 'link') {
              if (language == 'de') {
                object = 'LÖSCHTE VERBINDUNG "' + data['label'] + '"'
                change += '<li>löschte die Verbindung ' + data['label'] + '</li>'
              } else {
                object = 'DELETED EDGE  "' + data['label'] + '"'
                change += '<li>deleted the edge ' + data['label'] + '</li>'
              }
            }
            break

          default:
            break
        } // end switch

        //Check if it should show the new log -> depends on the filter
        if ($('#filter_' + data['user_id']).is(':checked')) {
          // Show the log
          log =
            '<div data-student="filter_' +
            data['user_id'] +
            '" class="log"> <div id="log_header"> <div class="change_header"> ' +
            object +
            ' </div> </div> <div id="node_log" class="log_entry"> <div class="student" style="border-left: 12px solid ' +
            data['user_color'] +
            ' "> <span class="student_name">' +
            user +
            '</span> </div> <div class="context"> <ul class="changes"> ' +
            change +
            ' </ul> </div> </div> </div>'
        } else {
          // Hide the log
          log =
            '<div style="display: none;" data-student="filter_' +
            data['user_id'] +
            '" class="log"> <div id="log_header"> <div class="change_header"> ' +
            object +
            ' </div> </div> <div id="node_log" class="log_entry"> <div class="student" style="border-left: 12px solid ' +
            data['user_color'] +
            ' "> <span class="student_name">' +
            user +
            '</span> </div> <div class="context"> <ul class="changes"> ' +
            change +
            ' </ul> </div> </div> </div>'
        }

        if (change != '') {
          $('#recent_changes').html(log + $('#recent_changes').html())
        }
      } // end if (map_id == current map)
    },
  }
)
