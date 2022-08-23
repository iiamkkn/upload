import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';

import { forgotPassword_FUNC, clearErrors } from '../../actions_v1/userActions';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { error, loading, message } = forgotPassword;

  const [ErrorMSG, setErrorMSG] = useState('');
  const [SUCCESSMSG, setSUCCESSMSG] = useState('');

  useEffect(() => {
    if (error) {
      // alert(error);
      setErrorMSG(
        `${error} <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>`
      );
      setErrorMSG('');
      dispatch(clearErrors());
    }

    if (message) {
      // alert(message);
      setSUCCESSMSG(`<span class="SUSSColorz">${message} </span>`);
      setErrorMSG('');
    }

    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, message, navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '') {
      setErrorMSG(
        '<span class="errorColorz">Please enter your email address. <i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
      );
      setSUCCESSMSG('');
    } else {
      const PassformData = new FormData();
      PassformData.set('email', email);

      dispatch(forgotPassword_FUNC(PassformData));
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <center>
        <form onSubmit={submitHandler}>
          <div class="contField">
            <h1 className="mb-3">Reset Password</h1>
            <div class="box" controlId="email">
              <input
                class="input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
              <label for="email">Enter Email</label>
            </div>
            <div class="box_btn">
              <button
                type="submit"
                className="DefaultBTN"
                disabled={loading ? true : false}
              >
                {loading ? <OnlyLoading /> : 'Send Password'}
              </button>
              {parse(ErrorMSG)}
              {parse(SUCCESSMSG)}
            </div>
          </div>
        </form>
      </center>
      <br />
      <br />

      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
