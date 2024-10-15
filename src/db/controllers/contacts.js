import {
  contactAllService,
  contactFindIdService,
} from '../../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await contactAllService();
    res.status(200).json({
      status: 'Successfully found contacts!',
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
      message: 'Successfully found contact with id {contactId}!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
