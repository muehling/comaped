import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { Graph2d } from 'vis-timeline/standalone'

class BackendViewer {
  constructor() {
    this.playing = false
    this.timerID = -1
    this.timerId
    this.version = 0
    this.maxVersion = 0

    this.data = {
      nodes: new DataSet([]),
      edges: new DataSet([]),
    }
  }

  next = () => {
    this.updatePreview(this.version + 1)
  }

  previous = () => {
    this.updatePreview(this.version - 1)
  }

  updatePreview = async desiredVersion => {
    this.version = desiredVersion
    const url = this.fetchUrl + '/' + desiredVersion + '/'
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    // concept map was not found, or user has no privileges to see it -> redirect to login page
    if (res.status === 401) {
      location.replace('/backend')
    }
    // no versions found. This can happen if a concept map was imported without versions
    if (res.status === 404) {
      //TODO display message to user?
      return
    }
    const body = await res.json()

    this.data.nodes.clear()
    this.data.edges.clear()
    this.data.nodes.update(body.nodes)
    this.data.edges.update(
      body.edges.map(node => ({ id: node.id, from: node.start_id, to: node.end_id, ...node }))
    )

    this.network.redraw()

    this.network.once('afterDrawing', () => {
      this.network.fit()
    })

    $('#cur_ver').html(this.version + 1)
    if (this.version === 0) {
      $('#prev').attr('disabled', 'disabled')
    } else {
      $('#prev').removeAttr('disabled')
    }
    if (this.version === this.maxVersion) {
      $('#next').attr('disabled', 'disabled')
    } else {
      $('#next').removeAttr('disabled')
    }

    this.timeline.setCustomTime(body.timestamp, window.timeBar)
    this.timeline.moveTo(body.timestamp)
  }

  play = () => {
    this.playing = !this.playing

    if (this.playing) {
      $('#play').html("<span class='bi-pause'></span>")
      this.timerId = window.setInterval(() => {
        if (this.version === this.maxVersion) {
          this.play()
        } else {
          this.next()
        }
      }, 1500)
    } else {
      $('#play').html("<span class='bi-play'></span>")
      window.clearInterval(this.timerId)
    }
  }

  timeChanged = properties => {
    // find version next left from dropped cursor
    const versionNextToCursor = this.items.reduce(
      (acc, _item, index) =>
        Date.parse(this.items[index]['x']) <= Date.parse(properties.time) ? index : acc,
      0
    )

    this.version = Math.max(0, versionNextToCursor)
    this.updatePreview(versionNextToCursor)
  }

  setMapData = ({ edgeData, nodeData, id }) => {
    this.edgeData = edgeData
    this.nodeData = nodeData
    this.id = id

    const mapOptions = {
      autoResize: true,
      height: '100%',
      width: '100%',
      edges: {
        smooth: { type: 'continuous' },
      },
      physics: {
        enabled: false,
      },
      interaction: {
        hover: false,
        dragNodes: false,
        navigationButtons: false,
        selectConnectedEdges: false,
        hoverConnectedEdges: false,
      },
    }

    const mapContainer = document.getElementById('canvas_' + this.id)

    this.data = {
      nodes: new DataSet(this.nodeData),
      edges: new DataSet(this.edgeData),
    }

    this.network = new Network(mapContainer, this.data, mapOptions)
    this.network.once('afterDrawing', () => {
      this.network.fit()
    })
    this.network.redraw()
  }

  setTimelineData = ({ id, fetchUrl, items, firstTimestamp, lastTimestamp, maxVersion }) => {
    this.fetchUrl = fetchUrl
    this.items = items
    this.firstTimestamp = firstTimestamp
    this.lastTimestamp = lastTimestamp
    this.id = id
    this.maxVersion = maxVersion

    const timelineContainer = document.getElementById('timeline_' + id)

    const timelineData = new DataSet(items)
    const timelineOptions = {
      start: firstTimestamp,
      end: lastTimestamp,
      height: '100%',
      width: '100%',
    }

    this.timeline = new Graph2d(timelineContainer, timelineData, timelineOptions)
    this.timeline.on('timechanged', this.timeChanged)

    this.timeline.addCustomTime(lastTimestamp)
  }
}

export default BackendViewer
