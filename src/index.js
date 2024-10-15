import setupServer from './index.js';
import initMongoConnection from './db/initMongoConnection.js';

const root = () => {
  setupServer();

  initMongoConnection();
};

export default root;
