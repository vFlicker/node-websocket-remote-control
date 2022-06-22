import robot from 'robotjs'

import { Payload } from '../../types'
import * as mouse from '../mouse/index'

export const rectangle = ([width, height]: Payload) => {
  robot.mouseToggle('down')
  mouse.right([width])
  mouse.down([height])
  mouse.left([width])
  mouse.up([height])
  robot.mouseToggle('up')
}
