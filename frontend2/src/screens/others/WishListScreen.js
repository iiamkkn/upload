import { useContext } from 'react';
import { WishList } from '../../Wish';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Cart.css';
import Announcement from '../../components/Announcement/Announcement';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';
import { AxiosInstance } from '../../api/AxiosInstance';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  background: #eeeeee7e;
`;

const InfoContainers = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const RgtContDIV = styled.div`
  flex: 1;
  /* border: 0.5px solid lightgray; */
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const RightContainer = styled.div`
  flex: 9;
  flex-direction: column;
  display: flex;
  background: #fff;
  /* padding: 10px; */
  border: none;
  /* box-shadow: 0px 2px 5px rgb(220 220 220), 0px 0px 0px rgb(220 220 220); */
`;
const LeftContainer = styled.div`
  flex: 1;
  padding: 10px;
  box-shadow: 2px 2px 5px rgb(220 220 220), 0px 0px 0px rgb(220 220 220);
  border: none;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 25px;
  padding: 10px;
  width: 100%;
`;
const ImgContainer = styled.div`
  display: flex;
  flex: 1;
`;
const ButtonContainers = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.8;
`;

const ItemquantityNumber = styled.div`
  padding: 10px;
  /* border-bottom: 1px solid #e0e0e0; */
  height: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const DeletePriceContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 40px;
`;
const DeleteIconDiv = styled.div`
  display: flex;
  margin-left: 40px;
  margin-top: -5px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const ItemTotalPrice = styled.div`
  font-weight: bold;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: -5px;
`;
const PriceMath = styled.div`
  font-size: 12px;
  display: flex;
  color: rgba(159, 159, 159);
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 5px;
  justify-content: center;
`;
const Summary = styled.div`
  flex: 1;
  /* border: 0.5px solid lightgray; */
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(94 94 94);
  ${Mscreen({
    backgroundColor: '#fff',
    padding: '10px',
  })}
  ${mobile({
    backgroundColor: '#fff',
    padding: '10px',
  })}
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(94 94 94);
`;

const SummaryItemPrice = styled.span`
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: center;
  gap: 0.7em;
  font-size: 14px;
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  opacity: 0.87;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopLeft = styled.div`
  flex: 1;
`;
const TopCenter = styled.div`
  flex: 1;
`;
const TopRight = styled.div`
  flex: 1;
`;
const TopButtons = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};

  ${Mscreen({
    marginTop: '15px',
    width: '200px',
    marginLeft: '-17px',
  })}
  ${mobile({
    marginTop: '15px',
    width: '200px',
    marginLeft: '-17px',
  })}
`;

