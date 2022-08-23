import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import NewsLetter from '../../components/NewsLetter/NewsLetter';
import styled from 'styled-components';
import Rating from '../../components/Rating/Rating';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Helmet } from 'react-helmet-async';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { ErrorLoading } from '../../components/LoadingBox/ErrorLoading';
import { createReview, detailsProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../api/Store';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageBox from '../../components/LoadingBox/MessageBox';
import '../CSS/SingleProduct.css';
import '../CSS/ProductScreen.css';
import { ToastContainer, toast } from 'react-toastify';
import { PRODUCT_REVIEW_CREATE_RESET } from '../../constants/productConstants';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';
import { format } from 'timeago.js';
import { WishList } from '../../Wish';
import 'tippy.js/dist/tippy.css';
import '../CSS/ProductListScreen.css';
import { AxiosInstance } from '../../api/AxiosInstance';
//

//

//

//

//

// Mobile starts

const ImgContainerMob = styled.div`
  display: none;
  ${Mscreen({
    display: 'block',
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    placeContent: 'center',
    padding: '0px',
    margin: 'auto',
    marginTop: '-0.7rem',
  })}

  ${mobile({
    display: 'block',
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
    placeContent: 'center',
    padding: '0px',
    margin: 'auto',
    marginTop: '0rem',
  })}
`;

const ImageMob = styled.img`
  display: none;
  ${mobile({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  })}
  ${Mscreen({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  })}
`;
const RightBigImageMob = styled.div`
  display: none;

  ${Mscreen({ display: 'block' })}
  ${mobile({ display: 'block' })}
`;

const TitleMob = styled.h1`
  display: 'none';
  ${Mscreen({
    display: 'flex',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    padding: '1rem 1rem',
    background: '#f9f9f9',
    width: '97%',
    placeContent: 'center',
    margin: 'auto',
    border: '1px solid #f5f5f5',
    borderRadius: '3px',
    marginTop: '1rem',
  })}
  ${mobile({
    display: 'flex',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    padding: '1rem 1rem',
    background: '#f9f9f9',
    width: '97%',
    placeContent: 'center',
    margin: 'auto',
    border: '1px solid #f5f5f5',
    borderRadius: '3px',
    marginTop: '1rem',
  })}
`;

const PriceMob = styled.div`
  font-size: 1.7rem;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  right: 2rem;
  padding: 1rem 0.5rem;
  margin-right: 50px;
  flex: 1;
  border: none;
`;

const AvailabeMob = styled.button`
  border: none;
  background-color: #0cdb30;
  box-shadow: 0px 2px 2px #007623, 0px 0px 0px #2dd55f;
  color: #fff;
  padding: 3px 12px;
  font-weight: 400;
  font-size: 12px;
  cursor: context-menu;
  margin-top: 10px;
  margin-left: 8px;
  border-radius: 4px;
  &:hover {
    border: 0;
  }
`;
const UnAvailabeMob = styled.button`
  border: none;
  box-shadow: 0px 2px 2px #8f1313, 0px 0px 0px #8f1313;
  background-color: #ed1212;
  color: #fff;
  padding: 3px 12px;
  font-weight: 400;
  font-size: 12px;
  cursor: context-menu;
  margin-left: 8px;
  margin-top: 10px;
  border-radius: 4px;
  /* margin-left: 20px; */
  &:hover {
    border: 0;
  }
`;

const BuyNowMob = styled.button`
  border: none;
  box-shadow: 1px 1px 2pxrgb (220 220 220), -2px -2px 5pxrgb (240 240 220);
  background-color: #009595;
  border-radius: 3px;
  border-bottom: 2px solid teal;
  color: #fff;
  padding: 12px 18px;
  font-size: 18px;
  width: 97%;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  &:hover {
    background-color: #028383;
    border-bottom: 2px solid #045e5e;
    /* box-shadow: 1px 1px 1px rgb(94 94 94), -2px -2px 5px rgb(240 240 220); */
  }
`;

// Mobile ends

//

//

//
const SingleProductContainer = styled.div`
  display: flex;
  padding: 30px;

  ${Mscreen({ padding: '50px 0px' })}
  ${mobile({ padding: '50px 0px' })}
`;

const RightContainer = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  padding: 10px;
  border: none;
  box-shadow: 0px 2px 5px rgb(220 220 220), 0px 0px 0px rgb(220 220 220);
  ${Mscreen({ display: 'none' })}
  ${mobile({ display: 'none' })} /* flex-direction: column;
  display: flex;
  padding: 10px;
  border: none;
  width: 45vw;
  height: 80vh;
  justify-content: center;
  align-items: center;
  place-content: center;
  box-shadow: 0px 2px 5px rgb(220 220 220), 0px 0px 0px rgb(220 220 220); */
`;

const ImgContainer = styled.div`
  flex: 1;
  width: 45vw;
  height: 80vh;
  justify-content: center;
  align-items: center;
  place-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 10px;
  box-shadow: 2px 2px 5px rgb(220 220 220), 0px 0px 0px rgb(220 220 220);
  border: none;
  ${Mscreen({ display: 'none' })}
  ${mobile({ display: 'none' })}
`;

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  display: flex;
  /* flex-grow: 1; */
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding: 1rem 1rem;
  border-bottom: 0.5px solid #efeded;
`;

const PriceContainer = styled.div`
  display: flex;
  padding: 1rem 0.5rem;
`;

const Price = styled.div`
  font-size: 1.7rem;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  right: 2rem;
  padding: 1rem 0.5rem;
  border-bottom: 0.5px solid #efeded;
  margin-right: 50px;
  flex: 1;
`;

const Availabe = styled.button`
  /* border: 0.5px solid #0ac96c; */
  border: none;
  background-color: #0cdb30; /* 34cb4e */
  box-shadow: 0px 2px 2px #007623, 0px 0px 0px #2dd55f;
  color: #fff;
  padding: 5px 15px;
  font-weight: 400;
  font-size: 1rem;
  cursor: context-menu;
  margin-top: 40px;
  margin-left: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  &:hover {
    border: 0;
  }
`;
const UnAvailabe = styled.button`
  border: none;
  box-shadow: 0px 2px 2px #8f1313, 0px 0px 0px #8f1313;
  background-color: #ed1212;
  color: #fff;
  padding: 5px 15px;
  font-weight: 400;
  font-size: 1.7rem;
  cursor: context-menu;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 4px;
  /* margin-left: 20px; */
  &:hover {
    border: 0;
  }
`;

const Ratting = styled.div`
  border-bottom: 0.5px solid #efeded;
  display: flex;
  flex: 1;
  padding: 1rem 1.3rem;
`;
const Description = styled.p`
  font-size: 1rem;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  right: 2rem;
  color: rgb(94 94 94);
  padding: 1rem 1.3rem;
  border-bottom: 0.5px solid #efeded;
  word-wrap: break-word;
`;
const Add2CardDIV = styled.div`
  border-bottom: 0.5px solid #efeded;
  display: flex;
  padding: 0rem 1.2rem;
`;

const Add2Cart = styled.button`
  /* border: 0.5px solid #ffeeff; */
  border: none;
  box-shadow: 1px 1px 2px rgb(220 220 220), -2px -2px 5px rgb(240 240 220);
  background-color: #fff;
  border-radius: 0.5rem;
  color: #000;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #eee;
    box-shadow: 1px 1px 1px rgb(94 94 94), -2px -2px 5px rgb(240 240 220);
  }
`;

const BuyNowAdd2Cart = styled.div`
  border: none;

  box-shadow: 2px 2px 0px #008080, 0px 0px 0px #008080;
  background-color: #009595;
  border-radius: 0.5rem;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #037a7a; /* 009999*/
    box-shadow: 2px 2px 0px #009999, 0px 0px 0px #009999;
  }
`;
const BuyNow = styled.div`
  display: flex;
  gap: 0.7em;
  font-size: 14px;
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const RightBigImage = styled.div`
  display: flex;
  flex: 9;
`;

const LeftSliderImages = styled.div`
  display: flex;
  flex: 1;
`;

const ColorsAlignment_mob = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-left: 14px;
  ${Mscreen({ gap: '10px', marginLeft: '2px' })}
  ${mobile({ gap: '10px', marginLeft: '2px' })}
`;
const ColorMSG = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  color: ${(props) => props.color};
  margin-left: 22px;
  margin-top: 4px;
  ${Mscreen({ marginLeft: '10px' })}
  ${mobile({ marginLeft: '10px' })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 2px solid #${(props) => props.color};
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
  &:active {
    border: 2px solid #000;
  }
`;

const FilterSize = styled.select`
  /* margin-left: 10px; */
  padding: 3px 8px;
  border: 1px solid #ddd;
  text-align: center;
  &:hover {
    background-color: #fff;
    padding: 3px 8px;
    border: 1px solid #000;
    text-align: center;
  }
`;

const FilterSizeOption = styled.option``;

const SingleProductScreen = (props) => {
  let reviewsRef = useRef();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  // old Cart Store from useCOntext
  const { cartState, dispatch: ctxDispatch } = useContext(Store);
  const { cart, Carterror } = cartState;

  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  // review handler

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  useEffect(() => {
    if (successReviewCreate) {
      // window.alert('Review Submitted Successfully');
      if (lang === 'EN') {
        toast.success('Review Submitted Successfully', {
          theme: 'dark',
        });
      }
      if (lang === 'HU') {
        toast.success('Az értékelés sikeresen elküldve', {
          theme: 'dark',
        });
      }
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  // review submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      if (lang === 'EN') {
        toast.warn('Please enter comment and rating', {
          theme: 'dark',
        });
      }
      if (lang === 'HU') {
        toast.warn('Kérjük, írja be megjegyzését és értékelését', {
          theme: 'dark',
        });
      }
      // alert('Please enter comment and rating');
    }
  };

  // cart handler

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === productId);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await AxiosInstance.get(`/api/products/${productId}`);
    if (data.countInStock < quantity) {
      if (lang === 'EN') {
        toast.info(
          'Sorry. Product reaches its limit of stock. We do not have more stocks availabe.',
          {
            theme: 'dark',
          }
        );
      } else if (lang === 'HU') {
        toast.info(
          'Sajnálom. A termék elérte a készlet erejét. Több készletünk nincs.',
          {
            theme: 'dark',
          }
        );
      }

      return;
    }
    if (
      cart.cartItems.length > 0 &&
      data.seller._id !== cart.cartItems[0].seller._id
    ) {
      dispatch({
        type: 'CART_ADD_ITEM_FAIL',
        payload: toast.warn(
          `Egyszerre csak EGY ÜZLETBŐL VÁSÁROLHATSZ. \n\n\n  —— You can ONLY Buy from ONE Store at the same time.`,
          {
            theme: 'dark',
          }
          // `You can only Buy from "${cart.cartItems[0].seller.seller.name}" Store at one time. You already have added one of "${cart.cartItems[0].seller.seller.name}" product into your cart. You cannot Buy from Multiple Sellers at the same time.`
        ),
      });
    } else {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, seller: data.seller, quantity, color, size },
      });
    }
    // navigate('/cart');
  };

  // Buy Now button
  const addToCartHandlerBuyNow = async () => {
    const existItem = cart.cartItems.find((x) => x._id === productId);
    const quantity = existItem ? existItem.quantity + 0 : 1;
    const { data } = await AxiosInstance.get(`/api/products/${productId}`);
    if (data.countInStock < quantity) {
      if (lang === 'EN') {
        toast.info(
          'Sorry. Product reaches its limit of stock. We do not have more stocks availabe.',
          {
            theme: 'dark',
          }
        );
      } else if (lang === 'HU') {
        toast.info(
          'Sajnálom. A termék elérte a készlet erejét. Több készletünk nincs.',
          {
            theme: 'dark',
          }
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
          `Egyszerre csak EGY ÜZLETBŐL VÁSÁROLHATSZ. \n\n\n  —— You can ONLY Buy from ONE Store at the same time`,
          {
            theme: 'dark',
          }
          // `You can only Buy from "${cart.cartItems[0].seller.seller.name}" Store at one time. You already have added one of "${cart.cartItems[0].seller.seller.name}" product into your cart. You cannot Buy from Multiple Sellers at the same time.`
        ),
      });
    }
    if (color === '') {
      toast.info('Please select a color you want to buy.', {
        theme: 'dark',
      });
    } else {
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, seller: data.seller, quantity, color, size },
      });
    }
    navigate('/cart');
  };
  const lang = localStorage.getItem('lang' || 'HU');

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
    //     'Sorry. It cannot be added as the Product is not available.'
    //   );
    //   return;
    // }

    wishctxDispatch({
      type: 'ADD_TO_WISHLIST',
      payload: { ...product, seller: data.seller, quantity, color, size },
    });
  };

  // const { wstate, dispatch: wishctxDispatch } = useContext(WishList);
  // const addToWishListtHandler = () => {
  //   wishctxDispatch({
  //     type: 'ADD_TO_WISHLIST',
  //     payload: { ...product, quantity: 1 },
  //   });
  // };
  const [ColorMsg, setColorMsg] = useState('');
  const onclickColor = () => {
    setColorMsg('Selected');
  };
  return (
    <>
      <Announcement />
      <Navbar />
      <ToastContainer position="bottom-center" limit={1} />
      {Carterror && <MessageBox variant="danger">{Carterror}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorLoading>{error}</ErrorLoading>
      ) : (
        <SingleProductContainer>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>

          {/* Mobile starts */}
          <div className="mobile_div_list">
            <RightBigImageMob>
              <ImgContainerMob>
                <ImageMob src={selectedImage || product.image} />
              </ImgContainerMob>
              <div className="mbole_slidesproducts">
                {[product.image, ...product.images].map((x) => (
                  <div key={x} className="slides-container">
                    <div>
                      <div
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <img
                          variant="top"
                          src={x}
                          alt="product-slides"
                          className="slides-images"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <TitleMob>
                {lang === 'EN' ? <>{product?.name}</> : <>{product?.name}</>}
              </TitleMob>
              <ColorsAlignment_mob>
                <PriceMob>
                  <i className="fa-solid fa-sack-dollar money_class_product"></i>
                  {product?.price} HUF{' '}
                </PriceMob>
                <FilterContainer>
                  <Filter onClick={onclickColor}>
                    {product.color?.map((c) => (
                      <>
                        <Tippy content={c} placement="top">
                          <FilterColor
                            color={c}
                            key={c}
                            onClick={() => setColor(c)}
                          />
                        </Tippy>
                      </>
                    ))}
                  </Filter>

                  <Filter>
                    <FilterSize onChange={(e) => setSize(e.target.value)}>
                      {product.size?.map((s) => (
                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                      ))}
                    </FilterSize>
                  </Filter>
                  {!color || !size ? (
                    <div className="No_color_size_msg">
                      Please chose a color & size to Buy
                    </div>
                  ) : (
                    ''
                  )}
                </FilterContainer>{' '}
              </ColorsAlignment_mob>
              <ColorMSG color={color}>
                {' '}
                {color} &nbsp;{ColorMsg}
              </ColorMSG>
              {product.countInStock > 0 && (
                // <Add2Cart onClick={addToCartHandler}>
                //   <AddShoppingCartOutlinedIcon />
                // </Add2Cart>
                <button
                  className="Add2CartBTN_Web"
                  onClick={addToCartHandler}
                  disabled={!color || !size ? true : false}
                >
                  <AddShoppingCartOutlinedIcon />
                </button>
              )}
              {product.countInStock > 0 && (
                <Add2Cart onClick={addToWishListtHandler}>
                  <FavoriteBorderOutlined />
                </Add2Cart>
              )}
              {product.countInStock > 0 ? (
                <AvailabeMob>
                  {lang === 'EN' ? (
                    <>
                      <b style={{ color: '#000' }}>
                        {product.countInStock} Pcs{' '}
                      </b>{' '}
                      In Stock
                    </>
                  ) : (
                    <>
                      <b style={{ color: '#000' }}>
                        {product.countInStock} DBs{' '}
                      </b>{' '}
                      Raktáron
                    </>
                  )}
                </AvailabeMob>
              ) : (
                <UnAvailabeMob>
                  {lang === 'EN' ? 'Unavailable' : 'Nem érhető el'}
                </UnAvailabeMob>
              )}
              {product.countInStock > 0 && (
                // <BuyNowMob onClick={addToCartHandlerBuyNow}>
                //   {' '}
                //   {lang === 'EN' ? 'Buy Now' : 'Vásárolj most'}
                // </BuyNowMob>
                <button
                  disabled={!color || !size ? true : false}
                  onClick={addToCartHandlerBuyNow}
                  className="BuyNow_newBtn_mob"
                >
                  {lang === 'EN' ? 'Buy Now' : 'Vásárolj most'}
                </button>
              )}
              <br /> <br />
              <b style={{ color: 'rgb(94 94 94' }}>
                {lang === 'EN' ? 'Description:' : 'Leírás:'}
              </b>
              <Description>
                {lang === 'EN' ? (
                  <>{product.description}</>
                ) : (
                  <>{product.description}</>
                )}
              </Description>
              <Link
                // to={`/${product.seller.seller.name}`}
                to={`/seller/${product.seller._id}`}
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                <div className="seller_card">
                  <div className="seller_card_img">
                    <img
                      src={product.seller.seller.logo}
                      alt={product.seller.seller.name}
                      className="seller_img_profile"
                    ></img>
                  </div>
                  <div className="seller_card_title">
                    {product.seller.seller.name}
                  </div>
                </div>
              </Link>
              <Ratting>
                <Rating
                  Rating={product.rating}
                  numReviews={product.numReviews}
                />
              </Ratting>
              <div className="Feedbacks-Reviews-Container">
                {userInfo && product.countInStock > 0 && (
                  <h2 id="reviews">
                    {lang === 'EN' ? 'Reviews' : 'Vélemények'}
                  </h2>
                )}

                {product.reviews.length === 0 && product.countInStock > 0 && (
                  <MessageBox>
                    {' '}
                    {lang === 'EN' ? 'There is no review' : 'Nincs áttekintés'}
                  </MessageBox>
                )}
                <ul className="Reviews_UL">
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <div className="ReviewerDetails">
                        <strong>{review.name}</strong>

                        <Rating rating={review.rating} caption=" "></Rating>

                        <p className="DateSmall">
                          {review.createdAt.substring(0, 10)} &nbsp; | &nbsp;
                          {format(review.createdAt)}
                        </p>
                        <p>{review.comment}</p>
                      </div>
                    </li>
                  ))}
                  <li>
                    {userInfo && product.countInStock > 0 ? (
                      <form className="form" onSubmit={submitHandler}>
                        <div className="create-review-title">
                          <h2>
                            {lang === 'EN'
                              ? 'Write a review'
                              : 'Írja meg a véleményét'}
                          </h2>
                        </div>
                        <div>
                          <label htmlFor="rating" className="LightColor">
                            {lang === 'EN' ? 'Rating' : 'Értékelés'}
                          </label>
                          <select
                            className="review_select"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            {lang === 'EN' ? (
                              <>
                                <option value="">Select...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excelent</option>
                              </>
                            ) : (
                              <>
                                <option value="">Válassza ki...</option>
                                <option value="1">1- Szegény</option>
                                <option value="2">2- Becsületes</option>
                                <option value="3">3- Jó</option>
                                <option value="4">4- Nagyon jó</option>
                                <option value="5">5- Kiváló</option>
                              </>
                            )}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="comment" className="LightColor">
                            {lang === 'EN' ? 'Comment' : 'Megjegyzés'}
                          </label>
                          <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div>
                          <label />
                          <button className="primary" type="submit">
                            {lang === 'EN' ? 'Submit' : 'Beküldés'}
                          </button>
                        </div>
                        <center>
                          {' '}
                          <div>
                            {loadingReviewCreate && <OnlyLoading></OnlyLoading>}
                            {errorReviewCreate && (
                              <MessageBox variant="danger">
                                {errorReviewCreate}
                              </MessageBox>
                            )}
                          </div>
                        </center>
                      </form>
                    ) : (
                      <>
                        {lang === 'EN' ? (
                          <>
                            {!userInfo && (
                              <>
                                <MessageBox>
                                  Please <Link to="/signin">Sign In</Link> to
                                  write a review
                                </MessageBox>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {!userInfo && (
                              <MessageBox>
                                Kérem <Link to="/signin">Bejelentkezés</Link>{' '}
                                véleményt írni
                              </MessageBox>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </RightBigImageMob>
          </div>
          {/* Mobile ends */}

          <RightContainer>
            <RightBigImage>
              <ImgContainer>
                <Image src={selectedImage || product.image} />
              </ImgContainer>
            </RightBigImage>
            <LeftSliderImages>
              <div className="slides-main-container">
                {[product.image, ...product.images].map((x) => (
                  <div key={x} className="slides-container">
                    <div className="slides-images">
                      <div
                        // className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <img
                          variant="top"
                          src={x}
                          alt="product-slides"
                          className="slides-images"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </LeftSliderImages>
          </RightContainer>

          <LeftContainer>
            <TitlesContainer>
              <Title>
                {lang === 'EN' ? <>{product?.name}</> : <>{product?.name}</>}
              </Title>

              {(userInfo?.isAdmin || userInfo?.isSeller) &&
                userInfo?._id === product.seller._id && (
                  <div className="singleProductEditPen">
                    <Link to={`/product/${productId}/edit`}>
                      <Tippy content="Edit this product" placement="top">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Tippy>
                    </Link>
                  </div>
                )}
            </TitlesContainer>
            <PriceContainer>
              <Price>{product.price} HUF</Price>
            </PriceContainer>
            <FilterContainer>
              <Filter onClick={onclickColor}>
                {/* <FilterTitle>Color</FilterTitle> */}
                {product.color?.map((c) => (
                  <>
                    <Tippy content={c} placement="top">
                      <FilterColor
                        color={c}
                        key={c}
                        onClick={() => setColor(c)}
                      />
                    </Tippy>
                  </>
                ))}
              </Filter>
              <Filter>
                {/* <FilterTitle>Size</FilterTitle> */}
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>{' '}
              {!color || !size ? (
                <div className="No_color_size_msg_web">
                  Please chose a color & size to Buy
                </div>
              ) : (
                ''
              )}
            </FilterContainer>
            <ColorMSG color={color}>
              {' '}
              {color} &nbsp;{ColorMsg}
            </ColorMSG>
            <Add2CardDIV>
              {product.countInStock > 0 && (
                // <BuyNowAdd2Cart
                //   onClick={addToCartHandlerBuyNow}
                //
                // >
                //   <BuyNow>{lang === 'EN' ? 'Buy Now' : 'Vásárolj most'}</BuyNow>
                // </BuyNowAdd2Cart>
                <button
                  disabled={!color || !size ? true : false}
                  onClick={addToCartHandlerBuyNow}
                  className="BuyNow_newBtn"
                >
                  {lang === 'EN' ? 'Buy Now' : 'Vásárolj most'}
                </button>
              )}

              {product.countInStock > 0 && (
                // <Add2Cart
                //   onClick={addToCartHandler}
                // >
                //   <AddShoppingCartOutlinedIcon />
                // </Add2Cart>
                <button
                  className="Add2CartBTN_Web"
                  onClick={addToCartHandler}
                  disabled={!color || !size ? true : false}
                >
                  <AddShoppingCartOutlinedIcon />
                </button>
              )}

              {product.countInStock > 0 && (
                <Add2Cart onClick={addToWishListtHandler}>
                  <FavoriteBorderOutlined />
                </Add2Cart>
              )}

              {product.countInStock > 0 ? (
                <Availabe>
                  {lang === 'EN' ? (
                    <>
                      <b style={{ color: '#000' }}>
                        {product.countInStock} Pcs{' '}
                      </b>{' '}
                      In Stock
                    </>
                  ) : (
                    <>
                      <b style={{ color: '#000' }}>
                        {product.countInStock} DBs{' '}
                      </b>{' '}
                      Raktáron
                    </>
                  )}
                </Availabe>
              ) : (
                <UnAvailabe>
                  {lang === 'EN' ? 'Unavailable' : 'Nem érhető el'}
                </UnAvailabe>
              )}
            </Add2CardDIV>
            <Description>
              {lang === 'EN' ? (
                <>{product.description}</>
              ) : (
                <>{product.description}</>
              )}
            </Description>
            <Link
              // to={`/${product.seller.seller.name}`}
              to={`/seller/${product.seller._id}`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <div className="seller_card">
                <div className="seller_card_img">
                  <img
                    src={product.seller.seller.logo}
                    alt={product.seller.seller.name}
                    className="seller_img_profile"
                  ></img>
                </div>
                <div className="seller_card_title">
                  {product.seller.seller.name}
                </div>
              </div>
            </Link>
            <Ratting>
              <Rating Rating={product.rating} numReviews={product.numReviews} />
            </Ratting>
            <div className="Feedbacks-Reviews-Container">
              {userInfo && product.countInStock > 0 && (
                <h2 id="reviews">{lang === 'EN' ? 'Reviews' : 'Vélemények'}</h2>
              )}

              {product.reviews.length === 0 && product.countInStock > 0 && (
                <MessageBox>
                  {lang === 'EN' ? 'There is no review' : 'Nincs áttekintés'}
                </MessageBox>
              )}
              <ul className="Reviews_UL">
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <div className="ReviewerDetails">
                      <strong>{review.name}</strong>

                      <Rating rating={review.rating} caption=" "></Rating>

                      <p className="DateSmall">
                        {review.createdAt.substring(0, 10)} &nbsp; | &nbsp;
                        {format(review.createdAt)}
                      </p>
                      <p>{review.comment}</p>
                    </div>
                  </li>
                ))}
                <li>
                  {userInfo && product.countInStock > 0 ? (
                    <form className="form" onSubmit={submitHandler}>
                      <div className="create-review-title">
                        <h2>
                          {lang === 'EN'
                            ? 'Write a review'
                            : 'Írja meg a véleményét'}
                        </h2>
                      </div>
                      <div>
                        <label htmlFor="rating" className="LightColor">
                          {lang === 'EN' ? 'Rating' : 'Értékelés'}
                        </label>
                        <select
                          className="review_select"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          {lang === 'EN' ? (
                            <>
                              <option value="">Select...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very good</option>
                              <option value="5">5- Excelent</option>
                            </>
                          ) : (
                            <>
                              <option value="">Válassza ki...</option>
                              <option value="1">1- Szegény</option>
                              <option value="2">2- Becsületes</option>
                              <option value="3">3- Jó</option>
                              <option value="4">4- Nagyon jó</option>
                              <option value="5">5- Kiváló</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment" className="LightColor">
                          {lang === 'EN' ? 'Comment' : 'Megjegyzés'}
                        </label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label />
                        <button className="primary" type="submit">
                          {lang === 'EN' ? 'Submit' : 'Beküldés'}
                        </button>
                      </div>
                      <center>
                        {' '}
                        <div>
                          {loadingReviewCreate && <OnlyLoading></OnlyLoading>}
                          {errorReviewCreate && product.countInStock > 0 && (
                            <MessageBox variant="danger">
                              {errorReviewCreate}
                            </MessageBox>
                          )}
                        </div>
                      </center>
                    </form>
                  ) : (
                    <>
                      {lang === 'EN' ? (
                        <>
                          {!userInfo && (
                            <>
                              <MessageBox>
                                Please <Link to="/signin">Sign In</Link> to
                                write a review
                              </MessageBox>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {!userInfo && (
                            <MessageBox>
                              Kérem <Link to="/signin">Bejelentkezés</Link>{' '}
                              véleményt írni
                            </MessageBox>
                          )}
                        </>
                      )}
                    </>
                  )}
                </li>
              </ul>
            </div>
          </LeftContainer>
        </SingleProductContainer>
      )}

      <NewsLetter />
      <Footer />
    </>
  );
};

export default SingleProductScreen;
