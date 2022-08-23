import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from './store';
// import store from './store/ReduxStore';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'font-awesome/css/font-awesome.min.css';

////
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { StoreProvider } from './api/Store';
import { WishListProvider } from './Wish';
// import { positions, transitions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
// const options = {
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: '30px',
//   transition: transitions.SCALE,
// };

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WishListProvider>
        <StoreProvider>
          <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
              {/* <AlertProvider template={AlertTemplate} {...options}> */}
              <App />
              {/* </AlertProvider> */}
            </PayPalScriptProvider>
          </HelmetProvider>
        </StoreProvider>
      </WishListProvider>
    </Provider>
  </React.StrictMode>
);
