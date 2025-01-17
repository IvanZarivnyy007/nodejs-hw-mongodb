import HttpError from 'http-errors';
import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(HttpError(401, 'Access token expired'));
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Header must be Bearer type'));
  }

  const session = await getSession({ accessToken });
  if (!session) {
    return next(HttpError(401, 'Session not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(HttpError(401, 'Access token expired'));
  }

  const user = await getUser({ _id: session.userId });
  if (!user) {
    return next(HttpError(401, 'User not found'));
  }

  next();

  req.user = user;
};
