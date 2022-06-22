// import Jimp from 'jimp';
import WebSocket, { WebSocketServer } from 'ws'

import { dispatchEvent } from './events'
import { httpServer } from './http-server'

const PORT = 3000

const wss = new WebSocketServer({ server: httpServer })

const onHttpServerConnection = () => {
  console.log(`Start static http server on the ${PORT} port!`)
}

const onWebSocketConnection = (ws: WebSocket) => {
  console.log(`Start websocket server on the ${PORT} port!`)

  ws.on('message', (data) => dispatchEvent(data, ws))
  ws.on('error', () => ws.send('Something went wrong'))
  ws.on('close', () => console.log('User disconnected'))
}

const onWebSocketClose = () => {
  console.log('Websocket server closed')
}

httpServer.listen(PORT, onHttpServerConnection)
wss.on('connection', onWebSocketConnection)
wss.on('close', onWebSocketClose)
