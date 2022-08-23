import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: 'red',
    },
  },
};

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {}, []);

  const submitHandlerStripe = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={submitHandlerStripe}>
        <div className="contField contFieldPayForm">
          <div className="box" controlId="cardnum">
            <CardNumberElement type="text" id="cardnum" options={options} />
            <label htmlFor="cardnum">Card Number</label>
          </div>
          <div className="box" controlId="carexpiry">
            <CardExpiryElement type="text" id="carexpiry" options={options} />
            <label htmlFor="carexpiry">Card expiry</label>
          </div>
          <div className="box" controlId="card_cvc">
            <CardCvcElement type="text" id="card_cvc" options={options} />
            <label htmlFor="card_cvc">Cvc</label>
          </div>
          <button className="PayNowBTN">Pay Now</button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
