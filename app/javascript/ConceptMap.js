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
  static nodeButton = 6
  static edgeButton = 7
  static cursorButton = 8
  static editMultiNode = 9




  constructor({ edgeData, nodeData, conceptsPath, conceptMapsPath, linksPath, dialogTexts }) {


    this.conceptsPath = conceptsPath
    this.conceptMapsPath = conceptMapsPath
    this.linksPath = linksPath
    this.dialogTexts = dialogTexts

    this.edges = new DataSet(edgeData)
    this.nodes = new DataSet(nodeData)


    this.container = $('#map-canvas')[0]

    this.mode = ConceptMap.none
    this.buttonMode = ConceptMap.cursorButton
    this.canvasX = 0
    this.canvasY = 0
    this.id = 0
    this.ids = []
    this.data

    this.options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      edges: {
        arrows: {
          to: {
            enabled: true,

          },
        },
        smooth: { type: 'continuous' }
      },
      physics: {
        barnesHut: {
          springLength: 120,
          springConstant: 0.00,
          centralGravity: 0.0,
          gravitationalConstant: -150,
          avoidOverlap: 1,
          damping: 0.25
        },
        solver: "barnesHut"
      },
      interaction: {
        hover: true,
        navigationButtons: true,
        selectConnectedEdges: false,
        hoverConnectedEdges: false,
        multiselect: true,
      },
      manipulation: {
        enabled: false,
        initiallyActive: false,
        addNode: true,
        addEdge: function (data, callback) {
          // this.id = data.to
          // $('#start').val(data.from)
          // $('#end').val(data.to)
          // mode = ConceptMap.addEdge
          // const canvasX = nodes.get(this.id).x
          // const canvasY = nodes.get(this.id).y
          const connected_edges = [network.getConnectedEdges(data.from)]
          ///Checks for double edge in same direction
          for (let i = 0, len = connected_edges[0].length; i < len; i++) {
            // console.log ( nodes.get(edges.get(connected_edges[0][i]).from).label + " --> "
            //             + nodes.get(edges.get(connected_edges[0][i]).to).label)
            if (nodes.get(edges.get(connected_edges[0][i]).to).id == data.to) return console.log("double edge")
          }

          createEdge(data)
          //showForm(canvasX,canvasY)
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
      },
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


    $('#cursor-button').click(function () {
      console.log("cursor-event triggered")
      buttonMode = ConceptMap.cursorButton
      activeButton(1)
    })

    $('#node-button').click(function () {
      console.log("node-event triggered")
      buttonMode = ConceptMap.nodeButton
      activeButton(2)
      $("#misc-button").attr("hidden",true);
    })

    $('#edge-button').click(function () {
      console.log("edge-event triggered")
      buttonMode = ConceptMap.edgeButton
      network.addEdgeMode()
      activeButton(3)
      $("#misc-button").attr("hidden",true);
    })

    $('#misc-button').click(function () {
      console.log("misc-event triggered")
      //ConceptMap.mode = ConceptMap.editNode
      //showForm(this.canvasX, this.canvasY)
      $("#misc-button").attr("hidden",true);
    })




    this.network.on("hoverNode", (params) => {
      if (this.mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_hovernode').html())
      }
      console.log(nodes.get(params.node).y)
      $("#misc-button").removeAttr("hidden");
      this.canvasX = $("#map-canvas").offset().left + this.network.canvasToDOM({x: nodes.get(params.node).x, y: nodes.get(params.node).y }).x
      this.canvasY = $("#map-canvas").offset().top+this.network.canvasToDOM({x: nodes.get(params.node).x, y: nodes.get(params.node).y}).y -40
      $("#misc-button").attr("style", "z-index: 1; position:absolute; left:" + this.canvasX + "px;top:" + this.canvasY + "px;");
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
      $("#edit-dialog").addClass("d-none")
      
      console.log("DRAG")
      $("#misc-button").attr("hidden",true);
      if (params.nodes.length == 0) {
        this.mode = ConceptMap.none
        return
      }
      if (params.nodes.length > 0) {
        this.ids[0] = params.nodes[0]
        this.mode = ConceptMap.dragNode
      }
      $("#panel").addClass("hidden")
      $("#panel").focusout()
    })

    this.network.on("dragEnd", (params) => {
      console.log("DRAGEND")
      switch (this.mode) {
        case ConceptMap.dragNode:
          const oldX = nodes.get(this.ids[this.ids.length - 1]).x
          const oldY = nodes.get(this.ids[this.ids.length - 1]).y
          $.ajax({
            type: "PUT",
            url: this.conceptsPath + "/" + this.ids[this.ids.length - 1],
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: { "concept": { 'x': params.pointer.canvas.x, 'y': params.pointer.canvas.y } }
          }).always(() => {
            this.mode = ConceptMap.none
          })
          for (let i = this.ids.length - 2; i > -1; i--) {
            const diffX = oldX - nodes.get(this.ids[i]).x
            const diffY = oldY - nodes.get(this.ids[i]).y

            $.ajax({
              type: "PUT",
              url: this.conceptsPath + "/" + this.ids[i],
              headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              },
              data: { "concept": { 'x': params.pointer.canvas.x - diffX, 'y': params.pointer.canvas.y - diffY } }
            })
            console.log(this.ids[i])
            this.id = this.ids[i]
          }
          this.ids = []
          this.hideForm()
      }
    })



    this.network.on("doubleClick", params => {
      console.log("node add")
      $("#misc-button").attr("hidden",true);
      var canvasX = params.pointer.canvas.x
      var canvasY = params.pointer.canvas.y
      this.mode = ConceptMap.addNode
      this.showForm(canvasX, canvasY)
    })


    this.network.on("click", params => {
      $("#misc-button").attr("hidden",true);
      if (params.nodes.length == 0 && params.edges.length == 0) {   ///STAGE CLICKED///
        console.log("stage clicked")
        switch (buttonMode) {
          case ConceptMap.cursorButton:                                            ///CURSOR BUTTON ACTIVE
            console.log("CursorButton active - do nothing")
            break
          case ConceptMap.nodeButton:                                              ///NODE BUTTON ACTIVE
            console.log("node add")
            this.createNode(params)
            break
          case ConceptMap.edgeButton:                                              ///EDGE BUTTON ACTIVE
            console.log("EdgeButton active - do nothing")
            break
        }
      }
    })


    /*********************************
     * Network click: create an edge if a node was previously held, or cancel edge creation
     ********************************/
    this.network.on("select", params => {
      $("#misc-button").attr("hidden",true);
      console.log("buttonMode after Click: " + buttonMode)
      console.log("select Event:", params)

      if (params.nodes.length > 1) {                                       ///MULTI-NODES CLICKED///
        console.log("MULTI -EDIT")
        switch (buttonMode) {
          case ConceptMap.cursorButton:                                                ///CURSOR BUTTON ACTIVE
            this.mode = ConceptMap.editMultiNode
            this.id = params.nodes[0]
            for (let i = 0; i < params.nodes.length; i++) {
              this.ids[i] = params.nodes[i]
            }
            console.log("IDS: " + this.ids)
            this.showForm(this.nodes.get(this.id).x, this.nodes.get(this.id).y)
            break
          case ConceptMap.nodeButton:                                                  ///NODE BUTTON ACTIVE
            console.log("NodeButton active - do nothing")
            break
          case ConceptMap.edgeButton:                                                  ///EDGE BUTTON ACTIVE
            console.log("EdgeButton active - do nothing")
            break
        }
        return
      }
      else if (params.nodes.length == 1) {                                ///NODE CLICKED///
        //console.log("node clicked")
        switch (buttonMode) {
          case ConceptMap.cursorButton:                                              ///CURSOR BUTTON ACTIVE
            console.log("node edit")
            this.editNode(params)
            break
          case ConceptMap.nodeButton:                                                  ///NODE BUTTON ACTIVE
            console.log("NodeButton active - do nothing")
            break
          case ConceptMap.edgeButton:                                                  ///EDGE BUTTON ACTIVE
            console.log("NodeButton active - do nothing")
            break
        }
        return
      }
      else if (params.edges.length == 1) {                                ///EDGE CLICKED///
        console.log("edge clicked")
        switch (buttonMode) {
          case ConceptMap.cursorButton:                                            ///CURSOR BUTTON ACTIVE
            console.log("edge edit")
            this.editEdge(params)
            break
          case ConceptMap.nodeButton:                                              ///NODE BUTTON ACTIVE
            console.log("nodeButton active - do nothing")
            break
          case ConceptMap.edgeButton:                                              ///EDGE BUTTON ACTIVE
            console.log("EdgeButton active - do nothing")
        }
      }
    })

  }

  activeButton = (button) => {
    $('#cursor-button').css("border", "1px solid #ccc;")
    $('#node-button').css("border", "1px solid #ccc;")
    $('#edge-button').css("border", "1px solid #ccc;")
    console.log("button: " + button)
    switch (button) {
      case 1: {
        $('#cursor-button').css("border", "2px solid rgb(104, 104, 104);")
        console.log("1")
        break
      }
      case 2: {
        $('#node-button').css("border", "2px solid rgb(104, 104, 104);")
        console.log("2")
        break
      }
      case 3: {
        $('#edge-button').css("border", "2px solid rgb(104, 104, 104);")
        console.log("3")
      }
    }

  }

  /*********************************
  * create node
  ********************************/
  createNode = (params) => {
    var canvasX = params.pointer.canvas.x
    var canvasY = params.pointer.canvas.y
    this.mode = ConceptMap.addNode
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit node
  ********************************/
  editNode = (params) => {
    this.id = params.nodes[0]
    console.log("nodes.get: " +nodes.get(this.id).x, nodes.get(this.id).y);
    var canvasX = nodes.get(this.id).x
    var canvasY = nodes.get(this.id).y
    this.mode = ConceptMap.editNode
    this.showForm(canvasX, canvasY)
  }


  /*********************************
  * create edge
  ********************************/
  createEdge = (params) => {
    $('#start').val(params.from)
    $('#end').val(params.to)
    $('#context-help-text').html($('#ch_addedge').html()).removeClass("d-none")
    var startNode = this.nodes.get(params.from)
    var endNode = this.nodes.get(params.to)
    var canvasX = Math.min(startNode.x, endNode.x) + Math.abs(startNode.x - endNode.x) / 2
    var canvasY = Math.min(startNode.y, endNode.y) + Math.abs(startNode.y - endNode.y) / 2
    this.mode = ConceptMap.addEdge
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit edge
  ********************************/
  editEdge = (params) => {
    this.id = params.edges[0]
    console.log("editEdge: " + params.edges)
    var canvasX = params.pointer.canvas.x
    var canvasY = params.pointer.canvas.y
    this.mode = ConceptMap.editEdge
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * delete nodes or edges
  ********************************/
  destroy = async () => {
    console.log("destroy" + this.mode)
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
      case ConceptMap.editMultiNode:
        for (let i = 0; i < this.ids.length; i++) {
          $.ajax({
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            type: "DELETE", url: this.conceptsPath + "/" + this.ids[i]
          }).always(() => {
            this.mode = ConceptMap.none
          })
        }
        this.ids = []
        break
    }
    this.hideForm()
  }

  /*********************************
  * validate inputs: check for duplicated node names
  ********************************/
  validateForm = () => {
    console.log("-----------------validate-------------------")
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

  searchConcept(concept) {
    if (concept === "") {
      $('#searchGroup').removeClass('has-error')
      $('#searchGroup').removeClass('has-success')
      return
    }
    let node = this.nodes.get({
      filter: function (item) {
        return (item.label.toLocaleLowerCase() === concept.toLocaleLowerCase())
      }
    })
    if (node != null && node.length > 0) {
      network.focus(node[0].id, { animation: { duration: 1500, easingFunction: "easeInQuad"} })
      console.log("search complete");
      $('#searchGroup').removeClass('has-error')
      $('#searchGroup').addClass('has-success')
    }
    else {
      $('#searchGroup').removeClass('has-success')
      $('#searchGroup').addClass('has-error')
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
    console.log("-----------onSubmit----------" + this.mode)
    const postObj = {}
    let method = "put"
    let path

    switch (this.mode) {

      case ConceptMap.addNode:
        method = "post"
      case ConceptMap.editNode:
        postObj["x"] = $("#x").val()
        postObj["y"] = $("#y").val()
        postObj["label"] = $("#entry_concept").val()
        postObj["shape"] = $("#shape").val()
        postObj["color"] = $("#color").val()
        path = this.conceptsPath
        break
      case ConceptMap.addEdge:
        method = "post"
        postObj["start_id"] = parseInt($("#start").val(), 10)
        postObj["end_id"] = parseInt($("#end").val(), 10)
        postObj["arrows"] = $("#edge").val()
      case ConceptMap.editEdge:
        postObj["label"] = $("#entry_link").val()
        postObj["arrows"] = $("#edge").val()
        path = this.linksPath
        break
      case ConceptMap.editMultiNode:
        for (let i = 0; i < this.ids.length; i++) {
          console.log(this.ids[i])
          //this.id = this.ids[i]
          postObj["concept[shape]"] = $("#shape").val()
          postObj["concept[color]"] = $("#color").val()
          $.ajax({
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            type: "put",
            url: this.conceptsPath + "/" + this.ids[i],
            data: postObj
          })
        }
        this.ids = []
        this.hideForm()
        return
      default:
        console.log("default")
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

  /*********************************
  * shape picker stuff
  ********************************/
  changeShape(i) {
    var shape = $('#shape' + i).attr("value")
    $("#shape").attr("value", shape)
    for (var j = 1; j <= 6; ++j)
      $('#shape' + j).html("<span></span>")
    $('#shape' + i).html("<span class='bi-check-lg'></span>")
    $("#entry_concept").focus()
    $("#shapeSelect").css("display", "none")
    return false
  }

  selectShape(shape) {
    for (var i = 1; i <= 6; ++i)
      if ($('#shape' + i).attr("value") == shape)
        changeShape(i)
  }

  /*********************************
  * edge picker stuff
  ********************************/
  changeEdgeShape() {
    $('.arrow-direction').removeClass("from-arrow to-arrow")

    if ($('#edge').attr("value") == "to") {
      $("#edge").attr("value", "from")
      $('.arrow-direction').addClass("from-arrow")
    }
    else {
      $("#edge").attr("value", "to")
      $('.arrow-direction').addClass("to-arrow")
    }
    $("#entry_link").focus()
    return false
  }

  selectEdgeShape(shape) {
    $('.arrow-direction').removeClass("from-arrow to-arrow")
    if (shape == "from") {
      console.log("success")
      $("#edge").attr("value", "from")
      $('.arrow-direction').addClass("from-arrow")
    }
    if (shape == "to") {
      $("#edge").attr("value", "to")
      $('.arrow-direction').addClass("to-arrow")
    }
  }

  /*****************************************/

  initNodeInputs = (canvasX, canvasY) => {
    $("#entry_concept").removeClass("d-none")
    $("#entry_link").addClass("d-none")
    $("#colorpicker").removeClass("d-none")
    $("#shapepicker").removeClass("d-none")
    $("#edgepicker").addClass("d-none")
    this.mode === ConceptMap.addNode && $("#delete").addClass("d-none")
    this.mode === ConceptMap.editNode && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_concept")
  }

  initEdgeInputs = (canvasX, canvasY) => {
    $("#entry_concept").addClass("d-none")
    $("#entry_link").removeClass("d-none")
    $("#colorpicker").addClass("d-none")
    $("#shapepicker").addClass("d-none")
    $("#edgepicker").removeClass("d-none")
    this.mode === ConceptMap.addEdge && $("#delete").addClass("d-none")
    this.mode === ConceptMap.editEdge && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_link")
  }

  initMultiNodeInputs = () => {
    $("#entry_concept").addClass("d-none")
    $("#entry_link").addClass("d-none")
    $("#colorpicker").removeClass("d-none")
    $("#shapepicker").removeClass("d-none")
    $("#edgepicker").addClass("d-none")
    $("#delete").removeClass("d-none")
  }

  inBounds = (canvasX,canvasY) => {
    
  }

  showForm = (canvasX, canvasY) => {
    console.log("showForm mode: " + this.mode)
    const form_width = 312
    const form_height = 165
    var x_pos = $("#map-canvas").offset().left + this.network.canvasToDOM({x: canvasX, y: canvasY}).x
    var y_pos = $("#map-canvas").offset().top + this.network.canvasToDOM({x: canvasX, y: canvasY}).y
    console.log(canvasX,canvasY);
    console.log(x_pos,y_pos);
    if (form_width/2 < x_pos) var left= (x_pos - form_width/2)                                                 // Form is in bounds
    else if (form_width/2 > window.innerWidth - x_pos ) var left = window.innerWidth - form_width/2 - 10       // Form is out of bounds right side
    else {
      console.log("left out of bounds");
      var left= 10      
    }                                                                                                  
    if ( y_pos + form_height < window.innerHeight){                                                         // Form is out of bounds left side
      var top = y_pos - (form_height / 2)                         // Form is in bounds
    }
    else {
      var top= (window.innerHeight - form_height - 50)                                                              //Form is out of bounds bottom
      console.log("bottom out of bounds");
    }
    console.log("----------------MODE: " +this.mode);
    $("#edit-dialog")
      .removeClass("d-none")
      .attr("style", "z-index: 1; position:absolute;left:" + left + "px;top:" + top + "px;")
    switch (this.mode) {
      case ConceptMap.addNode:
        console.log("------addNode Mode---------")
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
        this.selectEdgeShape(this.edges.get(this.id).arrows)
        this.initEdgeInputs(canvasX, canvasY)
        break
      case ConceptMap.addEdge:
        $('#context-help-text').html($('#ch_new').html())
        $('#action').html(this.dialogTexts.addEdge)
        $("#entry_link").val("")
        this.initEdgeInputs(canvasX, canvasY)
        break
      case ConceptMap.editMultiNode:
        $('#context-help-text').html($('#ch_edit').html())
        $('#action').html(this.dialogTexts.editNode)
        this.initMultiNodeInputs()
        this.selectColor(this.nodes.get(this.id).color.background)
        this.selectShape(this.nodes.get(this.id).shape)
    }
  }

  //Edit/Create Aktion beenden
  hideForm = () => {
    console.log("--------------hideForm----------------------")
    $("#edit-dialog").addClass("d-none")
    $("#edit-dialog").focusout()
    this.network.unselectAll()
    this.network.disableEditMode()
    $('#context-help-text').html($('#ch_normal').html())
    //Zoom-Out by Mobilgeräten veranlassen
    const viewport = document.querySelector('meta[name="viewport"]')
    // if (viewport) {
    //   viewport.content = 'initial-scale=1'
    //   viewport.content = 'width=device-width'
    //   viewport.content = 'maximum-scale=1'
    // }

    this.mode = ConceptMap.none
    buttonMode = ConceptMap.cursorButton
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
}


export default ConceptMap