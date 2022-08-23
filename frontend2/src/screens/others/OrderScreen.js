// import React, { useEffect, useReducer } from 'react';
// import { useSelector } from 'react-redux';

// import LoadingBox from '../../components/LoadingBox/LoadingBox';
// import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
// import MessageBox from '../../components/LoadingBox/MessageBox';

// import axios from 'axios';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate, useParams } from 'react-router-dom';

// import { Link } from 'react-router-dom';
// // import { Store } from '../../api/Store';
// import { getError } from '../../utils';
// import { toast, ToastContainer } from 'react-toastify';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';

// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, order: action.payload, error: '' };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'PAY_REQUEST':
//       return { ...state, loadingPay: true };
//     case 'PAY_SUCCESS':
//       return { ...state, loadingPay: false, successPay: true };
//     case 'PAY_FAIL':
//       return { ...state, loadingPay: false };
//     case 'PAY_RESET':
//       return { ...state, loadingPay: false, successPay: false };

//     case 'DELIVER_REQUEST':
//       return { ...state, loadingDeliver: true };
//     case 'DELIVER_SUCCESS':
//       return { ...state, loadingDeliver: false, successDeliver: true };
//     case 'DELIVER_FAIL':
//       return { ...state, loadingDeliver: false };
//     case 'DELIVER_RESET':
//       return {
//         ...state,
//         loadingDeliver: false,
//         successDeliver: false,
//       };
//     default:
//       return state;
//   }
// }
// export default function OrderScreen() {
//   // const { state } = useContext(Store);
//   // const { userInfo } = state;
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;

//   const params = useParams();
//   const { id: orderId } = params;
//   const navigate = useNavigate();

//   const [
//     {
//       loading,
//       error,
//       order,
//       successPay,
//       loadingPay,
//       loadingDeliver,
//       successDeliver,
//     },
//     dispatch,
//   ] = useReducer(reducer, {
//     loading: true,
//     order: {},
//     error: '',
//     successPay: false,
//     loadingPay: false,
//   });

//   const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             amount: { value: order.totalPrice },
//           },
//         ],
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   }

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         dispatch({ type: 'PAY_REQUEST' });
//         const { data } = await AxiosInstance.put(
//           `/api/orders/${order._id}/pay`,
//           details,
//           {
//             headers: { authorization: `Bearer ${userInfo.token}` },
//           }
//         );
//         dispatch({ type: 'PAY_SUCCESS', payload: data });
//         alert('Order is paid');
//         window.location.reload();
//       } catch (err) {
//         dispatch({ type: 'PAY_FAIL', payload: getError(err) });
//         alert(getError(err));
//       }
//     });
//   }
//   function onError(err) {
//     alert(getError(err));
//   }

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' });
//         const { data } = await AxiosInstance.get(`/api/orders/${orderId}`, {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         });
//         dispatch({ type: 'FETCH_SUCCESS', payload: data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
//       }
//     };

//     if (!userInfo) {
//       return navigate('/login');
//     }

//     if (
//       !order._id ||
//       successPay ||
//       successDeliver ||
//       (order._id && order._id !== orderId)
//     ) {
//       fetchOrder();
//       if (successPay) {
//         dispatch({ type: 'PAY_RESET' });
//       }
//       if (successDeliver) {
//         dispatch({ type: 'DELIVER_RESET' });
//       }
//     } else {
//       const loadPaypalScript = async () => {
//         const { data: clientId } = await AxiosInstance.get('/api/keys/paypal', {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         });
//         paypalDispatch({
//           type: 'resetOptions',
//           value: {
//             'client-id': clientId,
//             currency: 'USD',
//           },
//         });
//         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
//       };
//       loadPaypalScript();
//     }
//   }, [
//     order,
//     userInfo,
//     orderId,
//     navigate,
//     paypalDispatch,
//     successPay,
//     successDeliver,
//   ]);

//   async function deliverOrderHandler() {
//     try {
//       dispatch({ type: 'DELIVER_REQUEST' });
//       const { data } = await AxiosInstance.put(
//         `/api/orders/${order._id}/deliver`,
//         {},
//         {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({ type: 'DELIVER_SUCCESS', payload: data });
//       alert('Order is delivered');
//     } catch (err) {
//       alert(getError(err));
//       dispatch({ type: 'DELIVER_FAIL' });
//     }
//   }

