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

  constructor({ edgeData, nodeData, conceptsPath, linksPath, dialogTexts }) {

    this.edges = new DataSet(edgeData)
    this.nodes = new DataSet(nodeData)
    this.conceptsPath = conceptsPath
    this.linksPath = linksPath
    this.dialogTexts = dialogTexts

    this.data = {
      nodes: this.nodes,
      edges: this.edges
    }

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

    this.network = new vis.Network(this.container, this.data, this.options)

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
        this.id = params.nodes[0]
        this.mode = ConceptMap.dragNode
      }
    })

    this.network.on("dragEnd", (params) => {
      switch (this.mode) {
        case ConceptMap.dragNode:
          $.ajax({
            type: "PUT",
            url: this.conceptsPath + "/" + this.id,
            headers: {
              'Accept': 'text/javascript',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: { "concept": { 'label': this.nodes.get(this.id).label, 'x': params.pointer.canvas.x, 'y': params.pointer.canvas.y } }
          }).always(() => {
            this.mode = ConceptMap.none
            this.id = undefined
          })
          this.hideForm()
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
  }

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
  editNode = (params) => {
    let canvasX
    let canvasY

    this.id = params.nodes[0]

    const currentNode = this.nodes.get(this.id)
    if (currentNode && currentNode.label !== "") {
      canvasX = currentNode.x
      canvasY = currentNode.y
      this.mode = ConceptMap.editNode
      this.showForm(canvasX, canvasY)
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
  editEdge = (params) => {
    if (params.edges.length > 0) {
      this.id = params.edges[0]
      const canvasX = params.pointer.canvas.x
      const canvasY = params.pointer.canvas.y
      this.mode = ConceptMap.editEdge
      this.showForm(canvasX, canvasY)
    }
  }

  /*********************************
  * delete nodes or edges
  ********************************/
  destroy = () => {
    switch (this.mode) {
      case ConceptMap.editNode:
        $.ajax({
          headers: {
            'Accept': 'text/javascript',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          type: "DELETE", url: this.conceptsPath + "/" + this.id
        }).always(() => {
          this.mode = ConceptMap.none
          this.id = undefined
        })
        break
      case ConceptMap.editEdge:
        $.ajax({
          headers: {
            'Accept': 'text/javascript',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          type: "DELETE", url: this.linksPath + "/" + this.id
        }).always(() => {
          this.mode = ConceptMap.none
          this.id = undefined
        })
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
  onSubmit = () => {
    const postObj = {}
    let method = "put"
    let path

    switch (this.mode) {

      case ConceptMap.addNode:
        method = "post"
      case ConceptMap.editNode:
        postObj["concept[x]"] = $("#x").val()
        postObj["concept[y]"] = $("#y").val()
        postObj["concept[label]"] = $("#entry_concept").val()
        postObj["concept[color]"] = $("#color").val()
        path = this.conceptsPath
        break
      case ConceptMap.addEdge:
        method = "post"
        postObj["link[start]"] = $("#start").val()
        postObj["link[end]"] = $("#end").val()
      case ConceptMap.editEdge:
        postObj["link[label]"] = $("#entry_link").val()
        path = this.linksPath
        break
      default:
        // Nothing to submit, really. Shouldn't happen, but you never know.
        return
    }

    $.ajax({
      headers: {
        'Accept': 'text/javascript',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      type: method,
      url: path + (method === "put" ? "/" + this.id : ""),
      data: postObj
    }).always(() => {
      this.hideForm()
    })
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
    $('#currentColor').css('background-color', $('#color' + id).css('background-color'))
    var color = $('#currentColor').css('background-color')
    $("#color").attr("value", this.standardizeColor(color))
    for (var i = 1; i <= 6; ++i)
      $('#color' + i).html("<span></span>")
    $('#color' + id).html("<span class='glyphicon glyphicon-ok'></span>")
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

    $("#panel")
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
        this.initNodeInputs(canvasX, canvasY)
        this.selectColor(this.nodes.get(this.id).color.background)
        break
      case ConceptMap.editEdge:
        $('#context-help-text').html($('#ch_edit').html())
        $('#action').html(this.dialogTexts.editEdge)
        $("#entry_link").val(this.edges.get(this.id).label)
        this.initEdgeInputs(canvasX, canvasY)
        break
      case ConceptMap.addEdge:
        $('#context-help-text').html($('#ch_new').html())
        $('#action').html(this.dialogTexts.addEdge)
        $("#entry_link").val("")
        this.initEdgeInputs(canvasX, canvasY)
    }
  }

  //Edit/Create Aktion beenden
  hideForm = () => {
    $("#panel").addClass("d-none")
    $("#panel").focusout()
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
}


export default ConceptMap