import WebSocket from 'ws'

import { mouse } from '../events'
import { Actions, ActionType } from '../types'

export const mouseReducer = (action: Actions, ws: WebSocket) => {
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
    default:
      break
  }
}
