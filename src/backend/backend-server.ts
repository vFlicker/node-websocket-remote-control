import WebSocket, { WebSocketServer } from 'ws';

import { PrintFlag, print } from '../utils';
import { commands } from './commands/commands';
import { handleMessage } from './messageHandler';

export const createBackendServer = (
  hostname: string,
  port: number,
): WebSocketServer => {
  const wss = new WebSocketServer({ host: hostname, port });

  wss.on('connection', (socket: WebSocket): void => {
    socket.on('message', async (message: WebSocket.MessageEvent) => {
      print(`Request: ${message.toString()}`, PrintFlag.Info);

      try {
        const response = await handleMessage(message.toString(), commands);
        socket.send(response);
        print(`Response: ${response}`, PrintFlag.Success);
      } catch (err: any) {
        socket.send(err.message);
        print(`Response: ${err.message}`, PrintFlag.Error);
      }
    });

    socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });

    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });

  print(
    `Backend WebSocket server running at ws://${hostname}:${port}`,
    PrintFlag.Success,
  );

  return wss;
};
