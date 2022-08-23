import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import '../CSS/ProductListScreen.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function UserListScreen(props) {
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Navbar />

      <Helmet>
        <title>
          {lang === 'EN'
            ? 'All Registered Users'
            : 'Minden regisztrált felhasználó'}
        </title>
      </Helmet>
      <div className="main-product-container">
        <h1 className="My_mob_store_history">
          {lang === 'EN' ? 'All Users' : 'Minden felhasználó'}
        </h1>
        <center>
          <ul
            className="row summary total_product_num_store"
            style={{ marginLeft: '-2rem' }}
          >
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-users" />{' '}
                  {lang === 'EN' ? 'Total Users' : 'Felhasználó'}
                </span>
              </div>
              <div className="summary-body">{users?.length}</div>
            </li>
          </ul>
        </center>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && (
          <MessageBox variant="success">
            {lang === 'EN'
              ? 'User Deleted Successfully'
              : 'Felhasználó sikeresen törölve'}
          </MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="tableDiv">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{lang === 'EN' ? 'NAME' : 'NÉV'}</th>
                    <th>{lang === 'EN' ? 'EMAIL' : 'EMAIL'}</th>
                    <th>{lang === 'EN' ? 'IS SELLER' : 'AZ ELADÓ'}</th>
                    <th>{lang === 'EN' ? 'IS ADMIN' : 'AZ ADMIN'}</th>
                    <th>
                      <div className="buttonsRow">
                        {lang === 'EN' ? 'ACTIONS' : 'AKCIÓK'}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isSeller ? (
                          <>
                            {lang === 'EN' ? 'Yes' : 'Igen'}
                            <Tippy content="Seller" placement="top">
                              <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                            </Tippy>
                          </>
                        ) : (
                          <>
                            {lang === 'EN' ? 'No' : 'Nem'}
                            <Tippy content="Not Seller" placement="top">
                              <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                            </Tippy>
                          </>
                        )}
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <>
                            {lang === 'EN' ? 'Yes' : 'Igen'}
                            <Tippy content="Admin" placement="top">
                              <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                            </Tippy>
                          </>
                        ) : (
                          <>
                            {lang === 'EN' ? 'No' : 'Nem'}
                            <Tippy content="Not Admin" placement="top">
                              <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                            </Tippy>
                          </>
                        )}
                      </td>
                      <td>
                        <div className="buttonsRow">
                          <button
                            type="button"
                            className="small"
                            onClick={() => navigate(`/user/${user._id}/edit`)}
                          >
                            {lang === 'EN' ? 'Edit' : 'Szerkesztés'}
                            <i className="fa-regular fa-pen-to-square UI_icon_small"></i>
                          </button>
                          <button
                            type="button"
                            className="small"
                            onClick={() => deleteHandler(user)}
                          >
                            {lang === 'EN' ? 'Delete' : 'Töröl'}
                            <i className="fa-regular fa-trash-can UI_icon_small"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* tableDiv for mobile View */}
            <div className="tableDiv_mobile">
              {users.map((user) => (
                <div key={user._id} className="tableDiv_mobile_main_container">
                  <div className="tableDiv_top">
                    <div>
                      <b style={{ color: 'rgb(94 94 94 ' }}>
                        {' '}
                        {lang === 'EN' ? 'User:' : 'Felhasználó:'}
                      </b>

                      <span className="top_product_Link_mob"> {user.name}</span>
                    </div>
                    <div className="smallFont_mob">
                      {lang === 'EN' ? 'Email:' : 'Email:'}: {user.email}
                    </div>
                  </div>
                  <div className="tableDiv_bottom">
                    <div>
                      <b>
                        {' '}
                        {user.isSeller ? (
                          <>
                            {lang === 'EN' ? 'Yes' : 'Igen'}
                            <Tippy content="Seller" placement="top">
                              <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                            </Tippy>
                          </>
                        ) : (
                          <>
                            {lang === 'EN' ? 'No' : 'Nem'}
                            <Tippy content="Not Seller" placement="top">
                              <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                            </Tippy>
                          </>
                        )}
                      </b>
                    </div>
                    <div>
                      <b>
                        {user.isAdmin ? (
                          <>
                            {lang === 'EN' ? 'Yes' : 'Igen'}
                            <Tippy content="Admin" placement="top">
                              <i className="fa-regular fa-circle-check UI_icon_small_tick"></i>
                            </Tippy>
                          </>
                        ) : (
                          <>
                            {lang === 'EN' ? 'No' : 'Nem'}
                            <Tippy content="Not Admin" placement="top">
                              <i class="fa-regular fa-circle-xmark UI_icon_small_cross"></i>
                            </Tippy>
                          </>
                        )}
                      </b>
                    </div>
                  </div>

                  <div className="buttonsRow_mob">
                    <button
                      style={{ color: '#2ad100' }}
                      type="button"
                      className="top_mob_buttons"
                      onClick={() => navigate(`/user/${user._id}/edit`)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      style={{ color: '#eb1212' }}
                      type="button"
                      className="top_mob_buttons"
                      onClick={() => deleteHandler(user)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
