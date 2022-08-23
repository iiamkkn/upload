import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Helmet } from 'react-helmet-async';
import '../CSS/ProductListScreen.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styled from 'styled-components';
import { format } from 'timeago.js';

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
export default function OrderHistoryScreen(props) {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  const [orderDiv, setorderDiv] = useState(false);
  const toggleOrderDIV = () => {
    setorderDiv((prevState) => !prevState);
  };
  return (
    <>
      <Navbar />

      <Helmet>
        <title>
          {lang === 'EN' ? 'Order History' : 'Rendelési előzmények'}
        </title>
      </Helmet>
      <div className="main-product-container">
        <h1 className="My_mob_store_history">
          {lang === 'EN' ? 'My Orders History' : 'Rendelésem története'}
        </h1>
        <center>
          <ul
            className="row summary total_product_num_store"
            style={{ marginLeft: '-2rem' }}
          >
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" />{' '}
                  {lang === 'EN' ? 'Total Purchases' : 'Összes vásárlás'}
                </span>
              </div>
              <div className="summary-body bgcolortotNum">{orders?.length}</div>
            </li>
          </ul>
        </center>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {orders?.length === 0 ? (
              <div className="No_seller_product_msg_div">
                {lang === 'EN'
                  ? 'You have not purchased anything to have orders history.'
                  : 'Nem vásárolt semmit, hogy rendelkezzen rendelési előzményekkel.'}
              </div>
            ) : (
              <>
                {' '}
                <div className="tableDiv">
                  {/* New disign */}
                  {orders.map((order, io) => (
                    <>
                      <div key={io} className="order_list_main_container">
                        <div className="order_item_wrapper">
                          {/* left */}
                          <div className="order_item_new_left">
                            <div class="orderDiv_top_new">
                              {order.orderItems.map((order_item) => (
                                <>
                                  <div
                                    key={order_item._id}
                                    className="order_item_new_title"
                                  >
                                    <span className="order_item_number">
                                      {io}
                                    </span>{' '}
                                    {order_item.name}
                                  </div>{' '}
                                  <div className="order_item_id_new">
                                    <b>
                                      {lang === 'EN'
                                        ? 'Order id'
                                        : 'Rendelés azonosító'}{' '}
                                      →{' '}
                                    </b>
                                    {order._id}
                                  </div>
                                  <div className="order_item_id_new">
                                    {order.createdAt.substring(0, 10)} &nbsp; |
                                    &nbsp;
                                    {format(order.createdAt)}
                                  </div>
                                  {/* <div className="order_item_id_new">
                                    {lang === 'EN' ? 'Customer' : 'Vevő'} →{' '}
                                    {order.user?.name ? (
                                      order.user?.name
                                    ) : (
                                      <>
                                        <span
                                          style={{
                                            color: 'rgb(94 94 94',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          {lang === 'EN'
                                            ? 'No Name'
                                            : 'Névtelen'}
                                        </span>
                                      </>
                                    )}
                                  </div> */}
                                  <div className="order_item_image_div">
                                    {order_item.image ? (
                                      <>
                                        <img
                                          className="order_item_new_image"
                                          src={order_item.image}
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
                                          ? ' Quantity bought'
                                          : 'Vásárolt mennyiség'}{' '}
                                        → &nbsp;
                                        <b> {order_item.quantity}</b>
                                      </div>
                                      <div className="orders_item_new_qty addressINFOColor">
                                        {lang === 'EN' ? ' Color' : 'Szín'} →{' '}
                                        <OrderFilterContainer>
                                          <Filter>
                                            {order_item.color.length === 0 ? (
                                              <>
                                                {lang === 'EN'
                                                  ? 'No color selected'
                                                  : 'Nincs kiválasztva szín'}
                                              </>
                                            ) : (
                                              <>
                                                {order_item?.color?.map(
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
                                        {lang === 'EN' ? 'Size' : 'Méret'} →{' '}
                                        <OrderFilterContainer>
                                          {order_item.color.length === 0 ? (
                                            <>
                                              {lang === 'EN'
                                                ? 'No size selected'
                                                : 'Nincs kiválasztva méret'}
                                            </>
                                          ) : (
                                            <>
                                              <Filter>
                                                <FilterSize>
                                                  {order_item?.size?.map(
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
                                    </div>{' '}
                                  </div>
                                  <i
                                    onClick={toggleOrderDIV}
                                    className={
                                      orderDiv
                                        ? 'fa-solid fa-circle-chevron-up down_arrow_order_color'
                                        : 'fa-solid fa-circle-chevron-down down_arrow_order_color'
                                    }
                                  ></i>
                                </>
                              ))}
                              <div
                                className={
                                  orderDiv
                                    ? 'order_item_shipping_details'
                                    : 'order_item_shipping_details_hide'
                                }
                              >
                                {/* {Object.keys(order.shippingAddress).map(
                                (userlist) => (
                                  <div key={userlist}>
                                    <span className="input-label">
                                      {userlist}
                                    </span>
                                  </div>
                                )
                              )} */}
                                <h1>
                                  {lang === 'EN'
                                    ? 'Shipping Details'
                                    : 'Szállítási adatok'}
                                </h1>
                                <p style={{ lineHeight: '2rem' }}>
                                  <strong>
                                    {lang === 'EN' ? 'Name' : 'Név'} &#x2192;
                                    &nbsp;
                                  </strong>
                                  <span className="addressINFOColor">
                                    {order.shippingAddress.fullName}
                                  </span>
                                  <br />
                                  <strong>
                                    {lang === 'EN' ? 'Address' : 'Cím'} &#x2192;
                                    &nbsp;
                                  </strong>
                                  <span className="addressINFOColor">
                                    {order.shippingAddress.address}, &nbsp;
                                    {order.shippingAddress.city}, &nbsp;
                                    {order.shippingAddress.postalCode}, &nbsp;
                                    {order.shippingAddress.country}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* right */}
                          <div className="order_item_new_right">
                            <div className="new_right_divs">
                              <b>{order.totalPrice.toFixed(2)}</b> HUF
                            </div>
                            <div className="new_right_divs">
                              {order.isPaid ? (
                                <>
                                  {lang === 'EN' ? (
                                    <>Paid → Yes</>
                                  ) : (
                                    <>Fizetett → Igen</>
                                  )}
                                  <Tippy
                                    content={order.paidAt.substring(0, 10)}
                                    placement="top"
                                  >
                                    <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                                  </Tippy>
                                </>
                              ) : (
                                <>
                                  {lang === 'EN' ? (
                                    <>Paid → No</>
                                  ) : (
                                    <>Fizetett → Nem</>
                                  )}
                                  <Tippy content="Not Paid" placement="top">
                                    <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                                  </Tippy>
                                </>
                              )}
                            </div>
                            <div className="new_right_divs">
                              {' '}
                              {order.isDelivered ? (
                                <>
                                  {lang === 'EN' ? (
                                    <>Delivered → Yes</>
                                  ) : (
                                    <>Szállítva → Igen</>
                                  )}
                                  <Tippy
                                    content={order.deliveredAt.substring(0, 10)}
                                    placement="top"
                                  >
                                    <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                                  </Tippy>
                                </>
                              ) : (
                                <>
                                  {lang === 'EN' ? (
                                    <>Delivered → No</>
                                  ) : (
                                    <>Fizetett → Nem</>
                                  )}
                                  <Tippy
                                    content="Not Delivered"
                                    placement="top"
                                  >
                                    <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                                  </Tippy>
                                </>
                              )}
                            </div>
                            <div className="new_right_divs">
                              <div className="buttonsRow">
                                <button
                                  type="button"
                                  className="small"
                                  onClick={() => {
                                    navigate(`/order/${order._id}`);
                                  }}
                                >
                                  {/* {lang === 'EN' ? 'Details' : 'Részletek'} */}
                                  <i class="fa-solid fa-eye"></i>
                                  {/* <i className="fas regular fa-circle-info UI_icon_small"></i> */}
                                </button>{' '}
                                &nbsp;
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
