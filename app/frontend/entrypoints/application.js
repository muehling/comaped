import './add_jquery'
import * as bootstrap from 'bootstrap'
import '@hotwired/turbo-rails'

import ConceptMap from '../js/ConceptMap'
import BackendViewer from '../js/BackendViewer'

import 'bootstrap-icons/font/bootstrap-icons.css'

window.bootstrap = bootstrap

/**********************************
 * intantiates the editor object
 *********************************/
window.initEditor = ({
  edgeData,
  nodeData,
  conceptsPath,
  conceptMapsPath,
  linksPath,
  dialogTexts,
}) => {
  const cm = new ConceptMap({
    edgeData,
    nodeData,
    conceptsPath,
    conceptMapsPath,
    linksPath,
    dialogTexts,
  })

  // expose handlers needed for DOM events
  window.hideForm = cm.hideForm
  window.validateForm = cm.validateForm
  window.searchConcept = cm.searchConcept
  window.sendMail = cm.sendMail
  window.destroy = cm.destroy
  window.submitChanges = event => {
    event.preventDefault()
    event.stopPropagation()
    cm.onSubmit()
    return false
  }
  window.edges = cm.edges
  window.nodes = cm.nodes
  window.changeColor = cm.changeColor
}

/**********************************
 * instantiates Objects needed to display concept maps and timelines in admin area
 *********************************/
window.initBackend = ({
  edgeData,
  nodeData,
  id,
  fetchUrl,
  items,
  firstTimestamp,
  lastTimestamp,
  maxVersion,
}) => {
  window.viewers = window.viewers || {}

  // create an instance for the passed concept map id if none is present
  if (!window.viewers[id]) {
    window.viewers[id] = new BackendViewer({ id })
  }

  // function is called from the preview partial (either from the index/list or the show/detail page)
  // this will init the data for the map itself.
  if (edgeData && nodeData) {
    window.viewers[id].setMapData({ id, edgeData, nodeData })
  }

  // function is called from the timeline partial. This will init the timeline data.
  if (fetchUrl) {
    window.viewers[id].setTimelineData({
      id,
      fetchUrl,
      items,
      firstTimestamp,
      lastTimestamp,
      maxVersion,
    })
  }

  return window.viewers[id]
}
