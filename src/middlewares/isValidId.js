import { isValidObjectId } from 'mongoose';
import HttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(HttpError(400, `${id} ivalid ID`));
  }
  next();
};
