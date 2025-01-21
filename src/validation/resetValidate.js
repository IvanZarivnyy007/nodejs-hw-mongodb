import Joi from 'joi';

export const resetValidate = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(7).required(),
});
