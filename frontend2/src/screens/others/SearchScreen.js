import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Rating from '../../components/Rating/Rating';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../../components/Product/Product';
// import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../CSS/SearchScreen.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import SearchScreenFiltersDropDown from './SearchScreenFiltersDropDown';
import styled from 'styled-components';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosInstance } from '../../api/AxiosInstance';

//

//

//

//

//
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

export const ratings = [
  {
    name: '4stars',
    rating: 4,
  },

  {
    name: '3stars',
    rating: 3,
  },

  {
    name: '2stars',
    rating: 2,
  },

  {
    // name: '1stars & up',
    name: '1stars',
    rating: 1,
  },
];

const DropDownContainer = styled('div')`
  transition: all 0.5s ease;
`;

const DropDownListContainer = styled('div')`
  transition: all 0.5s ease;
`;

const DropDownList = styled('ul')`
  transition: all 0.5s ease;
  width: 122px;
  z-index: 61;
  position: absolute;
  margin-top: 2.6rem;
  margin-left: -7.5rem;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  border: 0.5px solid rgb(220 220 220);
  border-top: 0.5px solid #eee;
  border-radius: 4px;
  &:first-child {
    padding-top: 0.4em;
  }
`;

const ListItem = styled('li')`
  transition: all 0.5s ease;

  list-style: none;
  text-decoration: none;
  margin-top: -10px;
`;

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await AxiosInstance.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const Closedropdown = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <div className="Search_container_Main" onClick={() => Closedropdown()}>
      <Navbar />
      {/* <SearchScreenFiltersDropDown /> */}

      <Helmet>
        <title>Searching Products</title>
      </Helmet>

      {/* <div className="filter-search-count"> */}
      <div>
        {/* About &nbsp;<b>{countProducts === 0 ? 'No' : countProducts}</b>
        &nbsp; results were found */}
        {/* <b>
          {' '}
          {query !== 'all' && ' : ' + query}
          {category !== 'all' && ' : ' + category}
          {price !== 'all' && ' : Price ' + price}
          {rating !== 'all' && ' : Rating ' + rating + ' & up'}
        </b> */}
        {query !== 'all' ||
        category !== 'all' ||
        rating !== 'all' ||
        price !== 'all' ? (
          <div onClick={() => navigate('/search')}>
            {/* <i className="fas fa-times-circle"></i> */}
            {/* <Tippy content="Remove" placement="top">
              <CancelIcon className="CancelIcon_button"></CancelIcon>
            </Tippy> */}
          </div>
        ) : null}
      </div>

      <div className="filter-main-container">
        <div className="filter-items-container">
          {/* <div className="Filter-Left">
            <div className="filter-button">Filter Categories</div>
          </div>

          <div className="Filter-Center">
            <div className="filter-button">Filter Categories</div>
          </div> */}

          <div className="Filter-Right">
            <div className="search_reasult_count_number">
              {lang === 'EN' ? (
                <>
                  About &nbsp;
                  <b>{countProducts === 0 ? 'No' : countProducts}</b>
                  &nbsp; results were found
                </>
              ) : (
                <>
                  Körülbelül &nbsp;
                  <b>{countProducts === 0 ? 'Nem' : countProducts}</b>
                  &nbsp; eredményt találtunk
                </>
              )}
            </div>

            <div className="filter-button" onClick={toggling}>
              {lang === 'EN' ? 'Filter' : 'Szűrő'}
              <b>
                {' '}
                {query !== 'all' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {price !== 'all' && ' : Price ' + price}
                {/* {rating !== 'all' && ' : Rating ' + rating + ' & up'} */}
                {rating !== 'all' && ' : Rating ' + rating + ' stars '}
              </b>
              {query !== 'all' ||
              category !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <div onClick={() => navigate('/search')}>
                  <Tippy content="Remove" placement="top">
                    <CloseIcon className="CancelIcon_button"></CloseIcon>
                  </Tippy>
                </div>
              ) : null}
            </div>

            <DropDownContainer>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    <ArrowDropUpIcon
                      onClick={toggling}
                      className="ArrowDropUpIconSearch"
                    />

                    <ul>
                      <li>
                        <ListItem className="SearchScreen_DropDown_ListInfo filter_btn_title">
                          {lang === 'EN' ? 'By category' : 'Kategória szerint'}
                        </ListItem>
                      </li>
                      <li>
                        <Link
                          className={
                            'all' === category
                              ? 'text-bold '
                              : 'SearchScreen_DropDown_ListInfo'
                          }
                          to={getFilterUrl({ category: 'all' })}
                        >
                          <ListItem className="SearchScreen_DropDown_ListInfo">
                            {lang === 'EN'
                              ? 'Any Category'
                              : 'Bármely kategória'}
                          </ListItem>
                        </Link>
                      </li>
                      {categories.map((c) => (
                        <li key={c}>
                          <Link
                            className={
                              c === category
                                ? 'text-bold'
                                : 'SearchScreen_DropDown_ListInfo'
                            }
                            to={getFilterUrl({ category: c })}
                          >
                            <ListItem className="SearchScreen_DropDown_ListInfo">
                              {c}
                            </ListItem>
                          </Link>
                        </li>
                      ))}

                      <li>
                        <ListItem className="SearchScreen_DropDown_ListInfo filter_btn_title">
                          <br />

                          {lang === 'EN' ? 'By price' : 'Ár szerint'}
                        </ListItem>
                      </li>
                      <li>
                        <Link
                          className={
                            'all' === price
                              ? 'text-bold'
                              : 'SearchScreen_DropDown_ListInfo'
                          }
                          to={getFilterUrl({ price: 'all' })}
                        >
                          <ListItem className="SearchScreen_DropDown_ListInfo">
                            {lang === 'EN' ? 'Any Price' : 'Bármilyen áron'}
                          </ListItem>
                        </Link>
                      </li>
                      {prices.map((p) => (
                        <li key={p.value}>
                          <Link
                            to={getFilterUrl({ price: p.value })}
                            className={
                              p.value === price
                                ? 'text-bold'
                                : 'SearchScreen_DropDown_ListInfo'
                            }
                          >
                            <ListItem className="SearchScreen_DropDown_ListInfo">
                              {p.name}
                            </ListItem>
                          </Link>
                        </li>
                      ))}

                      <li>
                        <ListItem className="SearchScreen_DropDown_ListInfo filter_btn_title">
                          <br />

                          {lang === 'EN' ? 'By Ratings' : 'Értékelések alapján'}
                        </ListItem>
                      </li>
                      {ratings.map((r) => (
                        <li key={r.name}>
                          <Link
                            to={getFilterUrl({ rating: r.rating })}
                            className={
                              `${r.rating}` === `${rating}`
                                ? 'text-bold'
                                : 'SearchScreen_DropDown_ListInfo'
                            }
                          >
                            <ListItem className="SearchScreen_DropDown_ListInfo">
                              {/* <Rating
                                caption={' & up'}
                                rating={r.rating}
                              ></Rating> */}
                              <Rating caption={' '} rating={r.rating}></Rating>
                            </ListItem>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to={getFilterUrl({ rating: 'all' })}
                          className={
                            rating === 'all'
                              ? 'text-bold'
                              : 'SearchScreen_DropDown_ListInfo'
                          }
                        >
                          {/* <ListItem className="SearchScreen_DropDown_ListInfo">
                            {' '}
                             <Rating caption={' & up'} rating={0}></Rating> 
                          </ListItem> */}
                        </Link>
                      </li>
                    </ul>
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>
            <div className="filter-select">
              {' '}
              <select
                value={order}
                onChange={(e) => {
                  navigate(getFilterUrl({ order: e.target.value }));
                }}
              >
                <option className="select-options" value="newest">
                  {lang === 'EN' ? ' Newest Arrivals' : 'Legújabb érkezések'}
                </option>
                <option className="select-options" value="lowest">
                  {lang === 'EN' ? 'Low to High Price' : 'Alacsony és magas ár'}
                </option>
                <option className="select-options" value="highest">
                  {lang === 'EN' ? ' High to Low Price' : 'Magastól alacsonyig'}
                </option>
                <option className="select-options" value="toprated">
                  {lang === 'EN'
                    ? 'Top Reviews Products'
                    : 'Top vélemények Termékek'}
                </option>
              </select>
            </div>
          </div>
          <div className="search_reasult_count_numberMob">
            {lang === 'EN' ? (
              <>
                About &nbsp;
                <b>{countProducts === 0 ? 'No' : countProducts}</b>
                &nbsp; results were found
              </>
            ) : (
              <>
                Körülbelül &nbsp;
                <b>{countProducts === 0 ? 'Nem' : countProducts}</b>
                &nbsp; eredményt találtunk
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <center>
          {products?.length === 0 && (
            <div className="No_product_found_search_msg">
              <b style={{ color: 'black' }}>
                {lang === 'EN' ? 'Oops!' : 'Hoppá!'}
              </b>
              <br />
              {lang === 'EN'
                ? 'No product were found. Try something else.'
                : 'Nem található termék. Próbálj ki valami mást.'}
            </div>
          )}
        </center>
        {/* <Col md={3}>
           <h3>Department</h3>

          <div>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>

              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        {/* <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        {/* <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  className={rating === 'all' ? 'text-bold' : ''}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div> 
        </Col>*/}
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="justify-content-between mb-3">
                {/* <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} ResultsZZZ
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        {/* <i className="fas fa-times-circle"></i> */}
                {/* <CancelIcon></CancelIcon>
                      </Button>
                    ) : null}
                  </div>
                </Col>  */}
                {/* <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col> */}
              </div>

              <div className="search_product_list">
                {products.map((product) => (
                  <div key={product._id}>
                    <Product product={product}></Product>
                  </div>
                ))}
              </div>

              <div className="pagination_div">
                {[...Array(pages).keys()].map((x) => (
                  <Link key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                    <Button
                      className={
                        Number(page) === x + 1
                          ? 'pagination_selected'
                          : 'pagination_unselected'
                      }
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
