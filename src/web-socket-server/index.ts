import WebSocket, { Server, WebSocketServer } from 'ws';

import { Counter } from '../utils';
import { onWsServerConnection, onWsServerListening } from './handlers';

export const createWsServer = (port: number): Server<WebSocket> => {
  const wsServer = new WebSocketServer({ port });
  const userCounter = new Counter();

  wsServer.on('connection', onWsServerConnection(userCounter));

  wsServer.on('listening', onWsServerListening(port));

  return wsServer;
};
