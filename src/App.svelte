<script>
  import { serialConnect, serialDisconnect, serialStart, serialStop } from './js/serial'
  import { serialLineStore } from './js/store.js'
  
  import Header from './lib/Header.svelte'
  import Chart from './lib/Chart.svelte'

  let baudrateOptions = [300, 600, 1200, 4800, 9600, 31250, 38400, 115200]
  let defaultBaudrate = baudrateOptions[6]
  let baudrate

  let pointsOptions = [10, 20, 50, 100, 500, 1000, 5000, 10000, 50000, 100000]
  let defaultPoints = pointsOptions[2]
  let numPoints

  let connected = false
  let started = false

  async function connect () {
    await serialConnect(baudrate)
    connected = true
  }

  function disconnect () {
    serialDisconnect()
    connected = false
    started = false
    $serialLineStore = ''
  }

  function onStart () {
    !started ? serialStart() : serialStop()
    started = !started
  }

  function onConnect () {
    !connected ? connect() : disconnect()
  }
</script>

<Header
  bind:connected
  bind:started

  bind:baudrate
  baudrateOptions={baudrateOptions}
  bind:defaultBaudrate
  bind:numPoints
  pointsOptions={pointsOptions}
  bind:defaultPoints

  on:start={onStart}
  on:connect={onConnect}
/>

<main>
  {#if !connected}
    <img src="logo.svg" id="logo" alt="logo">
  {/if}

  {#if connected}
    <Chart bind:numPoints/>
  {/if}
</main>

<style>
  #logo {
    position: fixed;
    width: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
</style>
