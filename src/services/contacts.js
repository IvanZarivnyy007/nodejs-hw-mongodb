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
    includeResultMetadata: true,
  });
  if (!result || !result.value) return null;
  return {
    contact: result.value,
  };
};

export const contactDeleteService = (id) => {
  return ContactCollection.findByIdAndDelete(id);
};