///// Main app code starts here
function WishListScreen() {
  const navigate = useNavigate();
  const { wstate, dispatch: wishctxDispatch } = useContext(WishList);
  const {
    wishlist: { wishistItem },
  } = wstate;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await AxiosInstance.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast(
        'Sorry. No more Products are available. We have reached the Stock Limit. More Products cannot be added at the moment.'
      );
      return;
    }
    wishctxDispatch({
      type: 'ADD_TO_WISHLIST',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    wishctxDispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  const lang = localStorage.getItem('lang' || 'HU');
  return (
    <div>
      <Helmet>
        <title>{lang === 'EN' ? 'Your WishList' : 'Kívánságlistád'}</title>
      </Helmet>
      <Announcement />
      <Navbar />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />

      <MainContainer>
        <Top>
          <TopLeft>
            <Link to="/">
              <TopButtons>
                {lang === 'EN' ? 'CONTINUE SHOPPING' : 'FOLYTATNI A VÁSÁRLÁST'}
              </TopButtons>
            </Link>
          </TopLeft>
          <TopCenter>
            {/* <Title>Your Shopping Cart</Title> */}
            {/* <TopTexts>
              <TopText>
                Total item ({wishistItem.reduce((a, c) => a + c.quantity, 0)})
              </TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts> */}
          </TopCenter>
          <TopRight>
            {/* <TopButtons type="filled">CHECKOUT NOW</TopButtons> */}
          </TopRight>
        </Top>

        <InfoContainers>
          <RightContainer>
            <RgtContDIV>
              {wishistItem.length === 0 ? (
                <MessageBox>
                  <center>
                    <div className="empty-cart-message">
                      {lang === 'EN'
                        ? ' You do not have any item in wishlist. Please '
                        : ' Nincs tétel a kívánságlistán. Kérem '}
                      <Link className="empty-cart-link" to="/">
                        {lang === 'EN' ? ' Do Shopping' : ' Vásárolni '}
                      </Link>
                      {lang === 'EN'
                        ? '  and add products to the wishlist. '
                        : 'és adjon hozzá termékeket a kívánságlistához. '}
                    </div>
                  </center>
                </MessageBox>
              ) : (
                <>
                  <div className="hide_in_mobile_screen">
                    {wishistItem.map((item) => (
                      <ItemContainer key={item._id}>
                        <ImgContainer>
                          <div className="mobile_wishlist_img">
                            <img
                              className="wishlist_mob_thumbnail"
                              src={item.image}
                              alt={item.name}
                            ></img>
                          </div>
                          <Link
                            className="TitleofCartAddedItem"
                            to={`/product/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </ImgContainer>

                        <ButtonContainers>
                          {/* <button
                            className="Buttons"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                          >
                            <RemoveCircleIcon></RemoveCircleIcon>
                          </button> */}
                          {/* <ItemquantityNumber>
                            {item.quantity}
                          </ItemquantityNumber> */}
                          {/* <button
                            className="Buttons"
                            disabled={item.quantity === item.countInStock}
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                          >
                            <AddCircleIcon
                              disabled={item.quantity === item.countInStock}
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                            ></AddCircleIcon>
                          </button> */}
                          <DeletePriceContainer>
                            <ItemTotalPrice>
                              $ {item.quantity * item.price}
                              <PriceMath>
                                {item.quantity}*{item.price}
                              </PriceMath>
                            </ItemTotalPrice>

                            <DeleteIconDiv>
                              {' '}
                              <DeleteIcon
                                onClick={() => removeItemHandler(item)}
                              ></DeleteIcon>
                            </DeleteIconDiv>
                          </DeletePriceContainer>
                        </ButtonContainers>
                      </ItemContainer>
                    ))}
                  </div>
                  {/* Mobile starts */}
                  <div className="cartScreen_product_mobile">
                    {wishistItem.map((item) => (
                      <div
                        key={item._id}
                        className="ItemContainer_mob_wishlist"
                      >
                        <div className="mobile_wishlist_img">
                          <img
                            className="wishlist_mob_thumbnail"
                            src={item.image}
                            alt={item.name}
                          ></img>
                        </div>

                        <div className="mob_items_column">
                          <Link
                            className="TitleofCartAddedItem"
                            to={`/product/${item._id}`}
                          >
                            {lang === 'EN' ? (
                              <>{item.name}</>
                            ) : (
                              <>{item.name}</>
                            )}
                          </Link>
                          <div className="buttons_container_mob">
                            {/* <button
                              className="Buttons"
                              disabled={item.quantity === 1}
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                            >
                              <RemoveCircleIcon></RemoveCircleIcon>
                            </button> */}
                            {/* <div className="Items_count_number_mob">
                              {item.quantity}
                            </div> */}
                            {/* <button
                              className="Buttons"
                              disabled={item.quantity === item.countInStock}
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                            >
                              <AddCircleIcon
                                disabled={item.quantity === item.countInStock}
                                onClick={() =>
                                  updateCartHandler(item, item.quantity + 1)
                                }
                              ></AddCircleIcon>
                            </button> */}
                            <div className="delete_mob_div">
                              <DeleteIcon
                                onClick={() => removeItemHandler(item)}
                              ></DeleteIcon>
                            </div>
                          </div>
                          <div className="total_price_item_mob">
                            {item.quantity * item.price}.00 HUF
                            <div className="PriceMath_mob">
                              {item.quantity}*{item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </RgtContDIV>
          </RightContainer>

          {wishistItem.length === 0 ? (
            ''
          ) : (
            <LeftContainer style={{ display: 'none' }}>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Total Items</SummaryItemText>
                  <SummaryItemPrice>
                    {wishistItem.reduce((a, c) => a + c.quantity, 0)}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText style={{ color: 'black' }}>
                    Total
                  </SummaryItemText>
                  <SummaryItemPrice>
                    ${' '}
                    {wishistItem.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </SummaryItemPrice>
                </SummaryItem>

                <Button
                  onClick={checkoutHandler}
                  disabled={wishistItem.length === 0}
                >
                  <CreditCardOutlinedIcon></CreditCardOutlinedIcon>
                  <div> PAY NOW</div>
                </Button>
              </Summary>
            </LeftContainer>
          )}
        </InfoContainers>
      </MainContainer>

      <Footer />
    </div>
  );
}

export default WishListScreen;
