import express from 'express';
import {
  SignUp_user_verify,
  SignUp_Link_verification,
  Subscribe_newsLetter,
  user_forgetpass,
  user_forgetpass_update,
} from '../controllers/user_verify.js';

const VerifyRouter = express.Router();

// /api/account/signup/user_verify

VerifyRouter.post('/signup/user_verify', SignUp_user_verify);
VerifyRouter.post('/newsletter/subscribe', Subscribe_newsLetter);

// /api/account/:id/verify/:token

VerifyRouter.get('/:id/verify/:token', SignUp_Link_verification);

VerifyRouter.post('/signup/user_forgetpass', user_forgetpass);
VerifyRouter.put(
  '/signup/user_forgetpass_update/:token',
  user_forgetpass_update
);

export default VerifyRouter;
