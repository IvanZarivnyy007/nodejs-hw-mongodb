import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const result = await authServices.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: result,
  });
};

export const loginController = async (req, res) => {
  const result = await authServices.login(req.body);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    expires: new Date(result.refreshTokenValidUntil),
  });
  res.cookie('sessionId', result._id, {
    httpOnly: true,
    expires: new Date(result.refreshTokenValidUntil),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: result.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await authServices.refreshSession({ refreshToken });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    expires: new Date(result.refreshTokenValidUntil),
  });
  res.cookie('sessionId', result._id, {
    httpOnly: true,
    expires: new Date(result.refreshTokenValidUntil),
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: result.accessToken },
  });
};

export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const sessionId = req.cookies.sessionId;
  await authServices.logoutSession({ refreshToken, sessionId });

  res.clearCookie('refreshToken');

  res.clearCookie('sessionId');

  res.status(204).send();
};

export const sendEmail = async (req, res) => {
  const email = req.body.email;

  await authServices.requestResetToken(email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPwd = async (req, res) => {
  await authServices.resetPwd(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
