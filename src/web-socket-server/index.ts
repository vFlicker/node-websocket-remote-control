import WebSocket, { Server, WebSocketServer } from 'ws';

import { onWsServerConnection, onWsServerListening } from './handlers';

export const createWsServer = (port: number): Server<WebSocket> => {
  const wsServer = new WebSocketServer({ port });
  const userCount = 0;

  wsServer.on('connection', onWsServerConnection(userCount));

  wsServer.on('listening', onWsServerListening(port));

  return wsServer;
};
