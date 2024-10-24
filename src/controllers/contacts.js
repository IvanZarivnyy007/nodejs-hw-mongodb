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
    console.log(id);
    const result = await contactUpdateIdService(id, data);
    console.log(result);
    if (!result) {
      next(HttpError(404, 'Contact not found'));
    } else {
      res.status(200).json({
        status: 'Successfully patched a contact',
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContactsController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await contactDeleteService(id);
    if (!result) {
      next(HttpError(404, 'Contact not found'));
      return;
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
    console.log(result);

    if (!result) {
      next(HttpError(404, 'Contact not found'));
      return;
    }
    res.status(200).json({
      message: `Successfully found contact with id ${contactId}!`,
      data: result,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
