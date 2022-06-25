import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws'

import { httpServer } from './http-server'
import { parseMessage, write } from './utils'
import * as commands from './commands'

const PORT = 3000

const wss = new WebSocketServer({ server: httpServer })

const onHttpServerConnectionHandler = () => {
  write(`Start static http server on the ${PORT} port!`)
}

const onWebSocketConnectionHandler = (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  })

  const onMessageHandler = async (chunk: any) => {
    const action = parseMessage(chunk)
    const command = commands[action.type]

    if (!command) {
      const answer = `Unknown action: ${action.type}`
      write(answer, 'error')
      duplex.write(`${answer}\0`)
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
      result ? duplex.write(`${result}\0`) : duplex.write(`${action.type}\0`)

      write(
        `Command ${action.type} ${
          result ? `${result} executed successfully` : ''
        }`,
        'success',
      )
    } catch (err) {
      const answer = `Command ${action.type} failed with error`
      write(answer, 'error')
      duplex.write(`${answer}\0`)
    }
  }

  const onErrorHandler = () => duplex.write('Something went wrong\0')

  const onCloseHandler = () => write('User disconnected')

  const onWebSocketCloseHandler = () => {
    duplex.end()
    write('Websocket server closed')
  }

  write(`Start websocket server on the ${PORT} port!`)

  duplex.on('data', (chunk) => onMessageHandler(chunk))
  duplex.on('error', onErrorHandler)
  duplex.on('close', onCloseHandler)

  wss.on('close', onWebSocketCloseHandler)
}

httpServer.listen(PORT, onHttpServerConnectionHandler)
wss.on('connection', onWebSocketConnectionHandler)
