import dotenv from 'dotenv';
dotenv.config();
import expressAsyncHandler from 'express-async-handler';

import Stripe from 'stripe';
const sKEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(sKEY);

// console.log(sKEY);
// backend => /api/cc/payment/process

export const processPaymentStripe = expressAsyncHandler(
  async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'huf',

      metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  }
);

// send api to frontend => /api/cc/payment/process/pay
export const sendStripeApi = expressAsyncHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

// import braintree from 'braintree';

// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.MERCHANT_ID,
//   publicKey: process.env.PUBLIC_KEY,
//   privateKey: process.env.PRIVATE_KEY,
// });

// // first generate token for payment
// export const generatePayToken = (req, res) => {
//   gateway.clientToken
//     .generate({})
//     .then((response) => {
//       res.status(200).send(response);
//     })
//     .catch((err) => res.status(500).send(err));
// };

// // second -> process payment after token generation
// export const processBTPayment = (req, response) => {
//   const nonceFromTheClient = req.body.payment_method_nonce;

//   const { amount } = req.body;
//   gateway.transaction
//     .sale({
//       amount: amount,
//       paymentMethodNonce: nonceFromTheClient,
//       //   deviceData: deviceDataFromTheClient,
//       options: {
//         submitForSettlement: true,
//       },
//     })
//     .then((response) => response.status(200).send(response))
//     .catch((err) => response.status(500).send(err));
// };
