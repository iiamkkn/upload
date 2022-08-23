import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { Helmet } from 'react-helmet-async';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import '../CSS/ProductListScreen.css';
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

export default function OrderListScreenSeller(props) {
  // const location = useLocation();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  // const sellerMode = location.pathname.indexOf('/seller') >= 0;
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  // window.location.reload();
  const lang = localStorage.getItem('lang' || 'HU');

  const [orderDiv, setorderDiv] = useState(false);
  const toggleOrderDIV = () => {
    setorderDiv((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />

      <Helmet>
        <title>
          {' '}
          {lang === 'EN' ? 'My Store Orders' : 'Bolti rendeléseim'}
        </title>
      </Helmet>
      <div className="main-product-container">
        <h1 className="My_mob_store_history">
          {' '}
          {lang === 'EN'
            ? 'My Store Orders History'
            : 'Bolti rendeléseim előzményei'}
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
                  {lang === 'EN' ? 'Total Orders' : 'Összes rendelés'}
                </span>
              </div>
              <div className="summary-body bgcolortotNum">{orders?.length}</div>
            </li>
            {/* <li>
            <div className="summary-title color1">
              <span>
                <i className="fa fa-money" /> Paid Orders
              </span>
            </div>
            <div className="summary-body">{orders?.isPaid?.length}</div>
          </li> */}
            {/* <li>
            <div className="summary-title color3">
              <span>
                <i className="fa fa-money" /> Unpaid Orders
              </span>
            </div>
            <div className="summary-body">
              <div className="summary_huf">{orders?.isDelivered?.length}</div>
            </div>
          </li> */}
          </ul>
        </center>
        <div className="summary-body"></div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {orders?.length === 0 ? (
              <div className="No_seller_product_msg_div">
                {lang === 'EN'
                  ? 'You do not have any orders yet.'
                  : 'Még nincsenek rendelései.'}
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
                                  <div className="order_item_id_new">
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
                                  </div>
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
                                <button
                                  type="button"
                                  className="small"
                                  onClick={() => deleteHandler(order)}
                                >
                                  {/* {lang === 'EN' ? 'Delete' : 'Töröl'} */}
                                  <i className="fa-regular fa-trash-can"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                  {/* old design */}
                  {/* <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{lang === 'EN' ? 'USER' : 'FELHASZNÁLÓ'}</th>

                        <th>{lang === 'EN' ? 'DATE' : 'DÁTUM'}</th>
                        <th>{lang === 'EN' ? 'TOTAL PRICE' : 'TELJES ÁR'}</th>
                        <th>{lang === 'EN' ? 'PAID' : 'FIZETETT'}</th>
                        <th>{lang === 'EN' ? 'DELIVERED' : 'SZÁLLÍTVA'}</th>
                        <th>
                          <div className="buttonsRow">
                            {lang === 'EN' ? 'ACTIONS' : 'AKCIÓK'}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <>
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
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
                                    {lang === 'EN' ? 'No Name' : 'Névtelen'}
                                  </span>
                                </>
                              )}
                            </td>

                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>
                              {order.isPaid ? (
                                <>
                                  {lang === 'EN' ? 'Yes' : 'Igen'}
                                  <Tippy
                                    content={order.paidAt.substring(0, 10)}
                                    placement="top"
                                  >
                                    <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                                  </Tippy>
                                </>
                              ) : (
                                <>
                                  {lang === 'EN' ? 'No' : 'Nem'}
                                  <Tippy content="Not Paid" placement="top">
                                    <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                                  </Tippy>
                                </>
                              )}
                            </td>
                            <td>
                              <div className="buttonsRow">
                                {order.isDelivered ? (
                                  <>
                                    {lang === 'EN' ? 'Yes' : 'Igen'}
                                    <Tippy
                                      content={order.deliveredAt.substring(
                                        0,
                                        10
                                      )}
                                      placement="top"
                                    >
                                      <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                                    </Tippy>
                                  </>
                                ) : (
                                  <>
                                    {lang === 'EN' ? 'No' : 'Nem'}
                                    <Tippy
                                      content="Not Delivered"
                                      placement="top"
                                    >
                                      <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                                    </Tippy>
                                  </>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="buttonsRow">
                                <button
                                  type="button"
                                  className="small"
                                  onClick={() => {
                                    navigate(`/order/${order._id}`);
                                  }}
                                >
                                  {lang === 'EN' ? 'Details' : 'Részletek'}
                                  <i className="fas regular fa-circle-info UI_icon_small"></i>
                                </button>
                                <button
                                  type="button"
                                  className="small"
                                  onClick={() => deleteHandler(order)}
                                >
                                  {lang === 'EN' ? 'Delete' : 'Töröl'}
                                  <i className="fa-regular fa-trash-can UI_icon_small"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table> */}
                </div>
                {/* tableDiv for mobile View */}
                <div className="tableDiv_mobile">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="tableDiv_mobile_main_container"
                    >
                      <div className="tableDiv_top">
                        <div>
                          <b style={{ color: 'rgb(94 94 94 ' }}>
                            {' '}
                            {lang === 'EN' ? 'Buyer → ' : 'Vevő → '}
                          </b>

                          <span className="top_product_Link_mob">
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
                                  {lang === 'EN' ? 'No Name ' : 'Névtelen '}
                                </span>
                              </>
                            )}
                          </span>
                        </div>
                        <div className="smallFont_mob">
                          {' '}
                          {lang === 'EN' ? 'Order ' : 'Rendelés '} Id:{' '}
                          {order._id}
                        </div>
                      </div>
                      <div className="tableDiv_bottom">
                        <div>
                          {/* Price:  */}
                          <b>{order.totalPrice.toFixed(2)} HUF</b>
                        </div>
                      </div>

                      <div className="tableDiv_bottom">
                        <div className="smallFont_mob">
                          {/* <b>{order.shippingAddress.fullName}</b> */}

                          {order.orderItems.map((c) => (
                            <span key={c._id}>
                              {/* {lang === 'EN' ? 'Color:' : 'Szín:'}{' '} */}
                              <FilterColor color={c.color} />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="tableDiv_bottom">
                        <div className="smallFont_mob">
                          <b>{lang === 'EN' ? 'Paid' : 'Fizetett'}: </b>
                          {order.isPaid ? (
                            <>
                              {lang === 'EN' ? 'Yes at ' : 'Igen '}
                              {order.createdAt.substring(0, 10)}
                              <Tippy
                                content={order.paidAt.substring(0, 10)}
                                placement="top"
                              >
                                <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                              </Tippy>
                            </>
                          ) : (
                            <>
                              {lang === 'EN' ? 'No ' : 'Nem '}
                              <Tippy content="Not Paid" placement="top">
                                <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                              </Tippy>
                            </>
                          )}
                        </div>
                        <div className="smallFont_mob">
                          <b>{lang === 'EN' ? 'Delivered ' : 'Szállítva '}: </b>{' '}
                          {order.isDelivered ? (
                            <>
                              {lang === 'EN' ? 'Yes ' : 'Igen '}
                              <Tippy
                                content={order.deliveredAt.substring(0, 10)}
                                placement="top"
                              >
                                <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                              </Tippy>
                            </>
                          ) : (
                            <>
                              {lang === 'EN' ? 'No ' : 'Nem '}
                              <Tippy content="Not Delivered" placement="top">
                                <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                              </Tippy>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="buttonsRow_mob">
                        <button type="button" className="top_mob_buttons">
                          <Link
                            to={`/order/${order._id}`}
                            className="top_product_Link_mob"
                          >
                            <i class="fa-solid fa-eye"></i>
                          </Link>
                        </button>
                        {/* <button
                      style={{ color: '#2ad100' }}
                      type="button"
                      className="top_mob_buttons"
                      onClick={() => navigate(`/order/${order._id}/edit`)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button> */}
                        <button
                          style={{ color: '#eb1212' }}
                          type="button"
                          className="top_mob_buttons"
                          onClick={() => deleteHandler(order)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
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
