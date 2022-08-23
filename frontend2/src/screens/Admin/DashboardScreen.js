import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import MessageBox from '../../components/LoadingBox/MessageBox';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const options = {
    title: 'All Categories',
    is3D: true,
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="row">
          <h1>Dashboard</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : // : (
        userInfo.isAdmin ? (
          <>
            <ul className="row summary">
              <li>
                <div className="summary-title color1">
                  <span>
                    <i className="fa fa-users" /> Users
                  </span>
                </div>
                <div className="summary-body">{summary.users[0].numUsers}</div>
              </li>
              <li>
                <div className="summary-title color2">
                  <span>
                    <i className="fa fa-shopping-cart" /> Orders
                  </span>
                </div>
                <div className="summary-body">
                  {summary.orders[0] ? summary.orders[0].numOrders : 0}
                </div>
              </li>
              <li>
                <div className="summary-title color3">
                  <span>
                    <i className="fa fa-money" /> Sales
                  </span>
                </div>
                <div className="summary-body">
                  <div className="summary_huf">
                    {summary.orders[0]
                      ? summary.orders[0].totalSales.toFixed(2) + ' HUF'
                      : 0}
                  </div>
                </div>
              </li>
              <li>
                <div className="summary-title color3">
                  <span>
                    <i className="fa fa-money" /> OrdersNum
                  </span>
                </div>
                <div className="summary-body">
                  <div className="summary_huf">
                    {summary.SellNum[0]
                      ? summary.SellNum[0].sellerNumOrdertotal
                      : 0}
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <div className="SalesDiv">
                <h2>Sales</h2>
                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Chart
                    width="100%"
                    height="400px"
                    chartType="AreaChart"
                    loader={<OnlyLoading>Loading Chart</OnlyLoading>}
                    data={[
                      ['Date', 'Sales'],
                      ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                    ]}
                  ></Chart>
                )}
              </div>
            </div>
            <div className="CategoriesDiv">
              <h2>Categories</h2>
              {summary.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  options={options}
                  loader={<OnlyLoading>Loading Chart</OnlyLoading>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                />
              )}
            </div>
          </>
        ) : (
          <h1>unauthorized..!!!</h1>
        )}
      </div>
      <Footer />
    </>
  );
}
