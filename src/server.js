import express from 'express';
import cors from 'cors';
import logger from 'pino-http';

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(logger());

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
