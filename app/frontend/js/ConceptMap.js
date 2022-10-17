import $ from "jquery"
import { Network } from "vis-network"
import { DataSet } from "vis-data"

class ConceptMap {

  static none = 0
  static addNode = 1
  static editNode = 2
  static addEdge = 3
  static editEdge = 4
  static dragNode = 5
  static editMultiNode = 6

  static nodeButton = 8
  static edgeButton = 9
  static editButton = 10

  //If device has no hover it is a touch device
  static touchDevice = window.matchMedia('(hover: hover)').matches ? false : true


  constructor({ edgeData, nodeData, conceptsPath, conceptMapsPath, linksPath, dialogTexts }) {

    this.conceptsPath = conceptsPath
    this.conceptMapsPath = conceptMapsPath
    this.linksPath = linksPath
    this.dialogTexts = dialogTexts

    this.edges = new DataSet(edgeData)
    this.nodes = new DataSet(nodeData)

    this.container = $('#map-canvas')[0]

    this.mode = ConceptMap.none
    this.buttonMode = ConceptMap.editButton   //Start in Edit-Mode
    this.activeButton(1)                      //Highlight Edit-Button
    this.canvasX = 0
    this.canvasY = 0
    this.oldPointerX = 0                      //Saves Pointerlocation when drag starts
    this.oldPointerY = 0
    this.ids = []
    this.data

    /**********************************
    * SETTINGS for Vis Network library
    ***********************************/
    this.options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      edges: {
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
          $("#addEdgeToast").fadeOut(500)
          var connected_edges = [network.getConnectedEdges(data.from)]
          for (let i = 0, len = connected_edges[0].length; i < len; i++) {
            if (nodes.get(edges.get(connected_edges[0][i]).to).id == data.to && nodes.get(edges.get(connected_edges[0][i]).from).id == data.from) {
              network.disableEditMode()
              activeButton(1)
              buttonMode = ConceptMap.editButton
              // if context_help is displayed show doubleEdgeToast instead for 6s then display context_help again
              if (!$('#context-help').hasClass('d-none')) {
                $('#context-help').addClass('d-none')
                $("#doubleEdgeToast").fadeIn(500)
                setTimeout(function () {
                  $("#doubleEdgeToast").fadeOut(500)
                  $('#context-help').removeClass('d-none')
                  $('#context-help-text').html($('#ch_editMode').html())
                }, 6000)
              }
              else {
                $("#doubleEdgeToast").fadeIn(500)
                setTimeout(function () {
                  $("#doubleEdgeToast").fadeOut(500)
                }, 6000)
              }
              mode = ConceptMap.none
              return
            }
          }
          createEdge(data)
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
      },
    }
    /****************************************************************/

    this.network = new Network(
      this.container,
      {
        nodes: this.nodes,
        edges: this.edges
      },
      this.options
    )

    /********************************
    * Make EditForm movable
    ********************************/

    // document.getElementById("edit-dialog").ontouchmove = preventZoom;



    // function preventZoom(e) {
    //   e = e || window.event
    //   e.preventDefault()
    // }


