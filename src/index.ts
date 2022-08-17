import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';

import { httpServer } from './http-server';
import { parseMessage, write } from './utils';
import * as commands from './commands';
import internal from 'stream';

const PORT = 3000;

const wss = new WebSocketServer({ server: httpServer });

const onMessageHandler = async (
  chunk: WebSocket.RawData,
  duplex: internal.Duplex,
) => {
  const { type, payload } = parseMessage(chunk);
  const command = commands[type];

  if (!command) {
    const answer = `Unknown action: ${type}`;
    write(answer, 'error');
    duplex.write(`${answer}\0`);
    return;
  }

  write(
    `Received: command ${type} ${
      payload.length ? `with payload ${payload}` : ''
    }`,
    'info',
  );

  try {
    const result = await command(payload);
    result ? duplex.write(`${result}\0`) : duplex.write(`${type}\0`);

    write(
      `Command ${type} ${result ? `${result} executed successfully` : ''}`,
      'success',
    );
  } catch (err) {
    const answer = `Command ${type} failed with error`;
    write(answer, 'error');
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

httpServer.listen(PORT, () => {
  write(`Start static http server on the ${PORT} port!`);
});

wss.on('connection', onWebSocketConnectionHandler);
