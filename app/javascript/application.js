import "jquery"
import "vis-network"
import "bootstrap"
import "@hotwired/turbo-rails"
import ConceptMap from "./ConceptMap"

export let cm

export const init = (edgeData, nodeData) => {
  cm = new ConceptMap(edgeData, nodeData)

  // expose handlers needed for DOM events
  window.network = cm.network
  window.showForm = cm.showForm
  window.hideForm = cm.hideForm
  window.validateForm = cm.validateForm

  window.destroy = cm.destroy
  window.submitChanges = (event) => {
    event.preventDefault()
    event.stopPropagation()
    cm.onSubmit()
    return false
  }
  window.edges = cm.edges
  window.nodes = cm.nodes
  window.changeColor = cm.changeColor
  window.changeShape = cm.changeShape
  window.changeEdgeShape = cm.changeEdgeShape
  window.mode = cm.mode
  window.buttonMode = cm.buttonMode
  window.activeButton = cm.activeButton
  window.createEdge = cm.createEdge
  window.searchConcept = cm.searchConcept
}