//   return loading ? (
//     <LoadingBox></LoadingBox>
//   ) : error ? (
//     <MessageBox variant="danger">{error}</MessageBox>
//   ) : (
//     <>
//       <Navbar />

//       <Helmet>
//         <title>{order.shippingAddress.fullName}'s' order details</title>
//       </Helmet>
//       <ToastContainer position="bottom-center" limit={1} />
//       {/* <h1 className="my-3">Order {orderId}</h1> */}
//       <div className="PaymentCOnfirmColor">Payment Summary</div>

//       <div className="row top">
//         <div className="col-2">
//           <ul>
//             <li>
//               <div className="card card-body">
//                 <h2>Shipping</h2>
//                 <p>
//                   <strong>Name &#x2192; </strong>
//                   <span className="addressINFOColor">
//                     {order.shippingAddress.fullName}
//                   </span>{' '}
//                   <br />
//                   <strong>Address &#x2192; </strong>{' '}
//                   {order.shippingAddress.address},{order.shippingAddress.city},{' '}
//                   {order.shippingAddress.postalCode},
//                   {order.shippingAddress.country}
//                   &nbsp;
//                   {order.shippingAddress.location &&
//                     order.shippingAddress.location.lat && (
//                       <a
//                         target="_new"
//                         href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
//                       >
//                         Show On Map
//                       </a>
//                     )}
//                 </p>
//                 {order.isDelivered ? (
//                   <Tippy content={order.deliveredAt} placement="right">
//                     <button className="greenYES">
//                       Delivered at {order.deliveredAt.substring(0, 10)}
//                       <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
//                     </button>
//                   </Tippy>
//                 ) : (
//                   <>
//                     <Tippy content="Not Delivered" placement="right">
//                       <button className="notRED">
//                         Not Delivered
//                         <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
//                       </button>
//                     </Tippy>
//                   </>
//                 )}
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Payment</h2>
//                 <p>
//                   <strong>Method &#x2192; </strong>
//                   <span className="addressINFOColor">
//                     {order.paymentMethod}
//                   </span>
//                 </p>
//                 {order.isPaid ? (
//                   <>
//                     <Tippy content={order.paidAt} placement="right">
//                       <button className="greenYES">
//                         Paid at {order.paidAt.substring(0, 10)}
//                         <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
//                       </button>
//                     </Tippy>
//                   </>
//                 ) : (
//                   <>
//                     <Tippy content="Not Paid" placement="right">
//                       <button className="notRED">
//                         Not Paid
//                         <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
//                       </button>
//                     </Tippy>
//                   </>
//                 )}
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Order Items</h2>
//                 <ul>
//                   {order.orderItems.map((item) => (
//                     <li key={item._id}>
//                       <div className="row placeOrder_row">
//                         <div>
//                           <Link
//                             className="orderLink"
//                             to={`/product/${item._id}`}
//                           >
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="small"
//                             ></img>{' '}
//                           </Link>
//                         </div>
//                         <div className="min-30">
//                           <Link
//                             className="orderLink"
//                             to={`/product/${item._id}`}
//                           >
//                             {item.name}
//                           </Link>
//                         </div>

//                         <div>
//                           <strong>
//                             {item.quantity} x ${item.price} = $
//                             {item.quantity * item.price}
//                           </strong>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>

//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2 className="h1ColorClass">Payment Summary</h2>
//               </li>

//               <li>
//                 <div className="row ">
//                   <div className="order_summary_info">Total items Price</div>
//                   <div>${order.itemsPrice.toFixed(2)}</div>
//                 </div>
//               </li>

//               <li>
//                 <div className="row">
//                   <div className="order_summary_info">Shipping Fee</div>
//                   <div>${order.shippingPrice.toFixed(2)}</div>
//                 </div>
//               </li>

//               <li>
//                 <div className="row">
//                   <div className="order_summary_info">Tax</div>
//                   <div>${order.taxPrice.toFixed(2)}</div>
//                 </div>
//               </li>

//               <li>
//                 <div className="row">
//                   <div>
//                     <strong> Total amount</strong>
//                   </div>
//                   <div>
//                     <strong>${order.totalPrice.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </li>

