import { ContactCollection } from '../db/models/Contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const contactAllService = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const totalPages = await ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments();

  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return {
    data: totalPages,
    page,
    perPage,
    totalPages,
    totalItems,
    ...paginationData,
  };
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
