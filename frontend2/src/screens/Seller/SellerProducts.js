import React, { useContext } from 'react';
import { FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './SellerProducts.css';
import Rating from '../../components/Rating/Rating';
import { Store } from '../../api/Store';
import axios from 'axios';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { useDispatch } from 'react-redux';
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

const ProductMainContSeller = styled.div`
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
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
  z-index: 35;
  object-fit: contain;
  overflow: hidden;
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

const SellerProducts = (props) => {
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
      window.alert(
        'Sorry. Product is out of stock. It cannot be added to the cart.'
      );
      return;
    }
    if (
      cart.cartItems.length > 0 &&
      data.seller._id !== cart.cartItems[0].seller._id
    ) {
      dispatch({
        type: 'CART_ADD_ITEM_FAIL',
        payload: alert(
          `You can only Buy from "${cart.cartItems[0].seller.seller.name}" Store at one time. You already have added one of "${cart.cartItems[0].seller.seller.name}" product into your cart. You cannot Buy from Multiple Sellers at the same time.`
        ),
      });
    } else {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, seller: data.seller, quantity },
      });
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      {Carterror && <MessageBox variant="danger">{Carterror}</MessageBox>}
      <ProductMainContSeller key={product._id}>
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
          {/* <Link to={`/product/${product._id}`}>
            <div className="product_rating">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
          </Link> */}
        </Info>

        <Link to={`/product/${product._id}`}>
          <div className="products1Seller">
            {/* <div className="products1-topSeller">top</div> */}
            <div className="products1-bodySeller">
              <div className="products1-body-leftSeller">
                <Image src={product.image} alt={product.name} />
              </div>
              <div className="products1-body-rightSeller">
                {' '}
                {product.price} HUF
              </div>
            </div>
            <div className="products1-bottomSeller">
              <div className="products1-bottom-leftSeller">
                {product.countInStock === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    {lang === 'EN' ? <>{product.name}</> : <>{product.name}</>}
                  </>
                )}
              </div>
              {/* <div className="products1-bottom-rightSeller">{product.price} HUF</div> */}
            </div>
            <div className="products1-bottom-RatingSeller">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>
          </div>
        </Link>
      </ProductMainContSeller>
      {/* <Container key={product._id}>
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
            </Link>
            <div className="product_title_price">
              <p>$ {product.price}</p>
            </div>
            <div className="product_title_price">
              <Link to={`/seller/${product.seller._id}`}> */}
      {/* {product.sellerName} */}
      {/* {product.seller.seller.name} */}
      {/* </Link>
            </div> */}
      {/* </Link> */}
      {/* </>
        )}
      </Container> */}
    </>
  );
};

export default SellerProducts;
