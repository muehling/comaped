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
  window.edges = cm.edges
  window.nodes = cm.nodes
  window.changeColor = cm.changeColor
}
