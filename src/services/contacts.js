import { ContactCollection } from '../db/models/Contacts.js';

export const contactAllService = () => {
  return ContactCollection.find();
};

export const contactFindIdService = (contactId) => {
  return ContactCollection.findById(contactId);
};

export const contactCreateIdService = (data) => {
  return ContactCollection.create(data);
};

export const contactUpdateIdService = (id, data) => {
  return ContactCollection.findByIdAndUpdate(id, data);
};

export const contactDeleteService = (id) => {
  return ContactCollection.findByIdAndDelete(id);
};
