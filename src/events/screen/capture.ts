import { WebSocket } from 'ws'

export const capture = (ws: WebSocket) => {
  ws.send('prnt_scrn')
}