//               {!order.isPaid && (
//                 <li>
//                   {isPending ? (
//                     <OnlyLoading />
//                   ) : (
//                     <div>
//                       <br />
//                       <PayPalButtons
//                         createOrder={createOrder}
//                         onApprove={onApprove}
//                         onError={onError}
//                       ></PayPalButtons>
//                     </div>
//                   )}
//                   {loadingPay && <OnlyLoading></OnlyLoading>}
//                 </li>
//               )}
//               {(userInfo.isAdmin || userInfo.isSeller) &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <li>
//                     {loadingDeliver && <OnlyLoading></OnlyLoading>}
//                     <br />
//                     <Tippy content="Confirm Order Delivery" placement="bottom">
//                       <button
//                         className="deliveryBTN"
//                         type="button"
//                         onClick={deliverOrderHandler}
//                       >
//                         Deliver Order
//                       </button>
//                     </Tippy>
//                   </li>
//                 )}
//               <li>
//                 <div className="thisIsPaidBTN">
//                   {order.isPaid &&
//                     order.isDelivered &&
//                     'This order is alreadt paid & delivered.'}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
// /// BrainTree Credit Card

// const [values, setValues] = useState({
//   clientToken: null,
//   success: '',
//   error: '',
//   instance: '',
// });

// const { clientToken, success, BTerror, instance } = values;

// const onPurchase = () => {
//   instance.requestPaymentMethod().then((data) => {
//     let nonce = data.nonce;
//     let paymentData = {
//       payment_method_nonce: nonce,
//       amount: order.totalPrice.toFixed(2),
//     };

//     makePayment(paymentData)
//       .then((response) => {
//         console.log('BT RESPONSE', response);
//         if (response.err) {
//           setValues({ ...values, error: response.err });
//         } else {
//           setValues({ ...values, error: '', success: response.success });
//         }
//       })
//       .catch((err) => {
//         setValues({ ...values, success: '', error: err });
//       });
//   });
// };
// useEffect(() => {
//   // Brain tree
//   const getToken = () => {
//     getClientToken().then((response) => {
//       // console.log(response);
//       if (response.err) {
//         setValues({ ...values, error: response.err });
//       } else {
//         setValues({ ...values, clientToken: response.clientToken });
//       }
//     });
//   };

//   getToken();
// }, [values]);

/// BrainTree Credit Card ends here

import React, { useEffect, useReducer, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
// import { Store } from '../../api/Store';
import { getError } from '../../utils';
import MessageBox from '../../components/LoadingBox/MessageBox';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useSelector } from 'react-redux';
import '../CSS/others.css';
import { StripeNeworderReducer } from '../../actions/orderActions';
import parse from 'html-react-parser';
// import DropIn from 'braintree-web-drop-in-react';
// import { getClientToken, makePayment } from '../../api/apiCalls';
// import { StripeNeworderReducer } from '../../actions/orderActions';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import axios from 'axios';
import { AxiosInstance } from '../../api/AxiosInstance';

