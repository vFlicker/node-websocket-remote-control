import { createServer, IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

import { print, PrintFlag } from '../utils';

const STATIC_DIRECTORY = '/front';
const DEFAULT_FILE = '/index.html';

const resolveFilePath = (url: string): string => {
  const __dirname = path.resolve(path.dirname(''));
  const filePath = url === '/' ? DEFAULT_FILE : url;
  return path.join(__dirname, STATIC_DIRECTORY, filePath);
};

const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const filePath = resolveFilePath(req.url || '/');

  try {
    const data = await fs.promises.readFile(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'File not found' }));
  }
};

export const createFrontendServer = (hostname: string, port: number) => {
  const server = createServer(handleRequest);

  server.listen(port, hostname, () => {
    print(
      `Frontend HTTP server running at http://${hostname}:${port}/`,
      PrintFlag.Success,
    );
  });

  return server;
};
