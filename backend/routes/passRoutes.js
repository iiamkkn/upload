import express from 'express';
import {
  forgotPasswordv1,
  resetPasswordv1,
} from '../controllers/AuthController.js';
import fileUpload from 'express-fileupload';

const app = express.Router();
app.use(fileUpload());
import mg from 'mailgun-js';

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const passRoutes = express.Router();

passRoutes.post('/password/forgot', forgotPasswordv1);
passRoutes.put('/password/reset/:token', resetPasswordv1);

export default passRoutes;
