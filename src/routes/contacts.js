import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';

import { validateBody } from './../utils/validateBody.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));
contactsRouter.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(createContactsController),
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactsController));
contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(updateContactsController),
);

export default contactsRouter;
