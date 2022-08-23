import {
  // legacy_createStore as createStore,
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { cartReducer } from './reducers/cartReducers';

import {
  StripeNeworderReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderPayReducerStripe,
  orderSummaryReducer,
} from './reducers/orderReducers';
import {
  // productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  // userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';
// import authReducer from './reducers/zain/AuthReducer';
import postReducer from './reducers/zain/PostReducer';

import {
  //   authReducer,
  //   userReducer,
  forgotPasswordReducer,
  Register_verifyReducer,
  //   allUsersReducer,
  //   userDetailsReducerv1,
} from './reducers_v1/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducerv1,
  forgotPassword: forgotPasswordReducer,
  Register_verify_Req: Register_verifyReducer,

  //
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  StripeNewOrder: StripeNeworderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderPayStripe: orderPayReducerStripe,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  // productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  // userAddressMap: userAddressMapReducer,
  orderSummary: orderSummaryReducer,
  // zainAuthReducer: authReducer,
  zainPostReducer: postReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
