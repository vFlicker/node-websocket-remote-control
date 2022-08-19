import WebSocket, { Server, WebSocketServer } from 'ws';

import { onWsServerConnection, onWsServerListening } from './handlers';

export const createWsServer = (port: number): Server<WebSocket> => {
  const wsServer = new WebSocketServer({ port });

  wsServer.on('connection', onWsServerConnection);

  wsServer.on('listening', onWsServerListening(port));

  return wsServer;
};
