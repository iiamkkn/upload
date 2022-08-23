import { createContext, useReducer } from 'react';

export const WishList = createContext();

const initialState = {
  wishlist: {
    wishistItem: localStorage.getItem('wishistItem')
      ? JSON.parse(localStorage.getItem('wishistItem'))
      : [],
  },
};
function reducer(wstate, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      //// add to wishlist
      const newWishListItem = action.payload;
      const existWishLishItem = wstate.wishlist.wishistItem.find(
        (item) => item._id === newWishListItem._id
      );
      const wishistItem = existWishLishItem
        ? wstate.wishlist.wishistItem.map((item) =>
            item._id === existWishLishItem._id ? newWishListItem : item
          )
        : [...wstate.wishlist.wishistItem, newWishListItem];
      localStorage.setItem('wishistItem', JSON.stringify(wishistItem));
      return { ...wstate, wishlist: { ...wstate.wishlist, wishistItem } };
    case 'WISHLIST_REMOVE_ITEM': {
      const wishistItem = wstate.wishlist.wishistItem.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('wishistItem', JSON.stringify(wishistItem));
      return { ...wstate, wishlist: { ...wstate.wishlist, wishistItem } };
    }
    default:
      return wstate;

    //   return {
    //     ...wstate,
    //     wishlist: {
    //       ...wstate.wishlist,
    //       wishistItem: [...wstate.wishlist.wishistItem, action.payload],
    //     },
    //   };
    // default:
    //   return wstate;
  }
}

export function WishListProvider(props) {
  const [wstate, dispatch] = useReducer(reducer, initialState);
  const value = { wstate, dispatch };
  return <WishList.Provider value={value}>{props.children} </WishList.Provider>;
}
