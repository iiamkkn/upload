import Home from './components/Home/Home';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Missing from './components/Missing/Missing';
import HomeScreenProducts from './screens/others/HomeScreenProducts';
import SingleProductScreen from './screens/others/SingleProductScreen';
import CartScreen from './screens/others/CartScreen';
import SigninScreen from './screens/Auth/SigninScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ShippingAddressScreen from './screens/others/ShippingAddressScreen';
import PaymentMethodScreen from './screens/others/PaymentMethodScreen';
import PlaceOrderScreen from './screens/others/PlaceOrderScreen';
import OrderScreen from './screens/others/OrderScreen';
import ProfileScreen from './screens/User/ProfileScreen';
import OrderHistoryScreen from './screens/User/OrderHistoryScreen';
import UserRoute from './ProtectedRoutes/UserRoute/UserRoute';
import AdminRoute from './ProtectedRoutes/AdminRoute/AdminRoute';
import SellerRoute from './ProtectedRoutes/SellerRoute/SellerRoute';
import ProductListScreen from './screens/Admin/ProductListScreen';
import ProductEditScreen from './screens/Admin/ProductEditScreen';
import UserListScreen from './screens/Admin/UserListScreen';
import UserEditScreen from './screens/Admin/UserEditScreen';
import SellerScreen from './screens/Seller/SellerScreen';
import OrderListScreenAdmin from './screens/Admin/OrderListScreenAdmin';
import OrderListScreenSeller from './screens/Admin/OrderListScreenSeller';
import SearchScreen from './screens/others/SearchScreen';
import DashboardScreen from './screens/Admin/DashboardScreen';
import SupportScreen from './screens/Support/SupportScreen';
import { useSelector } from 'react-redux';
import ChatBox from './components/ChatBox/ChatBox';
import { Braintree } from './screens/others/Braintree';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import SearchScreen from './screens/others/SearchScreen';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaySuccess } from './components/PaySuccess/PaySuccess';
import SigninScreenv1 from './screens/Auth/SigninScreenv1';
import RegisterScreenv1 from './screens/Auth/RegisterScreenv1';
// import store from './store';
import 'react-toastify/dist/ReactToastify.css';

