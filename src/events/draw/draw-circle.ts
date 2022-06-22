import robot from 'robotjs'

import { Payload } from '../../types'

export const drawCircle = ([radius]: Payload) => {
  const mousePos = robot.getMousePos()
  const degree = 0.01

  robot.moveMouse(
    mousePos.x + radius * Math.cos(degree),
    mousePos.y + radius * Math.sin(degree),
  )
  robot.mouseToggle('down')
  for (let i = 0; i <= Math.PI * 2; i += degree) {
    const x = mousePos.x + radius * Math.cos(i)
    const y = mousePos.y + radius * Math.sin(i)
    robot.dragMouse(x, y)
  }
  robot.mouseToggle('up')
}
