import { Router } from 'express';
import contactsRouter from '../routes/contacts.js';

const mainRouter = Router();

mainRouter.use('/contacts', contactsRouter);

export default mainRouter;
