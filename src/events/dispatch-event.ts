import WebSocket from 'ws'

import { ActionType } from '../types'
import { parseMessage } from '../utils'
import * as mouse from './mouse'
import * as draw from './draw'

export const dispatchEvent = (message: WebSocket.RawData, ws: WebSocket) => {
  const action = parseMessage(message)

  switch (action.type) {
    case ActionType.MousePosition:
      mouse.mousePosition(ws)
      break
    case ActionType.MouseUp:
      mouse.mouseUp(action.payload)
      break
    case ActionType.MouseLeft:
      mouse.mouseLeft(action.payload)
      break
    case ActionType.MouseDown:
      mouse.mouseDown(action.payload)
      break
    case ActionType.MouseRight:
      mouse.mouseRight(action.payload)
      break
    case ActionType.DrawRectangle:
      draw.drawRectangle(action.payload)
      break
    case ActionType.DrawSquare:
      draw.drawSquare(action.payload)
      break
    case ActionType.DrawCircle:
      draw.drawCircle(action.payload)
      break
    case ActionType.PrintScreen:
      ws.send('prnt_scrn')
      break
    default:
      ws.send('Wrong query')
      break
  }
}
