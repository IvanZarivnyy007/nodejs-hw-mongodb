import setupServer from './index.js';

import initMongoConnection from './db/initMongoConnection.js';

setupServer();

initMongoConnection();
