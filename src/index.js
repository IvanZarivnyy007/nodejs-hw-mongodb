import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const root = async () => {
  await initMongoConnection();

  setupServer();
};

root();
