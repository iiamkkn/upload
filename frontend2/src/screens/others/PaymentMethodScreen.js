// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { savePaymentMethod } from '../../actions/cartActions';
// import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
// import Footer from '../../components/Footer/Footer';
// import Navbar from '../../components/Navbar/Navbar';

// export default function PaymentMethodScreen(props) {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;
//   if (!shippingAddress.address) {
//     navigate('/shipping');
//   }
//   const [paymentMethod, setPaymentMethod] = useState('PayPal');
//   const dispatch = useDispatch();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate('/placeorder');
//     window.location.reload();
//   };
//   return (
// <>
//   <Navbar />
//   <CheckoutSteps step1 step2 step3></CheckoutSteps>
//   <div className="main-shippingAddress-container">
//     <form className="form" onSubmit={submitHandler}>
//       <div>
//         <h1 className="h1ColorClass">Payment Method</h1>
//       </div>

//       <div className="radio-cont">
//         <label>
//           <input
//             type="radio"
//             id="paypal"
//             value="PayPal"
//             name="paymentMethod"
//             required
//             // checked
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//           <span className="check"></span>
//           <span>PayPal</span>
//         </label>
//         <label>
//           <input
//             type="radio"
//             id="stripe"
//             value="Stripe"
//             name="paymentMethod"
//             required
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//           <span className="check"></span>
//           <span>Stripe</span>
//         </label>
//       </div>
//       <div>
//         <label />

//         <button className="paymentbtnCTN" type="submit">
//           Continue
//           <i className="bx bx-right-arrow-alt"></i>
//         </button>
//       </div>
//     </form>
//   </div>

//   <Footer />
// </>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
import { Store } from '../../api/Store';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  // const { shippingAddress, paymentMethod } = cart;
  const { paymentMethod } = cart;

  const { cartState, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = cartState;
  // const { cart } = cartState;
  const {
    cart: { shippingAddress },
  } = cartState;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );
  const dispatch = useDispatch();
  if (!shippingAddress.address) {
    // if (!shippingAddress) {
    navigate('/shipping');
    window.location.reload();
  }

  if (!userInfo) {
    navigate('/signin?redirect=/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  // const [paymentMethod, setPaymentMethod] = useState('PayPal');
  //   const dispatch = useDispatch();
  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(savePaymentMethod(paymentMethod));
  //     navigate('/placeorder');
  //     window.location.reload();
  //   };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Payment Method' : 'Fizetési mód'}</title>
      </Helmet>

      <Navbar />
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="main-shippingAddress-container">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1 className="h1ColorClass">
              {lang === 'EN' ? 'Payment Method' : 'Fizetési mód'}
            </h1>
          </div>

          <div className="radio-cont">
            {/* <label>
              <input
                type="radio"
                id="BrainTree"
                value="BrainTree"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="check"></span>
              <span>BrainTree Credit Card</span>
            </label> */}
            <label>
              <input
                type="radio"
                id="stripe"
                value="Credit Card"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="check"></span>
              <span>
                {lang === 'EN'
                  ? 'Pay by Credit Card'
                  : 'Bank kártyával fizetni'}
              </span>
            </label>

            {/* <label>
              <input
                type="radio"
                id="paypal"
                value="PayPal or Credit Card"
                name="paymentMethod"
                required
                // checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="check"></span>
              <span>PayPal or Credit Card</span>
            </label> */}
          </div>
          <div>
            <label />

            <button className="paymentbtnCTN" type="submit">
              Continue
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
