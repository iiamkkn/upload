// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import CheckoutSteps from '../../components/Checkout/CheckoutSteps';

// import { Helmet } from 'react-helmet-async';

// // import LoadingBox from '../../components/LoadingBox/LoadingBox';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import { createOrder } from '../../actions/orderActions';
// import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
// import MessageBox from '../../components/LoadingBox/MessageBox';
// import OnlyLoading from '../../components/LoadingBox/OnlyLoading';

// export default function PlaceOrderScreen(props) {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   if (!cart.paymentMethod) {
//     navigate('/payment');
//   }
//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { loading, success, error, order } = orderCreate;
//   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   cart.itemsPrice = toPrice(
//     cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
//   );
//   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
//   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
//   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//   const dispatch = useDispatch();
//   const placeOrderHandler = () => {
//     dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
//   };
//   useEffect(() => {
//     if (success) {
//       navigate(`/order/${order._id}`);
//       dispatch({ type: ORDER_CREATE_RESET });
//     }
//   }, [dispatch, order, navigate, success]);

//   return (
//     <>
//       <Helmet>
//         <title>Preview Order</title>
//       </Helmet>
//       <Navbar />

// <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
// <div className="row top">
//   <div className="col-2">
//     <ul>
//       <li>
//         <div className="card card-body">
//           <h2>Shipping</h2>
//           <p>
//             <strong>Name &#x2192; </strong>{' '}
//             <span className="addressINFOColor">
//               {cart.shippingAddress.fullName}{' '}
//             </span>
//             <br /><br />
//             <strong>Address &#x2192; </strong>
//             <span className="addressINFOColor">
//               {cart.shippingAddress.address},{cart.shippingAddress.city},{' '}
//               {cart.shippingAddress.postalCode},
//               {cart.shippingAddress.country}{' '}
//             </span>
//           </p>
//         </div>
//       </li>
//       <li>
//         <div className="card card-body">
//           <h2>Payment</h2>
//           <p>
//             <strong>Method &#x2192; </strong>
//             <span className="addressINFOColor">{cart.paymentMethod}</span>
//           </p>
//         </div>
//       </li>
//       <li>
//         <div className="card card-body">
//           <h2>Order Items</h2>
//           <ul>
//             {cart.cartItems.map((item) => (
//               <li key={item.product}>
//                 <div className="row placeOrder_row">
//                   <div>
//                     <Link
//                       className="orderLink"
//                       to={`/product/${item._id}`}
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="small"
//                       ></img>
//                     </Link>
//                   </div>
//                   <div className="min-30">
//                     <Link
//                       className="orderLink"
//                       to={`/product/${item._id}`}
//                     >
//                       {item.name}
//                     </Link>
//                   </div>

//                   <div>
//                     <strong>
//                       {item.quantity} x ${item.price} = $
//                       {item.quantity * item.price}
//                     </strong>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </li>
//     </ul>
//   </div>
//   <div className="col-1">
//     <div className="card card-body">
//       <ul>
//         <li>
//           <h2 className="h1ColorClass">Order Summary</h2>
//         </li>
//         <li>
//           <div className="row ">
//             <div className="order_summary_info">Total items Price</div>
//             <div>${cart.itemsPrice.toFixed(2)}</div>
//           </div>
//         </li>
//         <li>
//           <div className="row">
//             <div className="order_summary_info">Shipping Fee</div>
//             <div>${cart.shippingPrice.toFixed(2)}</div>
//           </div>
//         </li>
//         <li>
//           <div className="row">
//             <div className="order_summary_info">Tax</div>
//             <div>${cart.taxPrice.toFixed(2)}</div>
//           </div>
//         </li>
//         <li>
//           <div className="row">
//             <div>
//               <strong> Total amount</strong>
//             </div>
//             <div>
//               <strong>${cart.totalPrice.toFixed(2)}</strong>
//             </div>
//           </div>
//         </li>
//         <li>
//           <button
//             type="button"
//             onClick={placeOrderHandler}
//             className="primary-block primary block"
//             disabled={cart.cartItems.length === 0 || loading}
//           >
//             Contine
//             <i className="bx bx-right-arrow-alt"></i>
//           </button>
//         </li>
//         {loading && <OnlyLoading></OnlyLoading>}
//         {error && <MessageBox variant="danger">{error}</MessageBox>}
//       </ul>
//     </div>
//   </div>
// </div>

