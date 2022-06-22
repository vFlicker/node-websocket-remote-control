import robot from 'robotjs'

import { Payload } from '../../types'
import * as mouse from '../mouse'

export const drawRectangle = ([width, height]: Payload) => {
  robot.mouseToggle('down')
  mouse.mouseRight([width])
  mouse.mouseDown([height])
  mouse.mouseLeft([width])
  mouse.mouseUp([height])
  robot.mouseToggle('up')
}
