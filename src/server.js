import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import dotenv from 'dotenv';

import { notFound } from './middlewares/notFound.js';
import mainRouter from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(logger());

  app.use(mainRouter);

  app.use('*', notFound);

  app.use((error, req, res, next) => {
    res.status(500).json({ message: 'Error', error: error.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
