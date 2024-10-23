import HttpError from 'http-errors';

import {
  contactAllService,
  contactFindIdService,
  contactCreateIdService,
  contactUpdateIdService,
  contactDeleteService,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const result = await contactAllService();
    res.status(200).json({
      status: 'Successfully found contacts!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactsController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await contactCreateIdService(data);
    res.status(201).json({
      status: 'Successfully created a contact!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateContactsController = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const result = await contactUpdateIdService(data, id);
    if (!result) {
      next(HttpError(404), 'Contact not found');
    }
    res.status(200).json({
      status: 'Successfully patched a contact',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactsController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await contactDeleteService(id);
    if (!result) {
      next(HttpError(404), 'Contact not found');
    }
    res.status(204).json({
      status: 'Successfully patched a contact',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const result = await contactFindIdService(contactId);
    if (!result) {
      return res.status(404).json({
        message: `Contact with id ${contactId} not found`,
      });
    }
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
