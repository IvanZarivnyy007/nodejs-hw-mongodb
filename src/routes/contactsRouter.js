import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactsController);
contactsRouter.get('/:id', getContactsByIdController);

export default contactsRouter;
