import express from 'express';
import cors from 'cors';
import logger from 'pino-http';

import { notFound } from './middlewares/notFound.js';
import { mainRouter } from './routes/index.js';
import { initMongoConnection } from './db/models/initMongoConnection.js';

const setupServer = async () => {
  const app = express();

  await initMongoConnection();

  app.use(express.json());

  app.use(cors());

  app.use(logger());

  app.use(mainRouter);

  app.use(notFound);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setupServer();
