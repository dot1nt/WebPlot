import { serialLineStore } from './store.js'

let port
let reader
const decoder = new TextDecoder()

let dataIdx = 0
let run = false

export async function serialConnect (baudrate) {
  port = await navigator.serial.requestPort()
  await port.open({ baudRate: baudrate })
  reader = port.readable.getReader()
  run = true
}

export function serialDisconnect () {
  serialStop()
  reader.cancel()
  reader.releaseLock()
  port.close()
}

export function serialStop () {
  run = false
}

export async function serialStart () {
  let line = ''
  run = true

  while (run) {

    const { value, done } = await reader.read()

    if (done) {
      serialDisconnect()
      break
    }

    const data = decoder.decode(value)

    for (const char of data) {
      if (char === '\n') {
        line = line.replace(/[\r\n]+/gm, '')
        const serialLine = `${dataIdx}, ${line}` // Add an index to the line so it updates the reactive statements even if the data is the same.
                                                 // Also used for the chart x axis data

        serialLineStore.set(serialLine)
        line = ''

        dataIdx++
      } else {
        line += char
      }
    }
  }
}
