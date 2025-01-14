import SessionColection from '../db/models/Session.js';
import UserCollection from '../db/models/User.js';
import { hashPassword } from './../constants/hash.js';
import { randomBytes } from 'crypto';
import HttpError from 'http-errors';

import { accessTokenTime, refreshTokenTime } from '../constants/users.js';

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    thow.HttpError(409, 'Email in use.');
  }

  const res = hashPassword(password);

  const newUser = await UserCollection.create({ ...payload, password: res });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    thow.HttpError(401, 'Email or Password invalid !');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    thow.HttpError(401, 'Email or Password invalid !');
  }

  await SessionColection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionColection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenTime,
    refreshTokenValidUntil: Date.now() + refreshTokenTime,
  });
};
