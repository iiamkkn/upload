import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  fullBox: false,

  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : { location: {} },

    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',

    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
function reducer(cartState, action) {
  switch (action.type) {
    // for choosing address on maps
    case 'SET_FULLBOX_ON':
      return { ...cartState, fullBox: true };
    case 'SET_FULLBOX_OFF':
      return { ...cartState, fullBox: false };

    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = cartState.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? cartState.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...cartState.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...cartState, cart: { ...cartState.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = cartState.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...cartState, cart: { ...cartState.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...cartState, cart: { ...cartState.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...cartState, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...cartState,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...cartState,
        cart: {
          ...cartState.cart,
          shippingAddress: action.payload,
        },
      };

    case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
      return {
        ...cartState,
        cart: {
          ...cartState.cart,
          shippingAddress: {
            ...cartState.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...cartState,
        cart: { ...cartState.cart, paymentMethod: action.payload },
      };
    default:
      return cartState;
  }
}

export function StoreProvider(props) {
  const [cartState, dispatch] = useReducer(reducer, initialState);
  const value = { cartState, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
