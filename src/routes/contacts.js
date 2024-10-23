import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:id', ctrlWrapper(getContactsByIdController));
contactsRouter.post('/', ctrlWrapper(createContactsController));
contactsRouter.delete('/:id', ctrlWrapper(deleteContactsController));
contactsRouter.patch('/:id', ctrlWrapper(updateContactsController));

export default contactsRouter;
