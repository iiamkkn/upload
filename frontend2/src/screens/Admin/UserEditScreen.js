import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { detailsUser, updateUser } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import '../CSS/others.css';

export default function UserEditScreen(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  // const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userslist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <form className="form" onSubmit={submitHandler}>
            <center>
              <br />
              <h1
                className="h1ColorClass My_mob_store_history"
                style={{ fontSize: '1.5rem' }}
              >
                Edit "{name}"
              </h1>
              {loadingUpdate && <OnlyLoading></OnlyLoading>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
            </center>

            <div class="contField">
              <div class="box" controlId="name">
                <input
                  class="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label for="name">Name</label>
              </div>

              <div class="box" controlId="email">
                <input
                  class="input"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label for="email">Name</label>
              </div>

              <div class="radio-cont isSellAdmnRadio">
                <label>
                  <input
                    type="radio"
                    value="isSeller"
                    name="isSeller"
                    id="isSeller"
                    checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}
                  />
                  <span class="check"></span>
                  <span>Is Seller</span>
                </label>

                <label>
                  <input
                    type="radio"
                    value="isAdmin"
                    name="isAdmin"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span class="check"></span>
                  <span>Is Admin</span>
                </label>
              </div>

              <div>
                <button type="submit" className="userUpdateBTN">
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      <Footer />
    </>
  );
}
