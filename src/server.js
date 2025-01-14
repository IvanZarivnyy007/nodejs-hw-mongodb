import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import dotenv from 'dotenv';

import mainRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import authRouter from './routes/auth.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/auth', authRouter);

  app.use(cors());

  app.use(logger());

  app.use(mainRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
