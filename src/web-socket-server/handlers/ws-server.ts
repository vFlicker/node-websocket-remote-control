import WebSocket, { createWebSocketStream } from 'ws';

import { Counter, write, WriteFlag } from '../../utils';
import { onDuplexData, onDuplexError } from './duplex';

export const onWsServerConnection =
  (userCounter: Counter) => (ws: WebSocket) => {
    const duplex = createWebSocketStream(ws, {
      encoding: 'utf8',
      decodeStrings: false,
    });

    write(`New connection. User count: ${userCounter.inc()}`, WriteFlag.Info);

    duplex.on('data', onDuplexData(duplex));

    duplex.on('error', onDuplexError(duplex));

    ws.on('close', () => {
      write(
        `Websocket server closed. User count: ${userCounter.dec()}`,
        WriteFlag.Info,
      );
      duplex.destroy();
    });
  };

export const onWsServerListening = (port: number) => () => {
  write(`Websocket server listening on the ${port} port!`);
};
