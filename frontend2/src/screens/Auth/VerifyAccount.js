import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';

import {
  Register_verify_Success,
  clearErrors,
} from '../../actions_v1/userActions';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const VerifyAccount = () => {
  const [password, setPassword] = useState('');

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const Register_verify_Req = useSelector((state) => state.Register_verify_Req);
  const { error, message } = Register_verify_Req;

  const location = useLocation();
  const token = location.pathname.split('/')[3];
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, navigate, userInfo, redirect]);

  // let token = params.RegisterverifyToken;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(Register_verify_Success(params.token));
  };

  return (
    <>
      <Helmet>
        <title>Account Verification</title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <>
        <form onSubmit={submitHandler}>
          <div className="contField">
            <h1 className="mb-3">Account Verification - Zalazon.</h1>

            <div className="box" controlId="token">
              <input
                class="input"
                type="text"
                name="token"
                id="token"
                placeholder="Enter  token"
                value={token}
                onChange={(e) => setPassword(e.target.value)}
              />

              <br />
            </div>

            <div className="box_btn">
              <button type="submit" className="DefaultBTN">
                Verify me
              </button>
            </div>
          </div>
        </form>
      </>
      <br />
      <br />

      <Footer />
    </>
  );
};

export default VerifyAccount;
