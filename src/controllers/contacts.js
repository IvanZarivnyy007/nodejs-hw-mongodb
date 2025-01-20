import HttpError from 'http-errors';

import {
  contactAllService,
  contactFindIdService,
  contactCreateIdService,
  contactUpdateIdService,
  contactDeleteService,
} from '../services/contacts.js';

import { parsePaginationParams } from './../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);

    const userId = req.user._id;

    const result = await contactAllService({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;

  try {
    const data = req.body;
    const result = await contactCreateIdService({ userId, ...data });
    res.status(201).json({
      status: 201,
      message: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const data = req.body;
    const id = req.params.id;
    const result = await contactUpdateIdService({ _id: id, userId }, data);

    if (!result) {
      next(HttpError(404, 'Contact not found'));
    } else {
      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result,
      });
      console.log('Result from contactUpdateIdService:', result);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const id = req.params.id;
    const result = await contactDeleteService({ _id: id, userId });
    if (!result) {
      next(HttpError(404, 'Contact not found'));
      return;
    }
    res.status(204).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const userId = req.user._id;
    const result = await contactFindIdService(userId, contactId);
    console.log(result);

    if (!result) {
      next(HttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: result,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
