var express = require('express');
var mg = require('mailgun-js');
var fileUpload = require('express-fileupload');
var forgotPasswordv1 = require('../controllers/AuthController.js');
var resetPasswordv1 = require('../controllers/AuthController.js');

const app = express.Router();
app.use(fileUpload());

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const passRoutes = express.Router();

passRoutes.post('/password/forgot', forgotPasswordv1);
passRoutes.put('/password/reset/:token', resetPasswordv1);

module.exports = { passRoutes, mailgun };