// import { loadUser } from './actions_v1/userActions';
import ForgotPasswordPage from './screens/Auth/ForgotPasswordPage';
import NewPasswordPage from './screens/Auth/NewPasswordPage';
import RegisterVerify from './screens/Auth/RegisterVerify';
import VerifyAccount from './screens/Auth/VerifyAccount';
import Signup from './components/Singup';
import EmailVerify from './components/EmailVerify/EmailVerify';
import StoreFeeds from './screens/Seller/StoreFeeds';
import WishListScreen from './screens/others/WishListScreen';
import SellerJoin from './screens/Auth/Seller_join';
import SetSellerProfile from './screens/User/SetSellerProfile';
import UserForgetPass from './components/NewsLetter/userForgetPass';
import UserForgetPassUpdate from './components/NewsLetter/userForgetPassUpdate';
import SellerVerification from './screens/User/sellerVerification';
import { AxiosInstance } from './api/AxiosInstance';
// const stripePromise = loadStripe(
//   'pk_test_51LAKsWKyhm9yNLzHjKmiF9PQrUyVL1KwWeYduq27qKnnISsbBvpIoxCxtN9tGmdeM5fKQB7qXYtelTp93FzUoyE400VC1mA9wV'
// );
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
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  var hours = 24; // want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('emit');
  if (setupTime == null) {
    localStorage.setItem('emit', now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      // localStorage.removeItem('userInfo');
      localStorage.setItem('emit', now);
      // localStorage.setItem('userInfo', now);
    }
  }

  const [stripeapiKey, setstripeapiKey] = useState('');

  useEffect(() => {
    // store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await AxiosInstance.get('/api/cc/payment/process/pay');
      // console.log(data.stripeApiKey);
      setstripeapiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* catch all */}
        <Route path="*" element={<Missing />}></Route>

        <Route exact path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/index" element={<Home />}></Route>

        <Route path="/products" element={<HomeScreenProducts />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/wishlist" element={<WishListScreen />}></Route>
        <Route path="/product/:id" element={<SingleProductScreen />}></Route>

        <Route path="/product/:id/edit" element={<ProductEditScreen />}></Route>

        <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/pay_successful" element={<PaySuccess />}></Route>

        {/* Auth routes */}
        <Route path="/signin" element={<SigninScreen />}></Route>
        <Route path="/login" element={<SigninScreen />}></Route>
        {/* <Route path="/signinv1" element={<SigninScreenv1 />}></Route> */}
        {/* <Route path="/registerv1" element={<RegisterScreenv1 />}></Route> */}
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/signup" element={<RegisterScreen />}></Route>

        <Route path="/seller" element={<SellerJoin />}></Route>
        <Route path="/settings" exact element={<SetSellerProfile />}></Route>
        <Route
          path="/store/verification"
          exact
          element={<SellerVerification />}
        ></Route>

        {/* <Route path="/registerverify" element={<RegisterVerify />}></Route> */}

        {/* <Route path="/SignUpNew" element={<Signup />}></Route> */}
        <Route path="/PasswordReset" element={<UserForgetPass />}></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<UserForgetPassUpdate />}
        ></Route>
        {/* <Route
          exact
          path="/users/:id/verify/:token"
          element={<EmailVerify />}
        ></Route> */}
        {/* <Route
          path="/authentication/activate/:token"
          element={<VerifyAccount />}
        ></Route> */}

        {/* <Route path="/forget/password" element={<ForgotPasswordPage />}></Route> */}
        {/* <Route
          exact
          path="/password/reset/:token"
          element={<NewPasswordPage />}
        ></Route> */}

        <Route
          exact
          path="/order/:id"
          element={
            stripeapiKey && (
              <Elements stripe={loadStripe(stripeapiKey)} options={options}>
                <OrderScreen />
              </Elements>
            )
          }
        ></Route>

        <Route path="/braintree" element={<Braintree />}></Route>
        {/* <Route path="/search/name/:name?" element={<SearchScreen />}></Route> 
        // redux version  */}
        <Route path="/search" element={<SearchScreen />}></Route>

        {/* User routes  */}
        <Route
          path="/profile"
          element={
            <UserRoute>
              <ProfileScreen />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/feeds"
          element={
            <UserRoute>
              <StoreFeeds />
            </UserRoute>
          }
        ></Route>

        <Route
          path="/orderhistory"
          element={
            <UserRoute>
              <OrderHistoryScreen />
            </UserRoute>
          }
        ></Route>

        {/* ends here */}

        {/* admin routes  */}

        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/admin/productlist"
          element={
            <AdminRoute>
              <ProductListScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orderlist"
          element={
            <AdminRoute>
              <OrderListScreenAdmin />
            </AdminRoute>
          }
          exact
        ></Route>

        <Route
          exact
          path="/admin/userslist"
          element={
            <AdminRoute>
              <UserListScreen />
            </AdminRoute>
          }
        ></Route>

        <Route
          exact
          path="/user/:id/edit"
          element={
            <AdminRoute>
              <UserEditScreen />
            </AdminRoute>
          }
        ></Route>

        <Route
          path="/admin/support"
          element={
            <AdminRoute>
              <SupportScreen />
            </AdminRoute>
          }
        ></Route>

        {/* ends here */}

        {/* seller route starts here */}

        <Route
          path="/productlist/seller"
          element={
            <SellerRoute>
              <ProductListScreen />
            </SellerRoute>
          }
        ></Route>
        <Route
          path="/orderlist/seller"
          element={
            <SellerRoute>
              <OrderListScreenSeller />
            </SellerRoute>
          }
        ></Route>

        <Route
          path="/seller/:id"
          element={
            // <SellerRoute>
            <SellerScreen />
            // </SellerRoute>
          }
        ></Route>

        {/* ends here */}
      </Routes>

      <footer className="row center">
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        {/* <div>Zalazon. — All right reserved</div>{' '} */}
      </footer>
    </BrowserRouter>
  );
}

export default App;
