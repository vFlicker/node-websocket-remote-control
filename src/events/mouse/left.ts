import robot from 'robotjs'

import { Payload } from '../../types'

export const left = ([shiftX]: Payload) => {
  const mousePos = robot.getMousePos()
  const mouseShiftPosX = mousePos.x - shiftX
  const mouseShiftPosY = mousePos.y
  robot.moveMouseSmooth(mouseShiftPosX, mouseShiftPosY)
}
