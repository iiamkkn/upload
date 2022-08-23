import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, clearErrors } from '../../actions_v1/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';

// import { useAlert } from 'react-alert';

export default function SigninScreenv1() {
  // const alert = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo, loading, error } = userSignin;

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, error, loading } = auth;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
      // window.location.reload();
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, redirect, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <div className="Main-Container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>

        <center>
          <div className="container">
            <header>Zalazon.</header>

            <div className="form-outer">
              <form onSubmit={submitHandler}>
                <div className="Signinpage slide-page">
                  <div className="field">
                    <div className="Signinlabel">Email</div>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter Your Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <div className="Signinlabel">Password</div>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter Your Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <button className="firstNext next" type="submit">
                      Sign in
                    </button>
                  </div>
                  <Link to="/password/forgot" className="float-right mb-4">
                    Forgot Password?
                  </Link>
                  <br />
                  <div className="mb-3">
                    New customer?{' '}
                    <Link to={`/registerv1?redirect=${redirect}`}>
                      Create your account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </center>
      </div>
    </>
  );
}
