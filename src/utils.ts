import WebSocket from 'ws'

import { ActionType, Actions } from './core/types'

export const parseMessage = (message: WebSocket.RawData): Actions => {
  const [command, ...coords] = message.toString().split(' ')
  return {
    type: command as ActionType,
    payload: coords.map(Number),
  }
}
