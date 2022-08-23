import React, { useContext } from 'react';
import { FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../FeaturedProducts/FeaturedProducts.css';
import Rating from '../Rating/Rating';
import { Store } from '../../api/Store';
import { WishList } from '../../Wish';
import axios from 'axios';
import MessageBox from '../LoadingBox/MessageBox';
import { useDispatch } from 'react-redux';
import { mobile } from '../../ResponsiveDesign/responsive';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosInstance } from '../../api/AxiosInstance';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: context-menu;
`;

const ProductMainCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin: 5px;
  margin-bottom: 12px;
  margin-right: 12px;
  /* width: 100%; */
  /* height: 300px; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background-color: #f5fbfd; */
  position: relative;
  box-shadow: 5px 5px 5px rgb(220 220 220), -5px -5px 5px rgb(255 255 255);
  border: 0.5px solid #ededed;
  & a {
    text-decoration: none;
    color: inherit;
  }
  &:hover ${Info} {
    opacity: 1;
    transition: all 0.5s ease;
  }

  ${mobile({
    marginTop: '20px',
    marginBottom: '0px',
  })}
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  box-shadow: 10px 10px 10px rgb(220 220 220), -5px -5px 10px rgb(255 255 255);
  border: 0.5px solid #ededed;
  &:hover ${Info} {
    opacity: 1;
    transition: all 0.5s ease;
  }
`;

const Circle = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 25%;
  display: none;
`;

const Image = styled.img`
  /* min-width: 200px;
  height: 200px; */
  z-index: 6;
  object-fit: contain;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
  flex: 9;
  object-fit: cover;
  /* margin: 25px; */
  /* position: relative; */
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-left: 80%;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = (props) => {
  const { product } = props;

  const dispatch = useDispatch();

  // cart handler
  const { cartState, dispatch: ctxDispatch } = useContext(Store);
  const { cart, Carterror } = cartState;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await AxiosInstance.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      if (lang === 'EN') {
        toast.info(
          'Sorry. Product reaches its limit of stock. We do not have more stocks availabe.'
        );
      } else if (lang === 'HU') {
        toast.info(
          'Sajnálom. A termék elérte a készlet erejét. Több készletünk nincs.'
        );
      }

      // return;
    }
    if (
      cart.cartItems.length > 0 &&
      data.seller._id !== cart.cartItems[0].seller._id
    ) {
      dispatch({
        type: 'CART_ADD_ITEM_FAIL',
        payload: toast.warn(
          // `You can only Buy from "${cart.cartItems[0].seller.seller.name}" Store at one time. You already have added one of "${cart.cartItems[0].seller.seller.name}" product into your cart. You cannot Buy from Multiple Sellers at the same time.`
          `Egyszerre csak EGY ÜZLETBŐL VÁSÁROLHATSZ. \n\n\n  —— You can ONLY Buy from ONE Store at the same time`
        ),
      });
    } else {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, seller: data.seller, quantity },
      });
    }
  };

  const OutOfStockMsg = function () {
    if (lang === 'EN') {
      toast.warn('This Product is out of stock', {
        theme: 'dark',
      });
    } else if (lang === 'HU') {
      toast.warn('Ez a termék elfogyott', {
        theme: 'dark',
      });
    }

    return;
  };

  // wishlist handler
  const { wstate, dispatch: wishctxDispatch } = useContext(WishList);
  const { wishlist } = wstate;
  const addToWishListtHandler = async () => {
    const existWishLishItem = wishlist.wishistItem.find(
      (x) => x._id === product._id
    );
    const quantity = existWishLishItem ? existWishLishItem.quantity + 0 : 1;
    const { data } = await AxiosInstance.get(`/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert(
    //     'Sorry. Product is not availabe at the moment. It cannot be added to your wishlist.'
    //   );
    //   return;
    // }
    wishctxDispatch({
      type: 'ADD_TO_WISHLIST',
      payload: { ...product, quantity },
    });
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      {Carterror && <MessageBox variant="danger">{Carterror}</MessageBox>}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ProductMainCont key={product._id}>
        <Info>
          <Icon>
            {product.countInStock === 0 ? (
              <RemoveShoppingCartOutlinedIcon
                onClick={OutOfStockMsg}
              ></RemoveShoppingCartOutlinedIcon>
            ) : (
              <AddShoppingCartOutlinedIcon onClick={addToCartHandler} />
            )}
          </Icon>
          <Icon>
            <Link to={`/product/${product._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            {product.countInStock === 0 ? (
              <HeartBrokenOutlinedIcon
                onClick={OutOfStockMsg}
              ></HeartBrokenOutlinedIcon>
            ) : (
              <FavoriteBorderOutlined onClick={addToWishListtHandler} />
            )}
          </Icon>
          {/* <Link to={`/product/${product._id}`}>
            <div className="product_rating">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
          </Link> */}
        </Info>

        <Link to={`/product/${product._id}`}>
          <div className="products1">
            {/* <div className="products1-top">top</div> */}
            <div className="products1-body">
              <div className="products1-body-left">
                <Image src={product.image} alt={product.name} />
              </div>
              <div className="products1-body-right"> {product.price} HUF</div>
            </div>
            <div className="products1-bottom">
              <div className="products1-bottom-left">
                {product.countInStock === 0 ? (
                  <>{lang === 'EN' ? 'Out of Stock' : 'Nincs raktáron'}</>
                ) : (
                  <>{lang === 'EN' ? product.name : product.name}</>
                )}
              </div>
              {/* <div className="products1-bottom-right">{product.price} HUF</div> */}
            </div>
            <div className="products1-bottom-Rating">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
          </div>
        </Link>
      </ProductMainCont>
      {/*<Container key={product._id}>
        <Link to={`/product/${product._id}`}>
          <div>
            <Circle />
            <Image src={product.image} alt={product.name} />
          </div>
        </Link>

        <Info>
          <Icon>
            {product.countInStock === 0 ? (
              <RemoveShoppingCartOutlinedIcon></RemoveShoppingCartOutlinedIcon>
            ) : (
              <AddShoppingCartOutlinedIcon onClick={addToCartHandler} />
            )}
          </Icon>
          <Icon>
            <Link to={`/product/${product._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            {product.countInStock === 0 ? (
              <HeartBrokenOutlinedIcon></HeartBrokenOutlinedIcon>
            ) : (
              <FavoriteBorderOutlined />
            )}
          </Icon>
          <Link to={`/product/${product._id}`}>
            <div className="product_rating">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
          </Link>
        </Info>
        {product.countInStock === 0 ? (
          <div className="product_title">
            <p style={{ cursor: 'context-menu' }}>Out of Stock</p>
          </div>
        ) : (
          <>
            <Link to={`/product/${product._id}`}>
              <div className="product_title">
                <p>{product.name}</p>
              </div>
            
              <div className="product_title_price">
                <p> {product.price} HUF</p>
              </div> */}
      {/*  <div className="product_title_price">
              <Link to={`/seller/${product.seller._id}`}>
               
                 {product.seller.seller.name} 
              </Link>
            </div>*/}
      {/* </Link>
          </>
        )}
      </Container> */}
    </>
  );
};

export default Product;
