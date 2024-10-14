import { Router } from 'express';
import contactsRouter from '../routes/contactsRouter.js';

const mainRouter = Router();

mainRouter.use('/contacts', contactsRouter);

export default mainRouter;
