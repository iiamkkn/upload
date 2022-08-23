var express = require('express');
var SignUp_user_verify = require('../controllers/user_verify.js');
var SignUp_Link_verification = require('../controllers/user_verify.js');
var user_forgetpass = require('../controllers/user_verify.js');
var Subscribe_newsLetter = require('../controllers/user_verify.js');
var user_forgetpass_update = require('../controllers/user_verify.js');

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

module.exports = { VerifyRouter };
