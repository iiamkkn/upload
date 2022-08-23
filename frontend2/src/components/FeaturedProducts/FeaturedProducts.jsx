import React, { useReducer, useEffect } from 'react';
import './FeaturedProducts.css';
import { FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { data } from '../../data';
import axios from 'axios';
import { AxiosInstance } from '../../api/AxiosInstance';
// import logger from 'use-reducer-logger';

/////////////////////////// styled components design //

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
  min-width: 200px;
  height: 250px;
  z-index: 35;
  object-fit: cover;
  margin: 25px;
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
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

///////// styled components ends here /////////////

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; ///// Main App code ///////
export const FeaturedProducts = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await AxiosInstance.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data }); // data returned from backend server response which is declared there.
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="Featured_Products_Container">
      {products.map((product) => (
        <Container key={product._id}>
          <div>
            <Circle />
            <Image src={product.image} alt={product.name} />
          </div>
          <Link to={`/product/${product.name}`}>
            <Info>
              <Icon>
                <AddShoppingCartOutlinedIcon />
              </Icon>
              <Icon>
                <SearchOutlined />
              </Icon>
              <Icon>
                <FavoriteBorderOutlined />
              </Icon>
              <div className="product_title">
                <p>{product.name}</p>
              </div>
              <div className="product_title_price">
                <p>$ {product.price}</p>
              </div>{' '}
            </Info>
          </Link>
        </Container>
      ))}
    </div>
  );
};
