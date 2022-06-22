import WebSocket from 'ws'

import { screen } from '../events'
import { Actions, ActionType } from '../types'

export const screenReducer = (action: Actions, ws: WebSocket) => {
  switch (action.type) {
    case ActionType.PrintScreen:
      screen.capture(ws)
      break
    default:
      break
  }
}
