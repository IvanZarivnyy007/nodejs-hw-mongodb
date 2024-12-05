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

export const contactUpdateIdService = async (id, data) => {
  const result = await ContactCollection.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!result) return null;
  return result;
};

export const contactDeleteService = (id) => {
  return ContactCollection.findByIdAndDelete(id);
};
