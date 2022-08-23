import express from 'express';
import {
  processPaymentStripe,
  sendStripeApi,
} from '../controllers/paymentController.js';

const PaymentRouter = express.Router();

// Stripe Credit Card
PaymentRouter.post('/cc/payment/process', processPaymentStripe);
PaymentRouter.get('/cc/payment/process/pay', sendStripeApi);

// => Braintree Payment
// import {generatePayToken, processBTPayment,} from '../controllers/paymentController.js';

// PaymentRouter.get('/generate/bt_token', generatePayToken);
// PaymentRouter.post('/process/BTpayment', processBTPayment);

export default PaymentRouter;
