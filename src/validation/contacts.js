import Joi from 'joi';
import { typeList, minLetters, maxLetters } from '../constants/contacts.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(minLetters).max(maxLetters).required,
  phoneNumber: Joi.number().required,
  email: Joi.string().min(minLetters).max(maxLetters).required,
  isFavourite: Joi.boolean().required,
  contactType: Joi.string()
    .min(minLetters)
    .max(maxLetters)
    .valid(...typeList).required,
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(minLetters).max(maxLetters),
  phoneNumber: Joi.number(),
  email: Joi.string().min(minLetters).max(maxLetters),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(minLetters)
    .max(maxLetters)
    .valid(...typeList),
});
