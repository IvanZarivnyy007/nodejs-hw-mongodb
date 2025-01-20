import SessionColection from '../db/models/Session.js';
import UserCollection from '../db/models/User.js';
import { hashPassword } from './../constants/hash.js';
import { randomBytes } from 'crypto';
import HttpError from 'http-errors';

import { accessTokenTime, refreshTokenTime } from '../constants/users.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenTime,
    refreshTokenValidUntil: Date.now() + refreshTokenTime,
  };
};

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use.');
  }

  const res = await hashPassword(password);

  const newUser = await UserCollection.create({ ...payload, password: res });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or Password invalid !');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or Password invalid !');
  }

  await SessionColection.deleteOne({ userId: user._id });

  return SessionColection.create({
    userId: user._id,
    ...createSession(),
  });
};

export const getSession = (filter) => SessionColection.findOne(filter);

export const getUser = (filter) => UserCollection.findOne(filter);

export const refreshSession = async ({ refreshToken }) => {
  const session = await SessionColection.findOne({ refreshToken });
  if (!session) {
    throw HttpError(401, 'Session not found !');
  }
  const dateExpired = session.refreshTokenValidUntil;

  if (Date.now() > dateExpired) {
    throw HttpError(401, 'Session token expired!');
  }
  await SessionColection.deleteOne({ refreshToken });

  const newSession = createSession();

  return await SessionColection.create({
    ...newSession,
    userId: session.userId,
  });
};

export const logoutSession = async ({ refreshToken, sessionId }) => {
  return SessionColection.deleteOne({ _id: sessionId, refreshToken });
};
