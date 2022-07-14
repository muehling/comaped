import "@hotwired/turbo-rails"
import $ from "jquery"

import "popper"
import "bootstrap"

import ConceptMap from "./ConceptMap"

export let cm

window.$ = $
window.bootstrap = bootstrap

export const init = (edgeData, nodeData) => {
  cm = new ConceptMap(edgeData, nodeData)

  // expose handlers needed for DOM events
  window.network = cm.network
  window.showForm = cm.showForm
  window.hideForm = cm.hideForm
  window.validateForm = cm.validateForm
  window.searchConcept = cm.searchConcept
  window.sendMail = cm.sendMail
  window.destroy = cm.destroy
  window.submitChanges = (event) => {
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
  window.searchConcept = cm.searchConcept
}
