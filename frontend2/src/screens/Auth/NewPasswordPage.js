import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetPassword_FUNC, clearErrors } from '../../actions_v1/userActions';
import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

export const NewPasswordPage = () => {
  const location = useLocation();
  const userToken = location.pathname.split('/')[3];
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [ErrorMSG, setErrorMSG] = useState('');
  const [SUCCESSMSG, setSUCCESSMSG] = useState('');

  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  useEffect(() => {
    if (error) {
      setErrorMSG(
        `${error} <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>`
      );
      setErrorMSG('');
      dispatch(clearErrors());
    }

    if (success) {
      setSUCCESSMSG(
        `<span class="SUSSColorz"> Password has been updated successfully. <i class="fa-regular fa-circle-check UI_icon_small_tickforget"></i></span>`
      );
      setErrorMSG('');
      //   navigate('/signin');
    }
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, success, navigate, userInfo, redirect, loading]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      password === '' ||
      confirmPassword === '' ||
      (password === '' && confirmPassword === '')
    ) {
      setErrorMSG(
        '<span class="errorColorz">Please enter your both password. It cannot be empty.<i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
      );
      setSUCCESSMSG('');
    } else if (password !== confirmPassword) {
      setErrorMSG(
        '<span class="errorColorz">Confirm Passowrd does not match.<i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
      );
      setSUCCESSMSG('');
    } else if (!userToken) {
      setErrorMSG('Password reset token is invalid or has been expired');
      setSUCCESSMSG('');
    } else {
      const formData = new FormData();
      formData.set('password', password);
      formData.set('confirmPassword', confirmPassword);

      dispatch(resetPassword_FUNC(params.token, formData));
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
            <h1 className="mb-3">Change Password</h1>

            <div class="box" controlId="password">
              <input
                class="input"
                type="password"
                name="password"
                id="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="password">New Password</label>
            </div>

            <div class="box" controlId="confirmPassword">
              <input
                class="input"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label for="confirmPassword">Confirm Password</label>
            </div>

            <div class="box_btn">
              <button type="submit" className="DefaultBTN">
                {loading ? <OnlyLoading /> : 'Update Password'}
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

export default NewPasswordPage;
