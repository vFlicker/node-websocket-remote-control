import { staticServer } from './static-server';
import { createWsServer } from './web-socket-server';
import { write } from './utils';

const PORT = 3000;
const WS_PORT = 8080;

staticServer.listen(PORT, () => {
  write(`Start static http server on the ${PORT} port!`);
});

const wsServer = createWsServer(WS_PORT);

process.on('SIGINT', () => {
  staticServer.close();
  wsServer.close();
  process.exit();
});
