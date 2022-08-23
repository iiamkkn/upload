import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import { Helmet } from 'react-helmet-async';

export default function OrderListScreen(props) {
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
  return (
    <>
      <Navbar />
      <div>
        <Helmet>
          <title>All Orders </title>
        </Helmet>
        <h1>Orders</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
