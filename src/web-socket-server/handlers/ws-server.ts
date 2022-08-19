import WebSocket, { createWebSocketStream } from 'ws';

import { write, WriteFlag } from '../../utils/index';
import { onDuplexData, onDuplexError } from './duplex';

export const onWsServerConnection = (count: number) => (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  count++;
  write(`New connection, user count: ${count}`, WriteFlag.Info);

  duplex.on('data', onDuplexData(duplex));

  duplex.on('error', onDuplexError(duplex));

  ws.on('close', () => {
    count--;
    write(`Websocket server closed, user count: ${count}`, WriteFlag.Info);
    duplex.destroy();
  });
};

export const onWsServerListening = (port: number) => () => {
  write(`Websocket server listening on the ${port} port!`);
};
