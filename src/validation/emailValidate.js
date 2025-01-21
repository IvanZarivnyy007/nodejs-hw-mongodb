import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

export const emailValidate = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
