import { Router } from 'express';

import * as authController from './../controllers/auth.js';

import { validateBody } from './../utils/validateBody.js';

import {
  authRegisterSchema,
  authLoginSchema,
} from './../validation/authRegisterSchema.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { emailValidate } from '../validation/emailValidate.js';
import { resetValidate } from './../validation/resetValidate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authController.registerController),
);
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authController.loginController),
);
authRouter.post('/refresh', ctrlWrapper(authController.refreshController));
authRouter.post('/logout', ctrlWrapper(authController.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(emailValidate),
  ctrlWrapper(authController.sendEmail),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetValidate),
  ctrlWrapper(authController.resetPwd),
);

authRouter.get('/get-oauth-url', ctrlWrapper(authController.getGoogleAuthUrl));

export default authRouter;
