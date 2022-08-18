import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import internal from 'stream';

import { commands } from './commands';
import { parseMessage, write, WriteFlag } from './utils';
import { staticServer } from './static-server';

const PORT = 3000;

const wss = new WebSocketServer({ server: staticServer });

const onMessageHandler = async (
  chunk: WebSocket.RawData,
  duplex: internal.Duplex,
) => {
  const { type, payload } = parseMessage(chunk.toString());
  const command = commands[type];

  if (!command) {
    const answer = `Unknown action: ${type}`;
    write(answer, WriteFlag.Error);
    duplex.write(`${answer}\0`);
    return;
  }

  const messagePayload = payload.length ? `with payload ${payload}` : '';
  write(`Request: command ${type} ${messagePayload}`, WriteFlag.Info);

  try {
    const result = await command(type, ...payload);

    duplex.write(`${result || type}\0`);
    write(`Response: command ${result}`, WriteFlag.Success);
  } catch (err) {
    const answer = `Command ${type} failed with error`;

    write(answer, WriteFlag.Error);
    duplex.write(`${answer}\0`);
  }
};

const onWebSocketConnectionHandler = (ws: WebSocket) => {
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  write(`Start websocket server on the ${PORT} port!`);

  duplex.on('data', (chunk) => onMessageHandler(chunk, duplex));
  duplex.on('error', () => duplex.write('Something went wrong\0'));
  duplex.on('close', () => write('User disconnected'));

  wss.on('close', () => {
    duplex.end();
    write('Websocket server closed');
  });
};

staticServer.listen(PORT, () => {
  write(`Start static http server on the ${PORT} port!`);
});

wss.on('connection', onWebSocketConnectionHandler);
