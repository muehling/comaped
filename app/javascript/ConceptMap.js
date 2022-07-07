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

  


  constructor({ edgeData, nodeData, conceptsPath, linksPath, dialogTexts }) {

    this.edges = new vis.DataSet(edgeData)
    this.nodes = new vis.DataSet(nodeData)
    this.conceptsPath = conceptsPath
    this.linksPath = linksPath
    this.dialogTexts = dialogTexts

    this.data = {
      nodes: this.nodes,
      edges: this.edges
    }

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
        smooth: {type: 'continuous' }
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
        addEdge:  function(data,callback) {
          // this.id = data.to
          // $('#start').val(data.from)
          // $('#end').val(data.to)
          // mode = ConceptMap.addEdge
          // const canvasX = nodes.get(this.id).x
          // const canvasY = nodes.get(this.id).y
          const connected_edges = [network.getConnectedEdges(data.from)]
          ///Checks for double edge in same direction
          for (let i = 0, len = connected_edges[0].length; i < len; i++){
            // console.log ( nodes.get(edges.get(connected_edges[0][i]).from).label + " --> " 
            //             + nodes.get(edges.get(connected_edges[0][i]).to).label)
            if (nodes.get(edges.get(connected_edges[0][i]).to).id == data.to ) return console.log("double edge")
          }
          
          createEdge(data)
          //showForm(canvasX,canvasY)
        },
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
    },
    }

    this.network = new vis.Network(this.container, this.data, this.options)

    $('#context-help-text').html($('#ch_normal').html())

    // close dialog on escape
    $("#entry_concept").on('keyup', function (e) {
      if (e.keyCode == 27)
        hideForm()
    })

  
    $('#cursor-button').click(function(){
      console.log("cursor-event triggered")
      buttonMode = ConceptMap.cursorButton
      activeButton(1)
    })

    $('#node-button').click(function(){
        console.log("node-event triggered")
        buttonMode = ConceptMap.nodeButton
        activeButton(2)
    })

    $('#edge-button').click(function(){
        console.log("edge-event triggered")
        buttonMode = ConceptMap.edgeButton
        network.addEdgeMode()
        activeButton(3)
    })

    $('#misc-button').click(function(){
      console.log("misc-event triggered");
    })


    

    this.network.on("hoverNode", () => {
      if (mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_hovernode').html())
      }
      this.network.canvas.body.container.style.cursor = 'pointer'
    })
    this.network.on("hoverEdge", () => {
      if (mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_hoveredge').html())
      }
      this.network.canvas.body.container.style.cursor = 'pointer'
    })

    this.network.on("blurNode", () => {
      if (mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_normal').html())
      }
      this.network.canvas.body.container.style.cursor = 'default'
    })
    this.network.on("blurEdge", () => {
      if (mode == ConceptMap.none) {
        $('#context-help-text').html($('#ch_normal').html())
      }
      this.network.canvas.body.container.style.cursor = 'default'
    })


    /*********************************
     * Network drag: save new node position
     ********************************/
    this.network.on("dragStart", (params) => {
      console.log("DRAG")
      if (params.nodes.length == 0) {
        mode = ConceptMap.none
        return
      }
      if (params.nodes.length > 0) {
        this.ids[0] = params.nodes[0]
        mode = ConceptMap.dragNode
      }
      $("#panel").addClass("hidden");
      $("#panel").focusout();
    })

    this.network.on("dragEnd", (params) => {
      console.log("DRAGEND")
      switch (mode) {
        case ConceptMap.dragNode:
          const oldX = nodes.get(this.ids[this.ids.length-1]).x
          const oldY = nodes.get(this.ids[this.ids.length-1]).y
          $.ajax({
            type: "PUT",
            url: this.conceptsPath + "/" + this.ids[this.ids.length-1],
            headers: {
              'Accept': 'text/javascript',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: {"concept": {'x': params.pointer.canvas.x, 'y':  params.pointer.canvas.y}}
          }).always(() => {
            mode = ConceptMap.none
          })
          for (let i = this.ids.length-2; i > -1 ; i--){
            const diffX = oldX - nodes.get(this.ids[i]).x 
            const diffY = oldY - nodes.get(this.ids[i]).y 
            
            jQuery.ajax({
              type: "PUT",
              url: this.conceptsPath + "/" + this.ids[i],
              headers: {
                'Accept': 'text/javascript',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
              },
              data: {"concept": {'x': params.pointer.canvas.x - diffX, 'y':  params.pointer.canvas.y - diffY}}
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
      const canvasX = params.pointer.canvas.x;
      const canvasY = params.pointer.canvas.y;
      mode = ConceptMap.addNode;
      this.showForm(canvasX,canvasY);
    })


    this.network.on("click", params => {
      if (params.nodes.length == 0 && params.edges.length == 0) {   ///STAGE CLICKED///
          console.log("stage clicked")
          switch (buttonMode) {
              case ConceptMap.cursorButton:                                            ///CURSOR BUTTON ACTIVE
                  console.log("CursorButton active - do nothing")
                  break;
              case ConceptMap.nodeButton:                                              ///NODE BUTTON ACTIVE
                  console.log("node add")
                  this.createNode(params)
                  break;
              case ConceptMap.edgeButton:                                              ///EDGE BUTTON ACTIVE
                  console.log("EdgeButton active - do nothing")
                  break;
          }
      }
    })


    /*********************************
     * Network click: create an edge if a node was previously held, or cancel edge creation
     ********************************/
    this.network.on("select", params => {
      console.log("buttonMode after Click: " +buttonMode)
      console.log("click Event:", params)

        if (params.nodes.length > 1){                                       ///MULTI-NODES CLICKED///
          console.log("MULTI -EDIT")
          switch (buttonMode) {
            case ConceptMap.cursorButton:                                                ///CURSOR BUTTON ACTIVE
                mode = ConceptMap.editMultiNode
                this.id = params.nodes[0];
                for (let i = 0; i< params.nodes.length; i++){
                  this.ids[i] = params.nodes[i]
                }
                console.log("IDS: " + this.ids)
                this.showForm(this.nodes.get(this.id).x, this.nodes.get(this.id).y )
                break;
            case ConceptMap.nodeButton:                                                  ///NODE BUTTON ACTIVE
                console.log("NodeButton active - do nothing")
                break;
            case ConceptMap.edgeButton:                                                  ///EDGE BUTTON ACTIVE
                console.log("EdgeButton active - do nothing")
                break;
            }
            return;
        }
        else if (params.nodes.length == 1) {                                ///NODE CLICKED///
            //console.log("node clicked")
            switch (buttonMode) {
            case ConceptMap.cursorButton:                                              ///CURSOR BUTTON ACTIVE
                console.log("node edit")
                this.editNode(params)
                break;
            case ConceptMap.nodeButton:                                                  ///NODE BUTTON ACTIVE
                console.log("NodeButton active - do nothing")
                break;
            case ConceptMap.edgeButton:                                                  ///EDGE BUTTON ACTIVE
                console.log("NodeButton active - do nothing")
                break;
            }
            return;
        }
        else if (params.edges.length == 1) {                                ///EDGE CLICKED///
            console.log("edge clicked")
            switch (buttonMode) {
                case ConceptMap.cursorButton:                                            ///CURSOR BUTTON ACTIVE
                    console.log("edge edit")
                    this.editEdge(params)
                    break;                                                  
                case ConceptMap.nodeButton:                                              ///NODE BUTTON ACTIVE
                    console.log("nodeButton active - do nothing")
                    break;
                case ConceptMap.edgeButton:                                              ///EDGE BUTTON ACTIVE
                    console.log("EdgeButton active - do nothing")   
            }
        }  
    })

  }
  
  activeButton = (button) => {
    $('#cursor-button').css("border","1px solid #ccc;")
    $('#node-button').css("border","1px solid #ccc;")
    $('#edge-button').css("border","1px solid #ccc;")
    console.log("button: " +button)
    switch (button) {
      case 1: {
        $('#cursor-button').css("border","2px solid rgb(104, 104, 104);")
        console.log("1")
        break
      }
      case 2: {
        $('#node-button').css("border","2px solid rgb(104, 104, 104);")
        console.log("2")
        break
      }
      case 3: {
        $('#edge-button').css("border","2px solid rgb(104, 104, 104);")
        console.log("3")
      }
    }

  }

  /*********************************
  * create node
  ********************************/
  createNode = (params) => {
    const canvasX = params.pointer.canvas.x
    const canvasY = params.pointer.canvas.y
    mode = ConceptMap.addNode
    this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit node
  ********************************/
  editNode = (params) => {
    this.id = params.nodes[0];
    const canvasX = nodes.get(this.id).x;
    const canvasY = nodes.get(this.id).y;
    mode = ConceptMap.editNode;
    this.showForm(canvasX, canvasY);
  }
  

  /*********************************
  * create edge
  ********************************/
  createEdge = (params) => {
      $('#start').val(params.from)
      $('#end').val(params.to)
      $('#context-help-text').html($('#ch_addedge').html()).removeClass("hidden")
      const startNode = this.nodes.get(params.from)
      const endNode = this.nodes.get(params.to)
      const canvasX = Math.min(startNode.x, endNode.x) + Math.abs(startNode.x - endNode.x) / 2
      const canvasY = Math.min(startNode.y, endNode.y) + Math.abs(startNode.y - endNode.y) / 2
      mode = ConceptMap.addEdge
      this.showForm(canvasX, canvasY)
  }

  /*********************************
  * edit edge
  ********************************/
  editEdge = (params) => {
      this.id = params.edges[0]
      const canvasX = params.pointer.canvas.x
      const canvasY = params.pointer.canvas.y
      mode = ConceptMap.editEdge
      this.showForm(canvasX, canvasY)
  }

  /*********************************
  * delete nodes or edges
  ********************************/
  destroy = () => {
    switch (mode) {
      case ConceptMap.editNode:
        $.ajax({
          headers: {
            'Accept': 'text/javascript',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          type: "DELETE", url: this.conceptsPath + "/" + this.id
        }).always(() => {
          mode = ConceptMap.none
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
          mode = ConceptMap.none
          this.id = undefined
        })
        break
      case ConceptMap.editMultiNode:
        for (let i = 0; i< this.ids.length; i++){
          $.ajax({
            headers: {
              'Accept': 'text/javascript',
              'X-Requested-With': 'XMLHttpRequest',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            type: "DELETE", url: this.conceptsPath + "/" + this.ids[i]
          }).always(() => {
            mode = ConceptMap.none
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
    if (mode == ConceptMap.addNode || mode == ConceptMap.editNode) {
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
        $('#searchGroup').removeClass('has-error');
        $('#searchGroup').removeClass('has-success');
        return;
    }
    let node = nodes.get({
        filter: function (item) {
            return (item.label.toLocaleLowerCase() === concept.toLocaleLowerCase());
        }
    });
    if (node != null && node.length > 0) {
        network.focus(node[0].id, {animation:{duration: 800}});
        $('#searchGroup').removeClass('has-error');
        $('#searchGroup').addClass('has-success');
    }
    else {
        $('#searchGroup').removeClass('has-success');
        $('#searchGroup').addClass('has-error');
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
    console.log("-----------onSubmit----------" + mode)
    const postObj = {}
    let method = "put"
    let path

    switch (mode) {

      case ConceptMap.addNode:
        method = "post"
      case ConceptMap.editNode:
        postObj["concept[x]"] = $("#x").val()
        postObj["concept[y]"] = $("#y").val()
        postObj["concept[label]"] = $("#entry_concept").val()
        postObj["concept[color]"] = $("#color").val()
        postObj["concept[shape]"] = $("#shape").val()
        path = this.conceptsPath
        break
      case ConceptMap.addEdge:
        method = "post"
        postObj["link[start]"] = $("#start").val()
        postObj["link[end]"] = $("#end").val()
        postObj["link[arrows]"] = $("#edge").val()
      case ConceptMap.editEdge:
        postObj["link[label]"] = $("#entry_link").val()
        postObj["link[arrows]"] = $("#edge").val()
        path = this.linksPath
        break
      case ConceptMap.editMultiNode:
        for (let i = 0; i< this.ids.length; i++){
          console.log(this.ids[i])
          //this.id = this.ids[i]
          postObj["concept[shape]"] = $("#shape").val()
          postObj["concept[color]"] = $("#color").val()
          $.ajax({
              headers: {
                'Accept': 'text/javascript',
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

  /*********************************
  * shape picker stuff
  ********************************/
  changeShape(i) {
    var shape = $('#shape'+i).attr("value");
    $("#shape").attr("value", shape);
    for (var j = 1; j <= 6; ++j)
      $('#shape'+j).html("<span></span>");
    $('#shape'+i).html("<span class='glyphicon glyphicon-ok'></span>");
    $("#entry_concept").focus();
    return false;
  }

  selectShape(shape) {
    for (var i = 1; i <= 6; ++i)
        if ($('#shape'+i).attr("value") == shape)
            changeShape(i);
  }

  /*********************************
  * edge picker stuff
  ********************************/
  changeEdgeShape() {
    $('.arrow-direction').removeClass("from-arrow to-arrow")

    if ($('#edge').attr("value") == "to") { 
      $("#edge").attr("value", "from");
      $('.arrow-direction').addClass("from-arrow")
    }
    else {
      $("#edge").attr("value", "to");
      $('.arrow-direction').addClass("to-arrow")
    }
    $("#entry_link").focus();
    return false;
  }

  selectEdgeShape(shape) {
        $('.arrow-direction').removeClass("from-arrow to-arrow")
        if (shape == "from") {
          console.log("success")
          $("#edge").attr("value", "from");
          $('.arrow-direction').addClass("from-arrow")
        }
        if (shape == "to") {
          $("#edge").attr("value", "to");
          $('.arrow-direction').addClass("to-arrow")
        }
  }

 /*****************************************/
 
  initNodeInputs = (canvasX, canvasY) => {
    $("#entry_concept").removeClass("hidden")
    $("#colorpicker").removeClass("hidden")
    $("#shapepicker").removeClass("hidden")
    $("#edgepicker").addClass("hidden")
    $("#entry_link").addClass("hidden")
    mode === ConceptMap.addNode && $("#delete").addClass("hidden")
    mode === ConceptMap.editNode && $("#delete").removeClass("hidden")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_concept")
  }

  initEdgeInputs = (canvasX, canvasY) => {
    $("#entry_link").removeClass("hidden")
    $("#entry_concept").addClass("hidden")
    $("#colorpicker").addClass("hidden")
    $("#shapepicker").addClass("hidden")
    $("#edgepicker").removeClass("hidden")
    mode === ConceptMap.addEdge && $("#delete").addClass("hidden")
    mode === ConceptMap.editEdge && $("#delete").removeClass("hidden")
    $("#x").attr("value", canvasX)
    $("#y").attr("value", canvasY)
    this.focus("#entry_link")
  }

  initMultiNodeInputs = () => {
    $("#entry_concept").addClass("hidden")
    $("#colorpicker").removeClass("hidden")
    $("#shapepicker").removeClass("hidden")
    $("#edgepicker").addClass("hidden")
    $("#entry_link").addClass("hidden")
    $("#delete").removeClass("hidden")
    mode === ConceptMap.addNode && $("#delete").addClass("hidden")
    mode === ConceptMap.editNode && $("#delete").removeClass("hidden")
  }


  showForm = (canvasX, canvasY) => {
    // attach close handler for clicks elsewhere
    // this.network.on("click", (params) => {
    //   if (!params.nodes.length && !params.edges.length) {
    //     this.hideForm()
    //   }
    // })
    console.log("showForm mode: " + mode)

    $("#panel")
      .removeClass("hidden")
      .attr("style", "z-index: 1; position:absolute;left:" + ($("#map-canvas").offset().left + this.network.canvasToDOM({ x: canvasX, y: canvasY }).x - $("#form").width() / 2) + "px;top:" + ($("#map-canvas").offset().top + this.network.canvasToDOM({ x: canvasX, y: canvasY }).y - $("#form").height() / 2) + "px;")
    switch (mode) {
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
    $("#panel").addClass("hidden")
    $("#panel").focusout()
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

    mode = ConceptMap.none
    buttonMode = ConceptMap.cursorButton
  }
}


export default ConceptMap