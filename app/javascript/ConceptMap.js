import $ from "jquery"
import vis from "vis-network"
import { DataSet } from "vis-data/peer/umd/vis-data.js"

class ConceptMap {
  static none = 0
  static addNode = 1
  static editNode = 2
  static addEdge = 3
  static editEdge = 4
  static dragNode = 5

  constructor({ edgeData, nodeData, conceptsPath, conceptMapsPath, linksPath, dialogTexts }) {
    this.conceptsPath = conceptsPath
    this.conceptMapsPath = conceptMapsPath
    this.linksPath = linksPath
    this.dialogTexts = dialogTexts

    this.edges = new DataSet(edgeData)
    this.nodes = new DataSet(nodeData)


    this.container = $('#map-canvas')[0]

    this.mode = ConceptMap.none
    this.canvasX = 0
    this.canvasY = 0
    this.id = 0

    this.options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.75
          },
        },
        smooth: false
      },
      physics: {
        enabled: false
      },
      interaction: {
        hover: true,
        navigationButtons: true,
        selectConnectedEdges: false,
        hoverConnectedEdges: false,
      }

    }

    this.network = new vis.Network(
      this.container,
      {
        nodes: this.nodes,
        edges: this.edges
      },
      this.options)

    $('#context-help-text').html($('#ch_normal').html())

    // close dialog on escape
    $("#entry_concept").on('keyup', function (e) {
      if (e.keyCode == 27)
        hideForm()
    })

    // close dialog on escape
    $("#entry_link").on('keyup', function (e) {
      if (e.keyCode == 27)
        hideForm()
    })

    this.network.on("hoverNode", () => {
      if (this.mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_hovernode').html())
      }
      this.network.canvas.body.container.style.cursor = 'pointer'
    })
    this.network.on("hoverEdge", () => {
      if (this.mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_hoveredge').html())
      }
      this.network.canvas.body.container.style.cursor = 'pointer'
    })

    this.network.on("blurNode", () => {
      if (this.mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_normal').html())
      }
      this.network.canvas.body.container.style.cursor = 'default'
    })
    this.network.on("blurEdge", () => {
      if (this.mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_normal').html())
      }
      this.network.canvas.body.container.style.cursor = 'default'
    })


    /*********************************
     * Network drag: save new node position
     ********************************/
    this.network.on("dragStart", (params) => {

      if (params.nodes.length > 0) {
        // DH: If a node is locked and the user wants to drag another node, make sure to close the Form
        if(this.mode == ConceptMap.editNode) {
            this.hideForm()
        }
        this.id = params.nodes[0]
        this.mode = ConceptMap.dragNode
      }
    })

    this.network.on("dragEnd", async (params) => {
      console.log(this.mode)
      switch (this.mode) {
        case ConceptMap.dragNode:

          if(!this.nodes.get(this.id).lock || this.nodes.get(this.id).lock == "false"){
            const res = await fetch(this.conceptsPath + "/" + this.id, {
              "method": "put",
              "mode": "same-origin",
              "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              },
              "body": JSON.stringify({ "concept": { 'label': this.nodes.get(this.id).label, 'x': params.pointer.canvas.x, 'y': params.pointer.canvas.y } })
            })
            const body = await res.json()

            this.nodes.update(body.node)
            this.mode = ConceptMap.none
            this.id = undefined
            this.hideForm()
        }
        else{
          // DH: locked nodes should not be movable
          this.nodes.update(this.nodes.get(this.id))
          this.mode = ConceptMap.none
          this.id = undefined


        }
        case ConceptMap.none:
          // DH: If the user changes the position of the node while editing another node, the node should not be moved!
          this.nodes.update(this.nodes.get(this.id))
          this.mode = ConceptMap.none
          this.id = undefined
      }
    })

    /*********************************
     * Network release: edit node or edge
     ********************************/
    this.network.on("release", (params) => {
      if (this.mode === ConceptMap.none) {
        if (params.edges.length) {
          this.editEdge(params)
        } else if (params.nodes.length) {
          this.editNode(params)
        }


      }
    })

    /*********************************
     * Network click: create an edge if a node was previously held, or cancel edge creation
     ********************************/
    this.network.on("click", params => {
      if (this.mode === ConceptMap.addEdge && params.nodes.length) {
        this.createEdge(params)
      } else if (this.mode === ConceptMap.addEdge && !params.nodes.length) {
        this.mode = ConceptMap.none
        this.id = undefined
      }
    })

    /*********************************
     * Network hold: start edge creation or create a node
     ********************************/
    this.network.on("hold", (params) => {
      if (this.mode == ConceptMap.none) {
        if (params.nodes.length > 0) {
          this.id = params.nodes[0]
          this.mode = ConceptMap.addEdge
        } else {
          this.createNode(params)
        }
      }
    })
  } // END CONSTRUCTOR

  /*********************************
  * create node
  ********************************/
  createNode = (params) => {
    const canvasX = params.pointer.canvas.x
    const canvasY = params.pointer.canvas.y
    this.mode = ConceptMap.addNode
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit node
  ********************************/
  editNode = async (params) => {
    // DH: Inform the channel that this node is getting edit
    this.id = params.nodes[0]
    // DH: IMPORT: We have to compare both: the boolean value and the string value
    if(!this.nodes.get(this.id).lock || this.nodes.get(this.id).lock == "false"){
      const res = await fetch(this.conceptsPath + "/" + this.id, {
        "method": "put",
        "mode": "same-origin",
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        "body": JSON.stringify({ "concept": { 'label': this.nodes.get(this.id).label, 'lock': 'true', 'x': this.nodes.get(this.id).x, 'y': this.nodes.get(this.id).y } })
      })
      const body = await res.json()

      this.nodes.update(body.node)
      this.mode = ConceptMap.none

      let canvasX
      let canvasY

      const currentNode = this.nodes.get(this.id)
      if (currentNode && currentNode.label !== "") {
        canvasX = currentNode.x
        canvasY = currentNode.y
        this.mode = ConceptMap.editNode
        this.showForm(canvasX, canvasY)
      }
    }else{
      // DH: Message for the user that the node is locked!
      let language =  navigator.userLanguage || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage
      if(language == "de"){
        alert("Der Knoten ist gesperrt!")
      }else{
        alert("The node is Locked!")
      }

    }


  }

  /*********************************
  * create edge
  ********************************/
  createEdge = (params) => {
    if (params.nodes.length > 0) {
      $('#start').val(this.id)
      $('#end').val(params.nodes[0])
      $('#context-help-text').html($('#ch_addedge').html()).removeClass("d-none")
      const startNode = this.nodes.get(this.id)
      const endNode = this.nodes.get(params.nodes[0])
      const canvasX = Math.min(startNode.x, endNode.x) + Math.abs(startNode.x - endNode.x) / 2
      const canvasY = Math.min(startNode.y, endNode.y) + Math.abs(startNode.y - endNode.y) / 2

      this.showForm(canvasX, canvasY)
    }
    else {
      this.hideForm()
    }
  }

  /*********************************
  * edit edge
  ********************************/
  editEdge = async (params) => {
    // DH: Inform the channel that this edge is getting edit
    this.id = params.edges[0]

    // DH: Fill the edit-dialog, needed for the case that a node got deleted while a link is locked
    $('#start').val(this.edges.get(this.id).from)
    $('#end').val(this.edges.get(this.id).to)

    // DH: IMPORT: We have to compare both: the boolean value and the string value.....
    if(!this.edges.get(this.id).lock || this.edges.get(this.id).lock == "false"){
      const res = await fetch(this.linksPath + "/" + this.id, {
        "method": "put",
        "mode": "same-origin",
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        "body": JSON.stringify({ "link": { 'label': this.edges.get(this.id).label, 'lock': 'true', "start_id": this.edges.get(this.id).from, "end_id": this.edges.get(this.id).to } })
      })
      const body = await res.json()

      this.edges.update(body.edge)
      this.mode = ConceptMap.none

      if (params.edges.length > 0) {
        this.id = params.edges[0]
        const canvasX = params.pointer.canvas.x
        const canvasY = params.pointer.canvas.y
        this.mode = ConceptMap.editEdge
        this.showForm(canvasX, canvasY)
      }
    }else{
      let language =  navigator.userLanguage || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage
      if(language == "de"){
        alert("Die Verbindung ist gesperrt!")
      }else{
        alert("The edge is Locked!")
      }
    }

  }

  /*********************************
  * delete nodes or edges
  ********************************/
  destroy = async () => {
    switch (this.mode) {
      case ConceptMap.editNode:
        await fetch(this.conceptsPath + "/" + this.id, {
          "method": "delete",
          "mode": "same-origin",
          "headers": {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        })
        this.nodes.remove(this.id)

        this.mode = ConceptMap.none
        this.id = undefined

        break
      case ConceptMap.editEdge:
        await fetch(this.linksPath + "/" + this.id, {
          "method": "delete",
          "mode": "same-origin",
          "headers": {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        })
        this.edges.remove(this.id)

        this.mode = ConceptMap.none
        this.id = undefined
        break
    }
    this.hideForm()
  }

  /*********************************
  * validate inputs: check for duplicated node names
  ********************************/
  validateForm = () => {
    if (this.mode == ConceptMap.addNode || this.mode == ConceptMap.editNode) {
      var t = $('#entry_concept').val()

      const node = this.nodes.get({
        filter: function (item) {
          return (item.label.toLocaleLowerCase() === t.toLocaleLowerCase())
        }
      })
      if (node == null || node.length == 0 || node[0].id == this.id)
        return true
      else {
        this.network.focus(node[0].id)
        return false
      }
    } else {
      return true
    }

  }

  /*********************************
  * focus element
  ********************************/
  focus = (id) => {
    setTimeout(function () {
      $(id).focus()
    }, 100)
  }

  /*********************************
  * put or post after editing/adding a node or an edge
  ********************************/
  onSubmit = async () => {
    const postObj = {}
    let method = "put"
    let path

    switch (this.mode) {

      case ConceptMap.addNode:
        method = "post"
        // DH: needed for the lock, set the lock to false
        $("#lock").val("false")

      case ConceptMap.editNode:
        postObj["x"] = $("#x").val()
        postObj["y"] = $("#y").val()
        postObj["label"] = $("#entry_concept").val()
        postObj["color"] = $("#color").val()
        // DH: add the ID
        //postObj["id"] = $("#concept_id").val()
        postObj["lock"] = $("#lock").val()
        path = this.conceptsPath
        break
      case ConceptMap.addEdge:
        method = "post"
        // DH: needed for the lock, set the lock to false
        $("#link_lock").val("false")
        postObj["start_id"] = parseInt($("#start").val(), 10)
        postObj["end_id"] = parseInt($("#end").val(), 10)
      case ConceptMap.editEdge:
        postObj["label"] = $("#entry_link").val()
        // DH: Add the link id
        //postObj["id"] = $("#link_id").val()
        postObj["lock"] = $("#link_lock").val()
        path = this.linksPath
        break
      default:
        // Nothing to submit, really. Shouldn't happen, but you never know.
        return
    }

    const res = await fetch(path + (method === "put" ? "/" + this.id : ""), {
      "method": method,
      "mode": "same-origin",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      "body": JSON.stringify(postObj)

    })

    const body = await res.json()

    if (body.edge) {
      this.edges.update(body.edge)

    }
    if (body.node) {
      this.nodes.update(body.node)
    }

    this.hideForm()
  }


  /*********************************
  * color picker stuff
  ********************************/
  standardizeColor = (color) => {
    var ctx = document.createElement('canvas').getContext('2d')
    ctx.fillStyle = color
    return ctx.fillStyle
  }

  changeColor = (id) => {
    var color = $('#color' + id).css('background-color')
    $('#currentColor').css('background-color', color)
    $("#color").attr("value", this.standardizeColor(color))
    for (var i = 1; i <= 6; ++i) {
      $('#color' + i).html("<span></span>")
    }
    $('#color' + id).html("<span class='bi-check-lg'></span>")
    $("#entry_concept").focus()
    $("#colorSelect").css("display", "none")
  }

  selectColor = (color) => {
    for (var i = 1; i <= 6; ++i) {
      if (this.standardizeColor($('#color' + i).css('background-color')) === color) {
        this.changeColor(i)
      }
    }
  }


  initNodeInputs = (canvasX, canvasY) => {
    $("#entry_concept").removeClass("d-none")
    $("#colorpicker").removeClass("d-none")
    $("#entry_link").addClass("d-none")
    this.mode === ConceptMap.addNode && $("#delete").addClass("d-none")
    this.mode === ConceptMap.editNode && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_concept")
  }

  initEdgeInputs = (canvasX, canvasY) => {
    $("#entry_link").removeClass("d-none")
    $("#entry_concept").addClass("d-none")
    $("#colorpicker").addClass("d-none")
    this.mode === ConceptMap.addEdge && $("#delete").addClass("d-none")
    this.mode === ConceptMap.editEdge && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_link")
  }

  showForm = (canvasX, canvasY) => {
    // attach close handler for clicks elsewhere
    this.network.once("click", (params) => {
      if (!params.nodes.length && !params.edges.length) {
        this.hideForm()
      }
    })

    $("#edit-dialog")
      .removeClass("d-none")
      .attr("style", "z-index: 1; position:absolute;left:" + ($("#map-canvas").offset().left + this.network.canvasToDOM({ x: canvasX, y: canvasY }).x - $("#form").width() / 2) + "px;top:" + ($("#map-canvas").offset().top + this.network.canvasToDOM({ x: canvasX, y: canvasY }).y - $("#form").height() / 2) + "px;")
    switch (this.mode) {
      case ConceptMap.addNode:
        $('#context-help-text').html($('#ch_new').html())
        $('#action').html(this.dialogTexts.addNode)
        $("#entry_concept").val("")
        this.initNodeInputs(canvasX, canvasY)
        break
      case ConceptMap.editNode:
        $('#context-help-text').html($('#ch_edit').html())
        $('#action').html(this.dialogTexts.editNode)
        $("#entry_concept").val(this.nodes.get(this.id).label)
        // DH: ADD the ID, needed to compare and reset the link_id
        $("#concept_id").val(this.nodes.get(this.id).id)
        // DH: Set the lock still on true
        $("#lock").val("true")
        $("#link_id").val("")
        this.initNodeInputs(canvasX, canvasY)
        this.selectColor(this.nodes.get(this.id).color.background)
        break
      case ConceptMap.editEdge:
        $('#context-help-text').html($('#ch_edit').html())
        $('#action').html(this.dialogTexts.editEdge)
        $("#entry_link").val(this.edges.get(this.id).label)
        // DH: ADD the ID, needed to compare and reset the concept_id
        $("#link_id").val(this.edges.get(this.id).id)
        $("#link_lock").val("true")
        $("#concept_id").val("")
        this.initEdgeInputs(canvasX, canvasY)
        break
      case ConceptMap.addEdge:
        $('#context-help-text').html($('#ch_new').html())
        $('#action').html(this.dialogTexts.addEdge)
        $("#entry_link").val("")
        this.initEdgeInputs(canvasX, canvasY)
    }
  }

  //Edit/Create Aktion beenden + Lock aufheben
  hideForm =  async () => {

    if(this.mode == ConceptMap.editNode ) {
      //DH: Node Lock aufheben
      const res = await fetch(this.conceptsPath + "/" + this.id, {
        "method": "put",
        "mode": "same-origin",
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        "body": JSON.stringify({ "concept": { 'label': this.nodes.get(this.id).label, 'lock': 'false', 'x': this.nodes.get(this.id).x, 'y': this.nodes.get(this.id).y } })
      })
      const body = await res.json()
      this.nodes.update(body.node)

    } else if(this.mode == ConceptMap.editEdge) {
      // DH: Edge Lock aufheben
      const res = await fetch(this.linksPath + "/" + this.id, {
        "method": "put",
        "mode": "same-origin",
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        "body": JSON.stringify({ "link": { 'label': this.edges.get(this.id).label, 'lock': 'false', "start_id": this.edges.get(this.id).from, "end_id": this.edges.get(this.id).to } })
      })
      const body = await res.json()
      this.edges.update(body.edge)
    }


    $("#edit-dialog").addClass("d-none")
    $("#edit-dialog").focusout()
    this.network.unselectAll()
    $('#context-help-text').html($('#ch_normal').html())
    //Zoom-Out by Mobilgeräten veranlassen
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.content = 'initial-scale=1'
      viewport.content = 'width=device-width'
      viewport.content = 'maximum-scale=1'
    }

    this.mode = ConceptMap.none
  }
  sendMail = () => {
    $('#emailgroup').removeClass('has-error')
    $('#emailgroup').removeClass('has-success')
    $('#submit').removeClass('btn-danger')
    $('#submit').removeClass('btn-success')
    if ($('#email').is(':valid') && $('#email').val() != '') {
      $.ajax({ url: this.conceptMapsPath + '?email=' + $('#email').val() })
      $('#submit').addClass('btn-success')
      $('#emailgroup').addClass('has-success')
    }
    else {
      $('#submit').addClass('btn-danger')
      $('#emailgroup').addClass('has-error')
    }
  }

  searchConcept = (searchTerm) => {
    if (searchTerm === "") {
      $('#searchGroup').removeClass('has-error')
      $('#searchGroup').removeClass('has-success')
      return
    }
    const node = this.nodes.get({
      filter: (node) => {
        return (node.label.slice(0, searchTerm.length).toLocaleLowerCase() === searchTerm.toLocaleLowerCase())
      }
    })
    if (node && node.length > 0) {
      this.network.focus(node[0].id)
      $('#searchGroup').removeClass('has-error')
      $('#searchGroup').addClass('has-success')
    }
    else {
      $('#searchGroup').removeClass('has-success')
      $('#searchGroup').addClass('has-error')
    }
  }

  /*********************************
  * // DH: external setter for node/edge data and mode
  ********************************/
  setNodeData = (nodeData) => {
    this.nodes.update(nodeData)
  }

  setEdgeData = (edgeData) => {
    this.edges.update(edgeData)
  }

  // DH Make the mode available for the channel
  setMode = (mode) => {
    this.mode = mode
  }

}


export default ConceptMap