//       <Footer />
//     </>
//   );
// }
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import MessageBox from '../../components/LoadingBox/MessageBox';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';

import { Store } from '../../api/Store';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps.js';

import { getError } from '../../utils';
import Axios from 'axios';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { AxiosInstance } from '../../api/AxiosInstance';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
  });

  const { cartState, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = cartState;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const cart = useSelector((state) => state.cart);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const FixsellerNumOrder = 1;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await AxiosInstance.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          sellerNumOrder: FixsellerNumOrder,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      alert(getError(err));
    }
  };

  useEffect(() => {
    // if (cart.cartItems.length === 0) {
    //   navigate('/cart');
    // }
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
    if (!userInfo) {
      navigate('/signin?redirect=/placeorder');
    }
  }, [userInfo, cart, navigate]);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Helmet>
        <title>
          {lang === 'EN' ? 'Preview Order' : 'Megrendelés előnézete'}
        </title>
      </Helmet>
      <Navbar />

      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="order_place_screen_mob_on">
        {cart.cartItems.length === 0 ? (
          <>
            <br />
            <div className="no_order_to_be_placed_DIV">
              <h1>
                {lang === 'EN'
                  ? 'You have no products to place the order.'
                  : 'Nincsenek termékei a rendelés leadásához.'}
              </h1>
              <p>
                {lang === 'EN'
                  ? 'Your cart is empty. Please'
                  : 'Az Ön kosara üres. Kérem'}
                <Link to="/">
                  {lang === 'EN' ? ' Do Shopping' : ' Vásárolni '}
                </Link>
                {lang === 'EN'
                  ? '  and add products to the cart to checkout.'
                  : 'és tegye a termékeket a kosárba a fizetéshez.'}
              </p>
            </div>
            <br />
          </>
        ) : (
          <>
            <h1 className="checkOrder_details_Be4Pay">
              {lang === 'EN'
                ? 'Check Order Details Before Payment'
                : 'Fizetés előtt ellenőrizze a rendelés részleteit'}
            </h1>

            <div className="row top">
              <div className="col-2">
                <ul>
                  <li>
                    <div className="card card-body">
                      <h2>{lang === 'EN' ? 'Shipping' : 'Szállítás'}</h2>
                      <p>
                        <strong>
                          {lang === 'EN' ? 'Name' : 'Név'} &#x2192;{' '}
                        </strong>{' '}
                        <span className="addressINFOColor">
                          {cart.shippingAddress.fullName}{' '}
                        </span>
                        <br />
                        <br />
                        <strong>
                          {lang === 'EN' ? 'Address' : 'Cím'} &#x2192;{' '}
                        </strong>
                        <span className="addressINFOColor">
                          {cart.shippingAddress.address},
                          {cart.shippingAddress.city},{' '}
                          {cart.shippingAddress.postalCode},
                          {cart.shippingAddress.country}{' '}
                        </span>
                      </p>
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
                          {cart.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="card card-body">
                      <h2>
                        {lang === 'EN' ? 'Order Items' : 'Tételek rendelése'}
                      </h2>
                      <ul>
                        {cart.cartItems.map((item) => (
                          <li key={item.product}>
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
                                  ></img>
                                </Link>
                              </div>
                              <div className="min-30">
                                <Link
                                  className="orderLink"
                                  to={`/product/${item._id}`}
                                >
                                  {lang === 'EN' ? (
                                    <>{item.name}</>
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
                <div className="card card-body">
                  <ul>
                    <li>
                      <h2 className="h1ColorClass">
                        {lang === 'EN'
                          ? 'Order Summary'
                          : 'Megrendelés-összesítő'}
                      </h2>
                    </li>
                    <li>
                      <div className="row">
                        <div className="order_summary_info">
                          {lang === 'EN'
                            ? 'Total items Price'
                            : 'Összes tétel Ár'}
                        </div>
                        <div>{cart.itemsPrice.toFixed(2)} HUF</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="order_summary_info">
                          {lang === 'EN'
                            ? 'Shipping Fee'
                            : 'Szállítási költség'}
                        </div>
                        <div>{cart.shippingPrice.toFixed(2)} HUF</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="order_summary_info">
                          {lang === 'EN' ? 'Tax Fee' : 'Adódíj'}
                        </div>
                        <div>{cart.taxPrice.toFixed(2)} HUF</div>
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
                          <strong>{cart.totalPrice.toFixed(2)} HUF</strong>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={placeOrderHandler}
                        className="primary-block primary block"
                        disabled={cart.cartItems.length === 0 || loading}
                      >
                        {lang === 'EN' ? (
                          <>loading? 'Loading...' : 'Continue'</>
                        ) : (
                          <>loading? 'Loading...' : 'Folytatni'</>
                        )}
                        <i className="bx bx-right-arrow-alt"></i>
                      </button>
                    </li>
                    {loading && (
                      <center>
                        <OnlyLoading></OnlyLoading>
                      </center>
                    )}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Mobile info */}
      <div className="order_place_screen_mob_view">
        <h1 className="checkOrder_details_Be4Pay">
          {lang === 'EN' ? 'Confirm Details' : 'Erősítse meg a részleteket'}
        </h1>
        <div>
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>{lang === 'EN' ? 'Shipping' : 'Szállítás'}</h2>
                  <p style={{ lineHeight: '2rem' }}>
                    <strong>{lang === 'EN' ? 'Name' : 'Név'} &#x2192; </strong>{' '}
                    <span className="addressINFOColor">
                      {cart.shippingAddress.fullName}{' '}
                    </span>
                    <br />
                    <strong>
                      {lang === 'EN' ? 'Address' : 'Cím'} &#x2192;{' '}
                    </strong>
                    <span className="addressINFOColor">
                      {cart.shippingAddress.address},{cart.shippingAddress.city}
                      , {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}{' '}
                    </span>
                  </p>
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
                      {cart.paymentMethod}
                    </span>
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>{lang === 'EN' ? 'Order Items' : 'Tételek rendelése'}</h2>
                  <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.product}>
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
                              ></img>
                            </Link>
                          </div>
                          <div className="min-30">
                            <Link
                              className="orderLink"
                              to={`/product/${item._id}`}
                            >
                              {lang === 'EN' ? (
                                <>{item.name}</>
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
        </div>
        <div>
          <div className="card card-body-mob">
            <ul style={{ padding: '6px' }}>
              <li>
                <h2 className="h1ColorClass">
                  {' '}
                  {lang === 'EN' ? 'Order Summary' : 'Megrendelés-összesítő'}
                </h2>
              </li>
              <li>
                <div className="row ">
                  <div className="order_summary_info">
                    {lang === 'EN' ? 'Total items Price' : 'Összes tétel Ár'}
                  </div>
                  <div>{cart.itemsPrice.toFixed(2)} HUF</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="order_summary_info">
                    {lang === 'EN' ? 'Shipping Fee' : 'Szállítási költség'}
                  </div>
                  <div>{cart.shippingPrice.toFixed(2)} HUF</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="order_summary_info">
                    {' '}
                    {lang === 'EN' ? 'Tax Fee' : 'Adódíj'}
                  </div>
                  <div>{cart.taxPrice.toFixed(2)} HUF</div>
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
                    <strong>{cart.totalPrice.toFixed(2)} HUF</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary-block primary block"
                  disabled={cart.cartItems.length === 0 || loading}
                >
                  {lang === 'EN' ? 'Continue' : 'Folytatni'}
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </li>

              {loading && (
                <center>
                  <OnlyLoading></OnlyLoading>
                </center>
              )}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}
