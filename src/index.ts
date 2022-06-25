import WebSocket, { WebSocketServer } from 'ws'

import { httpServer } from './http-server'
import { parseMessage, write } from './utils'
import * as commands from './commands'

const PORT = 3000

const wss = new WebSocketServer({ server: httpServer })

const onHttpServerConnectionHandler = () => {
  write(`Start static http server on the ${PORT} port!`)
}

const onMessageHandler = async (data: WebSocket.RawData, ws: WebSocket) => {
  const action = parseMessage(data)
  const command = commands[action.type]

  if (!command) {
    const answer = `Unknown action: ${action.type}`
    write(answer, 'error')
    ws.send(answer)
    return
  }

  write(
    `Received: command ${action.type} ${
      action.payload.length ? `with payload ${action.payload}` : ''
    }`,
    'info',
  )

  try {
    const result = await command(action.payload)
    result ? ws.send(result) : ws.send(action.type)

    write(
      `Command ${action.type} ${
        result ? `${result} executed successfully` : ''
      }`,
      'success',
    )
  } catch (err) {
    const answer = `Command ${action.type} failed with error`
    write(answer, 'error')
    ws.send(answer)
  }
}

const onWebSocketConnectionHandler = (ws: WebSocket) => {
  write(`Start websocket server on the ${PORT} port!`)

  ws.on('message', (data) => onMessageHandler(data, ws))
  ws.on('error', () => ws.send('Something went wrong'))
  ws.on('close', () => write('User disconnected'))
}

const onWebSocketCloseHandler = () => {
  write('Websocket server closed')
}

httpServer.listen(PORT, onHttpServerConnectionHandler)
wss.on('connection', onWebSocketConnectionHandler)
wss.on('close', onWebSocketCloseHandler)
