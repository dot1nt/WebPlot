function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomColor () {
  const r = Math.floor(getRandomInt(100, 256))
  const g = Math.floor(getRandomInt(100, 256))
  const b = Math.floor(getRandomInt(100, 256))

  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  const hex = `#${hexR}${hexG}${hexB}`

  return hex
}
