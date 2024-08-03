import { createFrontendServer } from './frontend/frontend-server';
import { createBackendServer } from './backend/backend-server';

const HOSTNAME = '127.0.0.1';
const FRONTEND_PORT = 3000;
const BACKEND_PORT = 8080;

const frontendServer = createFrontendServer(HOSTNAME, FRONTEND_PORT);
const backendServer = createBackendServer(HOSTNAME, BACKEND_PORT);

process.on('SIGINT', () => {
  frontendServer.close();
  backendServer.close();
  process.exit();
});
