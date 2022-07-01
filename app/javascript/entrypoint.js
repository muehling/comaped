import ConceptMap from "./ConceptMap"
import "jquery"

import "vis-network"
import "bootstrap"

export let cm

export const init = (edgeData, nodeData) => {
  cm = new ConceptMap(edgeData, nodeData)

  // expose handlers needed for DOM events
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
}
