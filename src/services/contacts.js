import { ContactCollection } from '../db/models/Contacts.js';

export const contactAllService = () => {
  return ContactCollection.find();
};

export const contactFindIdService = (contactId) => {
  return ContactCollection.findById(contactId);
};
