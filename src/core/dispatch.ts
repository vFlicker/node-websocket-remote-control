import WebSocket from 'ws'

import { parseMessage } from '../utils'
import { drawReducer, mouseReducer, screenReducer } from './reducers'

export const dispatch = (message: WebSocket.RawData, ws: WebSocket) => {
  const action = parseMessage(message)
  drawReducer(action)
  mouseReducer(action, ws)
  screenReducer(action, ws)
}
