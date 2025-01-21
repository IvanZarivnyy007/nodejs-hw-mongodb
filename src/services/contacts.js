import { ContactCollection } from '../db/models/Contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const contactAllService = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const totalPages = await ContactCollection.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactCollection.countDocuments({ userId });

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

export const contactFindIdService = async (userId, contactId) => {
  const contact = await ContactCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const contactCreateIdService = (data) => {
  return ContactCollection.create(data);
};

export const contactUpdateIdService = async (filters, data) => {
  const result = await ContactCollection.findOneAndUpdate(filters, data, {
    new: true,
  });
  if (!result) return null;
  return result;
};

export const contactDeleteService = (filters) => {
  return ContactCollection.findOneAndDelete(filters);
};