    dragElement(document.getElementById("edit-dialog"))

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
      if (document.getElementById(elmnt.id + "-header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown
      }
      function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }
      function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
      }
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }
    /****************************************************/

    /********************************
     * NODE & EDGE BUTTONS
     ********************************/

    // editButton pressed
    $('#editButton').click(function () {
      $('#context-help-text').html($('#ch_editMode').html())
      buttonMode = ConceptMap.editButton
      activeButton(1)
      network.disableEditMode()
      network.unselectAll()
    })
    // nodeButton pressed
    $('#nodeButton').click(function () {
      $('#context-help-text').html($('#ch_addNodeMode').html())
      buttonMode = ConceptMap.nodeButton
      activeButton(2)
      network.disableEditMode()
      network.unselectAll()
      $("#hoverButton").attr("hidden", true)
    })
    // edgeButton pressed
    $('#edgeButton').click(function () {
      $('#context-help-text').html($('#ch_addEdgeMode').html())
      buttonMode = ConceptMap.edgeButton
      activeButton(3)
      network.unselectAll()
      $("#hoverButton").attr("hidden", true)
      network.addEdgeMode()
    })

    /**************************************
    * hoverButton pressed => show EditForm
    ***************************************/
    $('#hoverButton').click(function () {
      mode = ConceptMap.editNode
      $("#hoverButton").attr("hidden", true)
      showForm(canvasX, canvasY)
    })
    /*******************************************/

    /*************
     * MISC Stuff
     *************/

    //   // Prevent Zoom on DoubleClick on mobile devices
    //    document.addEventListener('dblclick', (event) => {
    //     event.preventDefault()
    // }, { passive: false });

    // Default Infotext
    $('#context-help-text').html($('#ch_editMode').html())

    // Disable ContextMenu for Touchdevices
    if (ConceptMap.touchDevice)
      document.addEventListener('contextmenu', event => event.preventDefault())

    // Hide hoverButton on Zoom
    this.network.on("zoom", () => {
      $("#hoverButton").attr("hidden", true)
    })

    // ESC Pressed
    document.addEventListener('keyup', (e) => {
      if (e.code == "Escape") {
        hideForm()
        $("#hoverButton").attr("hidden", true)
      }
    })
    /********************************************/

    /********************************
     * HOVER NODE/EDGE EVENT
     ********************************/
    this.network.on("hoverNode", (params) => {
      // Show hoverButton only in EditMode for non Touchdevices. Also Disabled while dragging Form oder Nodes.
      if (buttonMode == ConceptMap.editButton && mode == ConceptMap.none && !ConceptMap.touchDevice) {
        this.network.canvas.body.container.style.cursor = 'pointer'
        $('#context-help-text').html($('#ch_hovernode').html()) // Infotext hovernode
        // Display Hover-Button
        $("#hoverButton").removeAttr("hidden")
        this.ids[0] = params.node
        canvasX = nodes.get(this.ids[0]).x
        canvasY = nodes.get(this.ids[0]).y
        $("#hoverButton").attr("style", "z-index: 1; position:absolute; left:" + this.network.canvasToDOM({ x: canvasX, y: canvasY }).x + "px;top:" + (this.network.canvasToDOM({ x: canvasX, y: canvasY }).y - 40) + "px;")
      }
    })
    this.network.on("hoverEdge", () => {
      if (buttonMode == ConceptMap.edgeButton) return
      $('#context-help-text').html($('#ch_hoveredge').html())
      this.network.canvas.body.container.style.cursor = 'pointer'
    })

    /********************************
     * HOVER NODE/EDGE EVENT EXIT
     ********************************/
    this.network.on("blurNode", () => {
      // Show Infotext depending on current buttonMode
      if (buttonMode == ConceptMap.editButton) $('#context-help-text').html($('#ch_editMode').html())
      else if (buttonMode == ConceptMap.nodeButton) $('#context-help-text').html($('#ch_addNodeMode').html())
      else if (buttonMode == ConceptMap.edgeButton) $('#context-help-text').html($('#ch_addEdgeMode').html())
      this.network.canvas.body.container.style.cursor = 'default'
    })
    this.network.on("blurEdge", () => {
      // Show Infotext depending on current buttonMode
      if (buttonMode == ConceptMap.editButton) $('#context-help-text').html($('#ch_editMode').html())
      else if (buttonMode == ConceptMap.nodeButton) $('#context-help-text').html($('#ch_addNodeMode').html())
      else if (buttonMode == ConceptMap.edgeButton) $('#context-help-text').html($('#ch_addEdgeMode').html())
      this.network.canvas.body.container.style.cursor = 'default'
    })


    /***************************************
     * DRAG EVENT: save new node position
     ***************************************/
    this.network.on("dragStart", (params) => {
      $("#hoverButton").attr("hidden", true)
      if (params.nodes.length > 0) {  // Does not fire when Stage is dragged
        this.ids[0] = params.nodes[0]
        mode = ConceptMap.dragNode
        this.oldPointerX = params.pointer.canvas.x
        this.oldPointerY = params.pointer.canvas.y
        $("#edit-dialog").addClass("d-none")
      }
    })
    this.network.on("dragEnd", async (params) => {
      const postObj = {}
      switch (mode) { // Does not trigger when Stage is dragged
        case ConceptMap.dragNode:
          const newPointerX = params.pointer.canvas.x
          const newPointerY = params.pointer.canvas.y
          const diffX = this.oldPointerX - newPointerX
          const diffY = this.oldPointerY - newPointerY

          for (let i = this.ids.length - 1; i >= 0; i--) {
            postObj["x"] = nodes.get(this.ids[i]).x - diffX
            postObj["y"] = nodes.get(this.ids[i]).y - diffY
            const res = await fetch(this.conceptsPath + "/" + this.ids[i], {
              "method": "put",
              "mode": "same-origin",
              "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              },
              "body": JSON.stringify(postObj)
            })
            // Update Node(s) or Edges depending on Response from DB
            var body = await res.json()
            if (body.edge) this.edges.update(body.edge)
            if (body.node) this.nodes.update(body.node)
          }
          this.ids = []
          this.hideForm()
      }
    })

    /************************************
    * DOUBLECLICK EVENT: Create a Node
    *************************************/
    this.network.on("doubleClick", params => {
      if (buttonMode == ConceptMap.edgeButton)
        return
      $("#hoverButton").attr("hidden", true)
      this.createNode(params)
    })

    /**********************************************************
    * CLICK STAGE EVENT: If NodeButton active, create a Node
    ***********************************************************/
    this.network.on("click", params => {
      if (params.nodes.length == 0 && params.edges.length == 0) { ///STAGE selected
        $("#hoverButton").attr("hidden", true)
        if (buttonMode == ConceptMap.nodeButton) {
          this.createNode(params)
        }
      }
    })

    /***************************************
    * SELECT EVENT: edit Node(s) or Edge
    ****************************************/
    this.network.on("select", params => {
      if (buttonMode == ConceptMap.editButton) {
        if (params.nodes.length > 1) {        ///MULTI-NODES selected///
          $("#hoverButton").attr("hidden", true)
          mode = ConceptMap.editMultiNode
          for (let i = 0; i < params.nodes.length; i++)
            this.ids[i] = params.nodes[i]
          this.showForm(this.nodes.get(this.ids[0]).x, this.nodes.get(this.ids[0]).y)
        }
        else if (params.nodes.length == 1) {  ///NODE selected///
          $("#hoverButton").attr("hidden", true)
          if (ConceptMap.touchDevice) {
            this.editNode(params)
          }
        }
        else if (params.edges.length == 1) {  ///EDGE selected///
          $("#hoverButton").attr("hidden", true)
          this.editEdge(params)
        }
      }
    })

  }
  /**************************************************************************/

  /*********************
   * HELPER FUNCTIONS
   *********************/

  /******************************************************
  * Highlights the active button (Edit/Add-Node/Add-Edge)
  *******************************************************/
  activeButton = (button) => {
    $('#editButton').removeClass("active-button")
    $('#nodeButton').removeClass("active-button")
    $('#edgeButton').removeClass("active-button")
    if (button == 1) $('#editButton').addClass("active-button")
    else if (button == 2) $('#nodeButton').addClass("active-button")
    else if (button == 3) $('#edgeButton').addClass("active-button")
  }

  /*********************************
  * create node
  ********************************/
  createNode = (params) => {
    var canvasX = params.pointer.canvas.x
    var canvasY = params.pointer.canvas.y
    mode = ConceptMap.addNode
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit node
  ********************************/
  editNode = (params) => {
    this.ids[0] = params.nodes[0]
    canvasX = nodes.get(this.ids[0]).x
    canvasY = nodes.get(this.ids[0]).y
    mode = ConceptMap.editNode
    this.showForm(canvasX, canvasY)
  }


  /*********************************
  * create edge
  ********************************/
  createEdge = (params) => {
    $('#start').val(params.from)
    $('#end').val(params.to)
    $('#context-help-text').html($('#ch_addEdgeMode').html()).removeClass("d-none")
    var startNode = this.nodes.get(params.from)
    var endNode = this.nodes.get(params.to)
    var canvasX = Math.min(startNode.x, endNode.x) + Math.abs(startNode.x - endNode.x) / 2
    var canvasY = Math.min(startNode.y, endNode.y) + Math.abs(startNode.y - endNode.y) / 2
    mode = ConceptMap.addEdge
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit edge
  ********************************/
  editEdge = (params) => {
    this.ids[0] = params.edges[0]
    var canvasX = params.pointer.canvas.x
    var canvasY = params.pointer.canvas.y
    mode = ConceptMap.editEdge
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * delete nodes or edges
  ********************************/
  destroy = async () => {
    switch (mode) {
      case ConceptMap.editNode:
        await fetch(this.conceptsPath + "/" + this.ids[0], {
          "method": "delete",
          "mode": "same-origin",
          "headers": {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        })
        this.nodes.remove(this.ids[0])
        break
      case ConceptMap.editEdge:
        await fetch(this.linksPath + "/" + this.ids[0], {
          "method": "delete",
          "mode": "same-origin",
          "headers": {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          }
        })
        this.edges.remove(this.ids[0])
        break
      case ConceptMap.editMultiNode:
        for (let i = 0; i < this.ids.length; i++) {
          await fetch(this.conceptsPath + "/" + this.ids[i], {
            "method": "delete",
            "mode": "same-origin",
            "headers": {
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
          })
          this.nodes.remove(this.ids[i])
        }
        break
    }
    mode = ConceptMap.none
    this.ids = []
    this.hideForm()
  }

  /*********************************
  * validate inputs: check for duplicated node names
  ********************************/
  validateForm = () => {
    if (mode == ConceptMap.addNode || mode == ConceptMap.editNode) {
      var t = $('#entry_concept').val()
      const node = this.nodes.get({
        filter: function (item) {
          return (item.label.toLocaleLowerCase() === t.toLocaleLowerCase())
        }
      })
      if (node == null || node.length == 0 || node[0].id == this.ids[0])
        return true
      else { // Node with this label already exists
        this.network.focus(node[0].id)
        // if context_help is displayed show doubleNodeToast instead for 6s then display context_help again
        if (!$('#context-help').hasClass('d-none')) {
          $('#context-help').addClass('d-none')
          $("#doubleNodeToast").fadeIn(500)
          setTimeout(function () {
            $("#doubleNodeToast").fadeOut(500)
            $('#context-help').removeClass('d-none')
          }, 6000)
        }
        else {
          $("#doubleNodeToast").fadeIn(500)
          setTimeout(function () {
            $("#doubleNodeToast").fadeOut(500)
          }, 6000)
        }
        return false
      }
    }
    else
      return true
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
  * put or post after editing/adding node(s) or an edge
  ********************************/
  onSubmit = async () => {
    const postObj = {}
    let method = "put"
    let path
    $("#entry_concept").val($("#entry_concept").val().replace(/\\/g," ")) // prevent input of "\" because vis network cannot handle this symbol

    switch (mode) {
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
      case ConceptMap.editEdge:
        postObj["label"] = $("#entry_link").val()
        path = this.linksPath
        break
      case ConceptMap.editMultiNode:
        for (let i = 0; i < this.ids.length; i++) {
          postObj["shape"] = $("#shape").val()
          postObj["color"] = $("#color").val()
          var res = await fetch(this.conceptsPath + "/" + this.ids[i], {
            "method": "put",
            "mode": "same-origin",
            "headers": {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            "body": JSON.stringify(postObj)
          })
          var body = await res.json()
          if (body.edge) this.edges.update(body.edge)
          if (body.node) this.nodes.update(body.node)
        }
        this.ids = []
        this.hideForm()
        return
      default:
        // Nothing to submit, really. Shouldn't happen, but you never know.
        return
    }
    if (!postObj.label) {
      alert("Der Name muss ausgefüllt sein!")
      return
    }

    //Fetch for all cases except MultiNodes
    var res = await fetch(path + (method === "put" ? "/" + this.ids[0] : ""), {
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
    var body = await res.json()
    if (body.edge) this.edges.update(body.edge)
    if (body.node) this.nodes.update(body.node)
    this.ids = []
    this.hideForm()
  }


  /*********************************
  * colorpicker stuff
  ********************************/
  selectColor = (color) => {
    for (var i = 1; i <= 6; ++i)
      if (this.standardizeColor($('#color' + i).css('background-color')) === color) this.changeColor(i)
  }
  changeColor = (id) => {
    var color = $('#colorSelect-' + id).css('background-color')

    $('#currentColor').css('background-color', color)
    $("#color").attr("value", this.standardizeColor(color))

    $('.colorSelectIcon').each(function () {
      $(this).html("<span></span>")
    })

    $('#colorSelect-' + id).html("<span class='bi-check-lg'></span>")
    $("#entry_concept").focus()
  }
  standardizeColor = (color) => {
    var ctx = document.createElement('canvas').getContext('2d')
    ctx.fillStyle = color
    return ctx.fillStyle
  }

  /*********************************
  * shapepicker stuff
  ********************************/
  selectShape(shape) {
    for (var i = 1; i <= 3; ++i)
      if ($('#shape' + i).attr("value") == shape) changeShape(i)
  }
  changeShape(i) {
    var shape = $('#shape' + i).attr("value")
    $("#shape").attr("value", shape)
    switch (shape){
      case "circle": $("#currentShape").addClass("currently-circle").removeClass("currently-box currently-ellipse"); break;
      case "box": $("#currentShape").addClass("currently-box").removeClass("currently-circle currently-ellipse"); break;
      case "ellipse": $("#currentShape").addClass("currently-ellipse").removeClass("currently-box currently-circle"); break;
    }
    $("#entry_concept").focus()
    $("#shapeSelect").css("display", "none")
    return false
  }

  selectColor = (color) => {
    for (var i = 0; i < 6; ++i) {
      if (this.standardizeColor($('#colorSelect-' + i).css('background-color')) === color) {
        this.changeColor(i)
      }
    }
  }

  /******************************************
  * controls buttons to display in EditForm
  *******************************************/
  initNodeInputs = (canvasX, canvasY) => {
    $("#entry_concept").removeClass("d-none")
    $("#entry_link").addClass("d-none")
    $("#colorpicker").removeClass("d-none")
    $("#shapepicker").removeClass("d-none")
    $("#edgepicker").addClass("d-none")
    mode === ConceptMap.addNode && $("#delete").addClass("d-none")
    mode === ConceptMap.editNode && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_concept")
  }

  /******************************************
  * controls buttons to display in EditForm
  *******************************************/
  initEdgeInputs = (canvasX, canvasY) => {
    $("#entry_concept").addClass("d-none")
    $("#entry_link").removeClass("d-none")
    $("#colorpicker").addClass("d-none")
    $("#shapepicker").addClass("d-none")
    $("#edgepicker").removeClass("d-none")
    mode === ConceptMap.addEdge && $("#delete").addClass("d-none")
    mode === ConceptMap.editEdge && $("#delete").removeClass("d-none")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_link")
  }

  /******************************************
   * controls buttons to display in EditForm
   *******************************************/
  initMultiNodeInputs = () => {
    $("#entry_concept").addClass("d-none")
    $("#entry_link").addClass("d-none")
    $("#colorpicker").removeClass("d-none")
    $("#shapepicker").removeClass("d-none")
    $("#edgepicker").addClass("d-none")
    $("#delete").removeClass("d-none")
  }

  /*************************************
   * Calculates Position of EditForm
   ************************************/
  inBounds = (canvasX, canvasY) => {
    $("#edit-dialog").removeClass("d-none")
    const form_width = $('#edit-dialog').width()
    const form_height = $('#edit-dialog').height()
    var x_pos = $("#map-canvas").offset().left + this.network.canvasToDOM({ x: canvasX, y: canvasY }).x
    var y_pos = $("#map-canvas").offset().top + this.network.canvasToDOM({ x: canvasX, y: canvasY }).y
    var left = (x_pos - form_width / 2)   // Form is in bounds
    var top = y_pos - (form_height / 2) // Form is in bounds

    if (form_width / 2 > window.innerWidth - x_pos) left = window.innerWidth - form_width - 20   // Form is out of bounds right side
    else if (x_pos - form_width / 2 < 0) left = 20   // Form is out of bounds left side
    if (form_height > window.innerHeight - y_pos) var top = (window.innerHeight - form_height - 20)  //Form is out of bounds bottom
    else if (y_pos - form_height / 2 < 0) var top = 20    //Form is out of bounds top

    $("#edit-dialog").attr("style", "z-index: 1; position:absolute;left:" + left + "px;top:" + top + "px;")
  }

  /*******************************************
   * EditForm to Create/Edit Nodes and Edges
   * Controls which buttons are displayed
   *******************************************/
  showForm = (canvasX, canvasY) => {
    this.inBounds(canvasX, canvasY)
    switch (mode) {
      case ConceptMap.addNode:
        $('#context-help-text').html($('#ch_newNode').html())
        $('#action').html(this.dialogTexts.addNode)
        $("#entry_concept").val("")
        this.initNodeInputs(canvasX, canvasY)                           //controls buttons to display
        break
      case ConceptMap.editNode:
        $('#context-help-text').html($('#ch_editNode').html())
        $('#action').html(this.dialogTexts.editNode)
        $("#entry_concept").val(this.nodes.get(this.ids[0]).label)
        this.initNodeInputs(canvasX, canvasY)                           //controls buttons to display
        this.selectColor(this.nodes.get(this.ids[0]).color.background)  //determines current color
        this.selectShape(this.nodes.get(this.ids[0]).shape)             //determines current shape
        break
      case ConceptMap.editEdge:
        $('#context-help-text').html($('#ch_editEdge').html())
        $('#action').html(this.dialogTexts.editEdge)
        $("#entry_link").val(this.edges.get(this.ids[0]).label)
        this.initEdgeInputs(canvasX, canvasY)                           //controls buttons to display
        break
      case ConceptMap.addEdge:
        $('#context-help-text').html($('#ch_newEdge').html())
        $('#action').html(this.dialogTexts.addEdge)
        $("#entry_link").val("")
        this.initEdgeInputs(canvasX, canvasY)                           //controls buttons to display
        break
      case ConceptMap.editMultiNode:
        $('#context-help-text').html($('#ch_edit').html())
        $('#action').html(this.dialogTexts.editNode)
        this.initMultiNodeInputs()                                      //controls buttons to display
        this.selectColor(this.nodes.get(this.ids[0]).color.background)  //determines current color
    }
  }

  /*******************************************
   * Hides EditForm and sets EditMode active
   *******************************************/
  hideForm = () => {
    $("#edit-dialog").addClass("d-none")
    //$("#edit-dialog").focusout()
    this.network.disableEditMode()
    this.network.unselectAll()
    $("#colorSelect").css("display", "none") // close colorDropdown
    $("#shapeSelect").css("display", "none") // close shapeDropdown
    $('#context-help-text').html($('#ch_editMode').html())
    mode = ConceptMap.none
    buttonMode = ConceptMap.editButton
    this.activeButton(1)
    //Zoom-Out by Mobilgeräten veranlassen
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.content = 'initial-scale=1.0'
      viewport.content = 'width=device-width'
      viewport.content = 'minimum-scale=1.0'
      viewport.content = 'maximum-scale=1.0'
      // viewport.content = 'user-scalable=no'
      // viewport.content = 'height=device-height'
      // viewport.content = 'target-densitydpi=device-dpi'
    }
  }

  /*********************************
   * Send Concept Map Code to Mail
   *********************************/
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

  /**********************************************
   * Search for Nodes and move camera to result
   **********************************************/
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
      this.network.focus(node[0].id, { animation: { duration: 1500, easingFunction: "easeInQuad" } })
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