import React, { useEffect } from 'react';
import '../CSS/HomeScreenProducts.css';
import styled from 'styled-components';
import Product from '../../components/Product/Product';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Helmet } from 'react-helmet-async';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { listTopSellers } from '../../actions/userActions';
import { Link } from 'react-router-dom';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
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

const HomeScreenProducts = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Helmet>
        <title>Zalazon. - Welcome </title>
      </Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="Featured_Products_Container">
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product}></Product>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="top_seller_div">
        <h2>{lang === 'EN' ? 'Top Sellers' : 'Top eladók'}</h2>
        {loadingSellers ? (
          <OnlyLoading></OnlyLoading>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel showArrows autoPlay showThumbs={false}>
              {sellers.map((seller) => (
                <div key={seller._id}>
                  <Link to={`/seller/${seller._id}`}>
                    <img src={seller.seller.logo} alt={seller.seller.name} />
                    <p className="legend">{seller.seller.name}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </>
  );
};

export default HomeScreenProducts;
