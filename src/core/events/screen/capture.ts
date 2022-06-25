import robot from 'robotjs'

import { base64Image } from './utils'

const WIDTH = 200
const HEIGHT = 200
const DUPLICATE_LINE = 'data:image/png;base64,'

export const capture = async () => {
  const mouse = robot.getMousePos()
  const x = mouse.x - 100
  const y = mouse.y - 100
  const bitmap = robot.screen.capture(x, y, WIDTH, HEIGHT)

  try {
    const base64 = await base64Image(bitmap.image, WIDTH, HEIGHT)
    return `prnt_scrn ${base64.replace(DUPLICATE_LINE, '')}`
  } catch (err) {
    console.log(err)
  }
}
