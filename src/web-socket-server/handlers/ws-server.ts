import WebSocket, { createWebSocketStream } from 'ws';

import { write, WriteFlag } from '../../utils/index';
import { onDuplexData, onDuplexError } from './duplex';

export const onWsServerConnection = (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  write('New connection', WriteFlag.Info);

  duplex.on('data', onDuplexData(duplex));

  duplex.on('error', onDuplexError(duplex));

  ws.on('close', () => {
    write('Websocket server closed', WriteFlag.Info);
    duplex.destroy();
  });
};

export const onWsServerListening = (port: number) => () => {
  write(`Websocket server listening on the ${port} port!`);
};
