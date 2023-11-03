<script>
  import { onMount } from 'svelte'
  import { serialLineStore } from '../js/store'
  import { getRandomColor } from '../js/utils'

  import uPlot from 'uplot'

  let chart

  export let numPoints
  const maxLines = 30

  const chartData = Array.from({ length: maxLines + 1 }, () => [])

  let chartContainer

  function addChartData (data) {
    for (let i = 0; i < data.length; i++) {
      chartData[i].push(data[i])

      if (chartData[i].length > numPoints) {
        chartData[i] = chartData[i].slice(-numPoints)
      }
    }
  }

  function parseLine (line) {
    const lineSplit = line.split(',')

    const data = []

    for (const num of lineSplit) {
      if (num === '') {
        break
      }

      const numFloat = parseFloat(num)
      if (isNaN(numFloat)) {
        data.push(null)
        break
      }

      data.push(numFloat)
    }

    return data
  }

  function updateChart () {
    const line = $serialLineStore

    if (line.length === 0 || line === 'undefined') {
      return
    }

    const data = parseLine(line)
    addChartData(data)

    chart.setData(chartData)
  }

  $: $serialLineStore, updateChart()

  function createChart () {
    const seriesOpts = [{}]

    for (let i = 0; i < maxLines; i++) {
      const color = getRandomColor()

      seriesOpts.push(
        {
          stroke: color,
          fill: `${color}1A`
        }
      )
    }

    const opts = {
      pxAlign: false,
      scales: {
        y: {
          auto: true
        }
      },
      axes: [
        {
          show: false,
          width: 1,
          space: 300,
          stroke: '#fff',
          ticks: {
            width: 0.2,
            stroke: '#fff'
          },
          grid: {
            width: 0.2,
            stroke: '#fff'
          }
        },
        {
          stroke: '#fff',
          ticks: {
            width: 0.2,
            stroke: '#fff'
          },
          grid: {
            width: 0.2,
            stroke: '#fff'
          }
        }
      ],
      legend: {
        show: false
      },
      cursor: {
        show: false
      },
      select: {
        show: false
      },
      font: {
        color: '#fff'
      },
      series: seriesOpts
    }

    return new uPlot(opts, chartData, chartContainer)
  }

  function getSize () {
    return {
      width: window.innerWidth - 20,
      height: window.innerHeight - 70
    }
  }

  onMount(() => {
    chart = createChart()

    window.addEventListener('resize', () => {
      chart.setSize(getSize())
    })

    chart.setSize(getSize())
  })
</script>

<div id="chart-container" bind:this={chartContainer}/>

<style>
  @import "../../node_modules/uplot/dist/uPlot.min.css";

  #chart-container {
    position: fixed;
    bottom: 0;
    z-index: -1;
  }
</style>
