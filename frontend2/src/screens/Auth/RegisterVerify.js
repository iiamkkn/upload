import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';

import { Register_verify, clearErrors } from '../../actions_v1/userActions';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

export const RegisterVerify = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const Register_verify_Req = useSelector((state) => state.Register_verify_Req);
  const { error, loading, message } = Register_verify_Req;

  const [ErrorMSG, setErrorMSG] = useState('');
  const [SUCCESSMSG, setSUCCESSMSG] = useState('');

  useEffect(() => {
    if (error) {
      // alert(error);
      setErrorMSG(
        // `${error} <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>`
        ` An error occurs while registering you. Kindly try again later.<i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>`
      );
      setErrorMSG('');
      dispatch(clearErrors());
    }

    if (message) {
      // alert(message);
      setSUCCESSMSG(
        `<span className="SUSSColorz">Email has been sent Successfully. Kindy check your email address and activate your account. - Zalazon.<i className="fa-regular fa-circle-check UI_icon_small_tickforget"></i></span>`
        // `<span className="SUSSColorz">${message} <i className="fa-regular fa-circle-check UI_icon_small_tickforget"></i></span>`
      );
      setErrorMSG('');
    }

    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, message, navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '' || username === '' || name === '' || password === '') {
      setErrorMSG(
        '<span className="errorColorz">All fields must be filled. <i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
      );
      setSUCCESSMSG('');
    } else {
      dispatch(Register_verify(name, username, email, password));
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <>
        <form onSubmit={submitHandler}>
          <div className="contField">
            <h1 className="mb-3">Sign up - Zalazon.</h1>

            <div className="box" controlId="name">
              <input
                className="input"
                type="name"
                name="name"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // required
              />
              <label htmlFor="name">Enter Name</label>
            </div>

            <div className="box" controlId="email">
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
              />
              <label htmlFor="email">Enter Email</label>
            </div>

            <div className="box" controlId="username">
              <input
                className="input"
                type="username"
                name="username"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
              />
              <label htmlFor="username">Enter Username</label>
            </div>

            <div className="box" controlId="password">
              <input
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              <label htmlFor="password">Enter Password</label>
            </div>

            <div className="box_btn">
              <button
                type="submit"
                className="DefaultBTN"
                disabled={loading ? true : false}
              >
                {loading ? <OnlyLoading /> : 'Sign up'}
              </button>
              {parse(ErrorMSG)}
              {parse(SUCCESSMSG)}
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

export default RegisterVerify;