const options = {
  style: {
    base: {
      // color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontWeight: 'bold',
      fontSize: '16px',
      iconColor: '#666EE8',
      paddingLeft: '5px',
      lineHeight: '40px',
      // '::placeholder': {
      //   color: '#eee',
      // },
    },
    invalid: {
      color: 'red',
      backgroundColor: '#fbdcdc',
      fontWeight: 'bold',
      paddingLeft: '5px',
      borderRadius: '5px',
      fontFamily: 'Arial, sans-serif',
      // color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}
export default function OrderScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [orderPaidMsg, setorderPaidMsg] = useState('');
  const [orderPaidMsgSuccess, setorderPaidMsgSuccess] = useState('');
  const [orderERRMsg, setorderERRMsg] = useState('');

  // Paypal
  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await AxiosInstance.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        // alert('Order is paid');
        setorderPaidMsg(
          `<div className="orderDelPaidMsg">Order is <b>Paid </b>successfully. <i class="fa-regular fa-circle-check UI_icon_small_tick"></i></div>`
        );

        if (lang === 'EN') {
          setorderPaidMsgSuccess(`
        <div className="no_order_to_be_placed_DIV" style={{ lineHeight: '2.5rem' }}>
  
        <h1>Congratulations!</h1>
        <div className="PaySuccess_row">
        <h2>You have paid successfully </h2>   <i class="fa-regular fa-circle-check UI_icon_small_tickSUccess"></i> 
        </div>
        <p style={{ fontSize: '0.8rem' }}>
        Your order is under <b>Processing</b> and it will be delivered soon.
      </p>
        
  
      </div>
      `);
        } else if (lang === 'HU') {
          setorderPaidMsgSuccess(`
        <div className="no_order_to_be_placed_DIV" style={{ lineHeight: '2.5rem' }}>
  
        <h1>Gratulálunk!</h1>
        <div className="PaySuccess_row">
        <h2>Sikeresen fizetett </h2>   <i class="fa-regular fa-circle-check UI_icon_small_tickSUccess"></i> 
        </div>
        <p style={{ fontSize: '0.8rem' }}>
        Rendelése alatt van <b>Feldolgozás</b> és hamarosan kézbesítik.
      </p>
        
  
      </div>
      `);
        }
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        // alert(getError(err));
        setorderERRMsg(`<div className="orderERRMsg">${getError(err)}</div>`);
      }
    });
  }
  function onError(err) {
    // alert(getError(err));
    setorderERRMsg(`<div className="orderERRMsg">${getError(err)}</div>`);
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await AxiosInstance.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await AxiosInstance.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
    // getToken,
    // values,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await AxiosInstance.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      // alert('Order is delivered');
      if (lang === 'EN') {
        setorderPaidMsg(
          `<div className="orderDelPaidMsg">Order is <b>delivered </b>successfully. <i class="fa-regular fa-circle-check UI_icon_small_tick"></i></div>`
        );
      }
      if (lang === 'HU') {
        setorderPaidMsg(
          `<div className="orderDelPaidMsg">A sorrend az <b>szállított </b>sikeresen. <i class="fa-regular fa-circle-check UI_icon_small_tick"></i></div>`
        );
      }
    } catch (err) {
      // alert(getError(err));
      setorderERRMsg(`<div className="orderERRMsg">${getError(err)}</div>`);
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  /// Stripe Credit Card Handling

  const { Striperror } = useSelector((state) => state.StripeNewOrder);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      setorderERRMsg(`<div className="orderERRMsg">${error(error)}</div>`);
    }
  }, [error]);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (Striperror) {
      // alert(Striperror);
      setorderERRMsg(`<div className="orderERRMsg">${Striperror}</div>`);
      dispatch({ type: 'ORDER_CREATE_FAIL_STRIPE' });
    }
  }, [dispatch, Striperror]);

  // let getStripeAmount = Math.round(order.totalPrice * 100);

  var purchase = {
    items: [{ id: order._id }],
  };

  const StripePaymentData = {
    // amount: '100',
    amount: Math.round(order.totalPrice * 100),
  };

  const submitHandlerStripe = async (e) => {
    e.preventDefault();

    document.querySelector('#PaymentNowBTN').disabled = true;
    let res;
    // console.log(res);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchase),
      };
      res = await AxiosInstance.post(
        '/api/cc/payment/process',
        StripePaymentData,
        config
      );
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: order.shippingAddress.fullName,
            // city: order.shippingAddress.city,
            // postalCode: order.shippingAddress.postalCode,
            // country: order.shippingAddress.country,
            // method: order.paymentMethod,
          },
        },
      });

      let Stripe_paymentIntent_id;
      let Stripe_paymentIntent_status;
      if (result.error) {
        // setorderERRMsg(result.error.message);
        setorderERRMsg(
          `<div className="orderERRMsg">${result.error.message}</div>`
        );
        // Stripleloading(true);

        showError(result.error.message);
        document.querySelector('#PaymentNowBTN').disabled = false;
        document.querySelector('#PaymentNowFORM').disabled = false;
      } else {
        // if payment is successful or not then

        if (result.paymentIntent.status === 'succeeded') {
          // if payment is successful then create new order

          try {
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await AxiosInstance.put(
              `/api/orders/${order._id}/pay`,

              {
                headers: { authorization: `Bearer ${userInfo.token}` },
              }
            );
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            dispatch(StripeNeworderReducer(order));

            // alert('Order is paid');
            if (lang === 'EN') {
              setorderPaidMsg(
                `<div className="orderDelPaidMsg">Order is <b>Paid </b>successfully. <i class="fa-regular fa-circle-check UI_icon_small_tick"></i></div>`
              );
            }
            if (lang === 'HU') {
              setorderPaidMsg(
                `<div className="orderDelPaidMsg">A sorrend az <b>Fizetett </b>sikeresen. <i class="fa-regular fa-circle-check UI_icon_small_tick"></i></div>`
              );
            }

            if (lang === 'EN') {
              setorderPaidMsgSuccess(`
          <div className="no_order_to_be_placed_DIV" style={{ lineHeight: '2.5rem' }}>
    
          <h1>Congratulations!</h1>
          <div className="PaySuccess_row">
          <h2>You have paid successfully </h2>   <i class="fa-regular fa-circle-check UI_icon_small_tickSUccess"></i> 
          </div>
          <p style={{ fontSize: '0.8rem' }}>
          Your order is under <b>Processing</b> and it will be delivered soon.
        </p>
          
    
        </div>
        `);
            } else if (lang === 'HU') {
              setorderPaidMsgSuccess(`
          <div className="no_order_to_be_placed_DIV" style={{ lineHeight: '2.5rem' }}>
    
          <h1>Gratulálunk!</h1>
          <div className="PaySuccess_row">
          <h2>Sikeresen fizetett </h2>   <i class="fa-regular fa-circle-check UI_icon_small_tickSUccess"></i> 
          </div>
          <p style={{ fontSize: '0.8rem' }}>
          Rendelése alatt van <b>Feldolgozás</b> és hamarosan kézbesítik.
        </p>
          
    
        </div>
        `);
            }
            // orderComplete(result.paymentIntent.id);
            Stripe_paymentIntent_id = result.paymentIntent.id;
            Stripe_paymentIntent_status = result.paymentIntent.status;
          } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            // alert(getError(err));
            setorderERRMsg(
              `<div className="orderERRMsg">${getError(err)}</div>`
            );
          }

          // navigate('/pay_successful');
        } else {
          // alert('There is some issue while processing the payment request. ');
          setorderERRMsg(
            `<div className="orderERRMsg">There is some issue while processing the payment request.</div>`
          );
        }
        // console.log(Stripe_paymentIntent_status);
        // console.log(Stripe_paymentIntent_id);
      }
    } catch (error) {
      // alert(error.response.data.message);
      setorderERRMsg(
        `<div className="orderERRMsg">${error.response.data.message}</div>`
      );
      document.querySelector('#PaymentNowBTN').disabled = false;
      document.querySelector('#PaymentNowFORM').disabled = false;
    }
  };
  // const orderComplete = function (paymentIntentId) {
  //   Stripleloading(false);
  //   document
  //     .querySelector('.result-message a')
  //     .setAttribute(
  //       'href',
  //       'https://dashboard.stripe.com/test/payments/' + paymentIntentId
  //     );
  //   document.querySelector('.result-message').classList.remove('hidden');
  //   document.querySelector('button').disabled = true;
  // };

  // Show the customer the error from Stripe if their card fails to charge
  const showError = function (errorMsgText) {
    Stripleloading(false);
    var errorMsg = document.querySelector('#card-error');
    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
      errorMsg.textContent = '';
    }, 4000);
  };

  // Show a spinner on payment submission
  var Stripleloading = function (isSLoading) {
    if (isSLoading) {
      // Disable the button and show a spinner
      document.querySelector('button').disabled = true;
      document.querySelector('#spinner').classList.remove('hidden');
      document.querySelector('#button-text').classList.add('hidden');
    } else {
      document.querySelector('button').disabled = false;
      document.querySelector('#spinner').classList.add('hidden');
      document.querySelector('#button-text').classList.remove('hidden');
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <Navbar />

      <Helmet>
        <title>
          {order.shippingAddress.fullName}'s'{' '}
          {lang === 'EN' ? 'order details' : 'megrendelés részletei'}
        </title>
      </Helmet>

      {/* <h1 className="my-3">Order {orderId}</h1> */}
      <div className="PaymentCOnfirmColor">
        {lang === 'EN' ? 'Payment Summary' : 'Fizetési összefoglaló'}
      </div>
      {parse(orderPaidMsgSuccess)}
      {/* {PayStripeBTN} */}

      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>{lang === 'EN' ? 'Shipping' : 'Szállítás'}</h2>
                <p style={{ lineHeight: '2rem' }}>
                  <strong>{lang === 'EN' ? 'Name' : 'Név'} &#x2192; </strong>
                  <span className="addressINFOColor">
                    {order.shippingAddress.fullName}
                  </span>{' '}
                  <br />
                  <strong>
                    {lang === 'EN' ? 'Address' : 'Cím'} &#x2192;{' '}
                  </strong>{' '}
                  {order.shippingAddress.address},{order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                  &nbsp;
                  {order.shippingAddress.location &&
                    order.shippingAddress.location.lat && (
                      <Link
                        target="_new"
                        to={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                      >
                        Show On Map
                      </Link>
                    )}
                </p>
                {order.isPaid && order.isDelivered && (
                  <Tippy content={order.deliveredAt} placement="right">
                    <button className="greenYES">
                      {lang === 'EN' ? 'Delivered at' : 'Szállítva'}{' '}
                      {order.deliveredAt.substring(0, 10)}
                      <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                    </button>
                  </Tippy>
                  // ) : (
                )}
                <>
                  {order.isPaid && !order.isDelivered && (
                    <Tippy content="Not Delivered" placement="right">
                      <button className="notRED">
                        {lang === 'EN' ? 'Not Delivered' : 'Nem kézbesített'}
                        <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                      </button>
                    </Tippy>
                  )}
                </>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{lang === 'EN' ? 'Payment' : 'Fizetés'}</h2>
                <p>
                  <strong>
                    {lang === 'EN' ? 'Method' : 'Módszer'} &#x2192;{' '}
                  </strong>
                  <span className="addressINFOColor">
                    {order.paymentMethod}
                  </span>
                </p>
                {order.isPaid && (
                  <>
                    <Tippy content={order.paidAt} placement="right">
                      <button className="greenYES">
                        {lang === 'EN' ? 'Paid at' : 'Fizetett'}{' '}
                        {order.paidAt.substring(0, 10)}
                        <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                      </button>
                    </Tippy>
                  </>
                  // )
                  // : (
                  //   <>
                  //     <Tippy content="Not Paid" placement="right">
                  //       <button className="notRED">
                  //         {lang === 'EN' ? 'Not Paid' : 'Nem fizetett'}
                  //         <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                  //       </button>
                  //     </Tippy>
                  //   </>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>{lang === 'EN' ? 'Order Items' : 'Tételek rendelése'}</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="row placeOrder_row">
                        <div>
                          <Link
                            className="orderLink"
                            to={`/product/${item._id}`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>{' '}
                          </Link>
                        </div>
                        <div className="min-30">
                          <Link
                            className="orderLink"
                            to={`/product/${item._id}`}
                          >
                            {lang === 'EN' ? (
                              <> {item.name}</>
                            ) : (
                              <>{item.name}</>
                            )}
                          </Link>
                        </div>

                        <div>
                          <strong>
                            {item.quantity} x {item.price}.00 = &nbsp;
                            {item.quantity * item.price}.00 HUF
                          </strong>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body-mob">
            <ul style={{ padding: '6px' }}>
              <li>
                <h2 className="h1ColorClass">
                  {lang === 'EN' ? 'Payment Summary' : 'Fizetési összefoglaló'}
                </h2>
              </li>

              <li>
                <div className="row ">
                  <div className="order_summary_info">
                    {lang === 'EN' ? 'Total items Price' : 'Összes tétel Ár'}
                  </div>
                  <div>{order.itemsPrice.toFixed(2)} HUF</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div className="order_summary_info">
                    {lang === 'EN' ? 'Shipping Fee' : 'Szállítási költség'}
                  </div>
                  <div>{order.shippingPrice.toFixed(2)} HUF</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div className="order_summary_info">
                    {lang === 'EN' ? 'Tax Fee' : 'Adódíj'}
                  </div>
                  <div>{order.taxPrice.toFixed(2)} HUF</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>
                      {' '}
                      {lang === 'EN' ? 'Total amount' : 'Teljes összeg'}
                    </strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice.toFixed(2)} HUF</strong>
                  </div>
                </div>
              </li>

              {!order.isPaid && order.paymentMethod === 'Credit Card' ? (
                <>
                  {/* 
                  Stripe credit card payment
                  <CheckoutForm /> */}

                  {parse(orderERRMsg)}
                  <div className="pay_form_mob">
                    <form
                      onSubmit={submitHandlerStripe}
                      id="payment-form PaymentNowFORM"
                    >
                      <div className="contField contFieldPayForm">
                        <div className="box">
                          <CardNumberElement
                            type="text"
                            id="cardnum"
                            options={options}
                          />
                          <label htmlFor="cardnum">
                            {' '}
                            {lang === 'EN' ? 'Card number' : 'Kártyaszám'}
                          </label>
                        </div>
                        <div className="box">
                          <CardExpiryElement
                            type="text"
                            id="carexpiry"
                            options={options}
                          />
                          <label htmlFor="carexpiry">
                            {lang === 'EN'
                              ? 'Card expiry'
                              : 'A kártya lejárata'}
                          </label>
                        </div>
                        <div className="box">
                          <CardCvcElement
                            type="text"
                            id="card_cvc"
                            options={options}
                          />
                          <label htmlFor="card_cvc">
                            {lang === 'EN' ? 'cvc' : 'cvc'}
                          </label>
                        </div>
                        <div className="spinner hidden" id="spinner"></div>
                        <button
                          className="PayNowBTN PayNowSnipper"
                          id="PaymentNowBTN"
                          disabled={loading}
                        >
                          {loading ? (
                            'Loading...'
                          ) : (
                            <>
                              <b>
                                {' '}
                                {lang === 'EN' ? 'Pay Now' : 'Fizess most'}
                              </b>{' '}
                              - {Math.round(order.totalPrice)} HUF
                            </>
                          )}
                        </button>{' '}
                        <p id="card-error" role="alert"></p>
                        {/* <p className="result-message hidden">
                        Payment succeeded, see the result in your
                        <a href="" target="_blank">
                          Stripe dashboard.
                        </a>{' '}
                        Refresh the page to pay again.
                      </p> */}
                      </div>
                    </form>
                  </div>
                </>
              ) : !order.isPaid &&
                (order.paymentMethod === 'PayPal or Credit Card' ||
                  order.paymentMethod === 'PayPal') ? (
                <>
                  {!order.isPaid && (
                    <li>
                      {isPending ? (
                        <center>
                          <OnlyLoading />
                        </center>
                      ) : (
                        <div>
                          <br />
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                      {loadingPay && (
                        <center>
                          <OnlyLoading></OnlyLoading>
                        </center>
                      )}
                    </li>
                  )}
                </>
              ) : !order.isPaid &&
                order.paymentMethod === 'Braintree Credit Card' ? (
                <>
                  {/* 
                  Braintree dropin Button
                  {clientToken && (
                    <div>
                      <DropIn
                        options={{ authorization: clientToken }}
                        onInstance={(instance) =>
                          setValues({ ...values, instance: instance })
                        }
                      />
                      <button
                        onClick={() => {
                          onPurchase();
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  )} */}
                </>
              ) : (
                ''
              )}
              {(userInfo.isAdmin || userInfo.isSeller) &&
                order.isPaid &&
                !order.isDelivered && (
                  <li>
                    {loadingDeliver && <OnlyLoading></OnlyLoading>}
                    <br />
                    <Tippy content="Confirm Order Delivery" placement="bottom">
                      <button
                        className="deliveryBTN"
                        type="button"
                        onClick={deliverOrderHandler}
                      >
                        {lang === 'EN' ? ' Deliver Order' : 'Szállítás most'}
                      </button>
                    </Tippy>
                  </li>
                )}
              {/* {!order.isPaid && !order.isDelivered && ( */}
              <li>
                <br />
                {parse(orderPaidMsg)}
              </li>
              {/* )} */}

              {/* )} */}
              <li>
                <div className="thisIsPaidBTN">
                  {order.isPaid &&
                    order.isDelivered &&
                    (lang === 'EN'
                      ? 'This order is already paid and delivered.'
                      : 'Ezt a rendelést már kifizették és kézbesítették.')}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
