import WebSocket, { WebSocketServer } from 'ws'

import { httpServer } from './http-server'
import { parseMessage } from './utils'
import * as events from './core/events'

const PORT = 3000

const wss = new WebSocketServer({ server: httpServer })

const onHttpServerConnectionHandler = () => {
  console.log(`Start static http server on the ${PORT} port!`)
}

const onMessageHandler = async (data: WebSocket.RawData, ws: WebSocket) => {
  const action = parseMessage(data)
  const event = events[action.type]

  if (!event) {
    const answer = `Unknown action: ${action.type}`
    console.log(answer)
    ws.send(answer)
    return
  }

  console.log(
    `Received: command ${action.type} ${
      action.payload.length ? `with payload ${action.payload}` : ''
    }`,
  )

  const result = await event(action.payload)
  result ? ws.send(result) : ws.send(action.type)

  console.log(
    `Command ${action.type} ${result ? `${result} executed successfully` : ''}`,
  )
}

const onWebSocketConnectionHandler = (ws: WebSocket) => {
  console.log(`Start websocket server on the ${PORT} port!`)

  ws.on('message', (data) => onMessageHandler(data, ws))
  ws.on('error', () => ws.send('Something went wrong'))
  ws.on('close', () => console.log('User disconnected'))
}

const onWebSocketCloseHandler = () => {
  console.log('Websocket server closed')
}

httpServer.listen(PORT, onHttpServerConnectionHandler)
wss.on('connection', onWebSocketConnectionHandler)
wss.on('close', onWebSocketCloseHandler)
