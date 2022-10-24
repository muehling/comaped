import './add_jquery'
import * as bootstrap from 'bootstrap'
import '@hotwired/turbo-rails'

import ConceptMap from '../js/ConceptMap'
import BackendViewer from '../js/BackendViewer'
import StudentLog from '../js/StudentLog'
import '../channels/test_channel'

import { initSubscription } from '../channels/test_channel'

import 'bootstrap-icons/font/bootstrap-icons.css'

import '../scss/application.scss'

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
  enableCoworking,
  dialogTexts,
}) => {
  let isSubscriptionInitialized = false
  const cm = new ConceptMap({
    edgeData,
    nodeData,
    conceptsPath,
    conceptMapsPath,
    linksPath,
    dialogTexts,
  })

  // expose handlers needed for DOM events
  window.network = cm.network
  window.showForm = cm.showForm
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
  window.toast = cm.toast
  window.edges = cm.edges
  window.nodes = cm.nodes
  window.canvasX = cm.canvasX
  window.canvasY = cm.canvasY
  window.changeColor = cm.changeColor
  window.changeShape = cm.changeShape
  window.changeEdgeShape = cm.changeEdgeShape
  window.mode = cm.mode
  window.buttonMode = cm.buttonMode
  window.activeButton = cm.activeButton
  window.createEdge = cm.createEdge

  window.setNodeData = cm.setNodeData
  window.setEdgeData = cm.setEdgeData

  //DH Make the mode available
  window.setMode = cm.setMode

  // init websocket connection only if enabled in the project settings
  const isCoworkingEnabled = enableCoworking && enableCoworking !== 'false'
  if (!isSubscriptionInitialized && isCoworkingEnabled) {
    initSubscription()
    isSubscriptionInitialized = true
  }
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

/**********************************
 * instantiates student log display handlers
 *********************************/
new StudentLog()
