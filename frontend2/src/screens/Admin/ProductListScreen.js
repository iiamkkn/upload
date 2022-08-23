import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../../constants/productConstants';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import '../CSS/ProductListScreen.css';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { format } from 'timeago.js';
import { getAllUser } from '../../api/zain/UserRequests';

const OrderFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-left: 10px;
  margin-top: -4px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 1px solid #000;
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

export default function ProductListScreen(props) {
  const location = useLocation();
  const sellerMode = location.pathname.indexOf('/seller') >= 0;
  // const sellerMode = props.match.path.indexOf('/seller') >= 0;

  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  const [orderDiv, setorderDiv] = useState(false);
  const toggleOrderDIV = () => {
    setorderDiv((prevState) => !prevState);
  };
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <Helmet>
          <title>Create New Product</title>
        </Helmet>

        {persons.map((person, id) => {
          if (person._id === userInfo._id)
            return (
              <>
                {!person.IdVerification.checked &&
                  !person.IdVerification.approved && (
                    <>
                      <div className="product_list_seller_alert">
                        <div className="alert_already_sbmited_processing">
                          {lang === 'EN' ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <h1>
                                Please Verify Your Account.{' '}
                                <Link
                                  to="/store/verification"
                                  style={{
                                    textDecoration: 'none',
                                    color: 'blue',
                                  }}
                                >
                                  Click here.
                                </Link>
                              </h1>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <h1>
                                Kérjük, igazolja fiókját.{' '}
                                <Link
                                  to="/store/verification"
                                  style={{
                                    textDecoration: 'none',
                                    color: 'blue',
                                  }}
                                >
                                  Kattints ide.
                                </Link>
                              </h1>
                            </div>
                          )}
                        </div>{' '}
                      </div>
                    </>
                  )}
                {person.IdVerification.checked &&
                  !person.IdVerification.approved && (
                    <>
                      <div className="product_list_seller_alert">
                        <div className="alert_already_sbmited_processing">
                          {lang === 'EN' ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <h1>
                                Your Account is under verification... &nbsp;
                                <i class="fa-solid fa-magnifying-glass"></i>
                              </h1>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <h1>
                                {' '}
                                Fiókja ellenőrzés alatt áll... &nbsp;
                                <i class="fa-solid fa-magnifying-glass"></i>
                              </h1>
                            </div>
                          )}
                        </div>{' '}
                      </div>
                    </>
                  )}
                {person.IdVerification.checked &&
                  person.IdVerification.approved && (
                    <>
                      {' '}
                      {loadingDelete && (
                        <center>
                          <OnlyLoading></OnlyLoading>
                        </center>
                      )}
                      {errorDelete && (
                        <MessageBox variant="danger">{errorDelete}</MessageBox>
                      )}
                      {loadingCreate && (
                        <center>
                          <OnlyLoading></OnlyLoading>
                        </center>
                      )}
                      <div className="row main-product-container">
                        <h1>{lang === 'EN' ? 'All Products' : 'Termékek'}</h1>

                        <button
                          type="button"
                          className="primary"
                          onClick={createHandler}
                        >
                          {lang === 'EN'
                            ? 'Create Product'
                            : 'Új termék létrehozása'}
                        </button>
                      </div>
                      <center>
                        <ul className="row summary total_product_num_store">
                          <li>
                            <div className="summary-title color2">
                              <span>
                                <i className="fa fa-shopping-cart" />{' '}
                                {lang === 'EN'
                                  ? 'Total Products'
                                  : 'Összes termék'}
                              </span>
                            </div>
                            <div className="summary-body bgcolortotNum">
                              {products?.length}
                            </div>
                          </li>
                        </ul>
                      </center>
                      {/* {products?.length === 0 && (
                        <>
                          {person.IdVerification.checked &&
                            person.IdVerification.approved && (
                              <>
                                <div className="No_seller_product_msg_div">
                                  {lang === 'EN'
                                    ? 'You do not have any products uploaded yet.'
                                    : 'Még nincs feltöltött terméked.'}
                                </div>
                              </>
                            )}
                        </>
                      )} */}
                    </>
                  )}
                {person.IdVerification.checked &&
                  person.IdVerification.approved && (
                    <>
                      {errorCreate && (
                        <MessageBox variant="danger">{errorCreate}</MessageBox>
                      )}
                      {loading ? (
                        <LoadingBox></LoadingBox>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <>
                          {products?.length === 0 ? (
                            <>
                              {person.IdVerification.checked &&
                                person.IdVerification.approved && (
                                  <>
                                    <div className="No_seller_product_msg_div">
                                      {lang === 'EN'
                                        ? 'You do not have any products uploaded yet.'
                                        : 'Még nincs feltöltött terméked.'}
                                    </div>
                                  </>
                                )}
                            </>
                          ) : (
                            <>
                              <div className="tableDiv">
                                {/* New disign */}
                                {products.map((product, io) => (
                                  <>
                                    <div
                                      key={io}
                                      className="order_list_main_container"
                                    >
                                      <div className="order_item_wrapper">
                                        {/* left */}
                                        <div className="order_item_new_left">
                                          <div class="orderDiv_top_new">
                                            <div className="order_item_new_title">
                                              <span className="order_item_number">
                                                {io}
                                              </span>{' '}
                                              {product.name}
                                            </div>{' '}
                                            <div className="order_item_id_new">
                                              <b>
                                                {lang === 'EN'
                                                  ? 'Product id'
                                                  : 'Termék azonosító'}{' '}
                                                →{' '}
                                              </b>
                                              {product._id}
                                            </div>
                                            <div className="order_item_id_new">
                                              <b>
                                                {lang === 'EN'
                                                  ? 'Seller id'
                                                  : 'Eladó azonosító'}{' '}
                                              </b>
                                              → {product.seller._id}
                                            </div>
                                            <div className="order_item_id_new">
                                              {product.createdAt.substring(
                                                0,
                                                10
                                              )}{' '}
                                              &nbsp; | &nbsp;
                                              {format(product.createdAt)}
                                            </div>
                                            <div className="order_item_image_div">
                                              {product.image ? (
                                                <>
                                                  <img
                                                    className="order_item_new_image"
                                                    src={product.image}
                                                    alt="order_image"
                                                  ></img>
                                                </>
                                              ) : (
                                                <>
                                                  {' '}
                                                  {lang === 'EN'
                                                    ? 'No Image Found.'
                                                    : 'Nem található kép.'}
                                                </>
                                              )}
                                              <div className="order_items_details_new">
                                                <div className="orders_item_new_qty addressINFOColor">
                                                  {lang === 'EN'
                                                    ? ' Quantity In Stock'
                                                    : 'Mennyiség Raktáron'}{' '}
                                                  → &nbsp;
                                                  <b> {product.countInStock}</b>
                                                </div>
                                                <div className="orders_item_new_qty addressINFOColor">
                                                  {lang === 'EN'
                                                    ? ' Color'
                                                    : 'Szín'}{' '}
                                                  →{' '}
                                                  <OrderFilterContainer>
                                                    <Filter>
                                                      {product.color.length ===
                                                      0 ? (
                                                        <>
                                                          {lang === 'EN'
                                                            ? 'No color selected'
                                                            : 'Nincs kiválasztva szín'}
                                                        </>
                                                      ) : (
                                                        <>
                                                          {product?.color?.map(
                                                            (cc) => (
                                                              <>
                                                                <Tippy
                                                                  content={cc}
                                                                  placement="top"
                                                                >
                                                                  <FilterColor
                                                                    color={cc}
                                                                    key={cc}
                                                                  />
                                                                </Tippy>
                                                              </>
                                                            )
                                                          )}
                                                        </>
                                                      )}
                                                    </Filter>
                                                  </OrderFilterContainer>
                                                </div>
                                                <div className="orders_item_new_qty addressINFOColor">
                                                  {lang === 'EN'
                                                    ? 'Size'
                                                    : 'Méret'}{' '}
                                                  →{' '}
                                                  <OrderFilterContainer>
                                                    {product.color.length ===
                                                    0 ? (
                                                      <>
                                                        {lang === 'EN'
                                                          ? 'No size selected'
                                                          : 'Nincs kiválasztva méret'}
                                                      </>
                                                    ) : (
                                                      <>
                                                        <Filter>
                                                          <FilterSize>
                                                            {product?.size?.map(
                                                              (ss) => (
                                                                <FilterSizeOption
                                                                  key={ss}
                                                                >
                                                                  {ss}
                                                                </FilterSizeOption>
                                                              )
                                                            )}
                                                          </FilterSize>
                                                        </Filter>
                                                      </>
                                                    )}
                                                  </OrderFilterContainer>
                                                </div>
                                                <div className="product_brand_cat_container">
                                                  <div>
                                                    {' '}
                                                    {lang === 'EN'
                                                      ? 'BRAND'
                                                      : 'MÁRKA'}{' '}
                                                    → {product.brand}
                                                  </div>
                                                  <div>
                                                    {' '}
                                                    {lang === 'EN'
                                                      ? 'CATEGORY'
                                                      : 'KATEGÓRIA'}{' '}
                                                    → {product.category}
                                                  </div>
                                                </div>
                                              </div>{' '}
                                            </div>
                                          </div>
                                        </div>

                                        {/* right */}
                                        <div className="order_item_new_right">
                                          <div className="new_right_divs">
                                            <b>{product.price.toFixed(2)}</b>{' '}
                                            HUF
                                          </div>
                                          <div className="new_right_divs">
                                            <div className="buttonsRow">
                                              <button
                                                type="button"
                                                className="small"
                                                onClick={() =>
                                                  navigate(
                                                    `/product/${product._id}/edit`
                                                  )
                                                }
                                              >
                                                {/* {lang === 'EN' ? 'Edit' : 'Szerkesztés'} */}
                                                <i className="fa-regular fa-pen-to-square "></i>
                                              </button>
                                              &nbsp;
                                              <button
                                                type="button"
                                                className="small"
                                                onClick={() =>
                                                  deleteHandler(product)
                                                }
                                              >
                                                {/* {lang === 'EN' ? 'Delete' : 'Töröl'} */}
                                                {/* <i className="fa-regular fa-trash-can UI_icon_small"></i> */}
                                                <i className="fa-regular fa-trash-can "></i>
                                              </button>
                                            </div>
                                          </div>{' '}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                              {/* This is hidden in css styles */}
                              {/* tableDiv for mobile View */}
                              <div className="tableDiv_mobile">
                                {products.map((product) => (
                                  <div
                                    key={product._id}
                                    className="tableDiv_mobile_main_container"
                                  >
                                    <div className="tableDiv_top">
                                      <div className="top_product_imgDIV_mob">
                                        {/* Name: <b>{product.name}</b> */}
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="top_product_img_mob"
                                        ></img>
                                      </div>

                                      <div>
                                        <Link
                                          to={`/product/${product._id}`}
                                          className="top_product_Link_mob"
                                        >
                                          {lang === 'EN' ? (
                                            <>{product.name}</>
                                          ) : (
                                            <>{product.name}</>
                                          )}
                                        </Link>
                                      </div>
                                      <div className="smallFont_mob">
                                        Id: {product._id}
                                      </div>
                                    </div>
                                    <div className="tableDiv_bottom">
                                      <div>
                                        {/* Price:  */}
                                        <b>{product.price} HUF</b>
                                      </div>
                                      <div className="smallFont_mob">
                                        {lang === 'EN'
                                          ? 'Category:'
                                          : 'Kategória:'}
                                        <b>{product.category}</b>
                                      </div>
                                      <div className="smallFont_mob">
                                        {lang === 'EN' ? 'Brand:' : 'Márka:'}{' '}
                                        <b>{product.brand}</b>
                                      </div>
                                    </div>{' '}
                                    <div className="tableDiv_bottom">
                                      <div className="smallFont_mob">
                                        {lang === 'EN'
                                          ? 'In Stock:'
                                          : 'Raktáron:'}{' '}
                                        <b>{product.countInStock}</b>
                                      </div>
                                      <div className="smallFont_mob">
                                        {lang === 'EN' ? 'Size:' : 'Méret:'}{' '}
                                        <b>{product.size}</b>
                                      </div>
                                    </div>
                                    <div className="tableDiv_bottom">
                                      <div className="smallFont_mob">
                                        {lang === 'EN' ? 'Color:' : 'Szín:'}
                                        <b>{product.color}</b>
                                      </div>
                                    </div>
                                    <div className="buttonsRow_mob">
                                      <button
                                        type="button"
                                        className="top_mob_buttons"
                                      >
                                        <Link
                                          to={`/product/${product._id}`}
                                          className="top_product_Link_mob"
                                        >
                                          <i class="fa-solid fa-eye"></i>
                                        </Link>
                                      </button>
                                      <button
                                        style={{ color: '#2ad100' }}
                                        type="button"
                                        className="top_mob_buttons"
                                        onClick={() =>
                                          navigate(
                                            `/product/${product._id}/edit`
                                          )
                                        }
                                      >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                      </button>
                                      <button
                                        style={{ color: '#eb1212' }}
                                        type="button"
                                        className="top_mob_buttons"
                                        onClick={() => deleteHandler(product)}
                                      >
                                        <i className="fa-regular fa-trash-can"></i>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>{' '}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
              </>
            );
        })}
      </div>
      <Footer />
    </>
  );
}
