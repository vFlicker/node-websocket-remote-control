import WebSocket from 'ws'

import { ActionType } from '../types'
import { parseMessage } from '../utils'
import * as mouse from './mouse'
import * as draw from './draw'
import * as screen from './screen'

export const dispatchEvent = (message: WebSocket.RawData, ws: WebSocket) => {
  const action = parseMessage(message)

  switch (action.type) {
    case ActionType.MousePosition:
      mouse.position(ws)
      break
    case ActionType.MouseUp:
      mouse.up(action.payload)
      break
    case ActionType.MouseLeft:
      mouse.left(action.payload)
      break
    case ActionType.MouseDown:
      mouse.down(action.payload)
      break
    case ActionType.MouseRight:
      mouse.right(action.payload)
      break
    case ActionType.DrawRectangle:
      draw.rectangle(action.payload)
      break
    case ActionType.DrawSquare:
      draw.square(action.payload)
      break
    case ActionType.DrawCircle:
      draw.circle(action.payload)
      break
    case ActionType.PrintScreen:
      screen.capture(ws)
      break
    default:
      ws.send('Wrong query')
      break
  }
}
