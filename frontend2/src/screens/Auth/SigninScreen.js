import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import '../CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      // window.location.reload();
    }
  }, [navigate, redirect, userInfo]);
  const lang = localStorage.getItem('lang' || 'HU');

  return (
    <>
      <Navbar />

      {/* {loading && <LoadingBox></LoadingBox>} */}
      {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
      <div className="Main-Container">
        <Helmet>
          <title>{lang === 'EN' ? 'Sign In' : 'Bejelentkezés'}</title>
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
                      placeholder={
                        lang === 'EN'
                          ? 'Enter Email'
                          : 'Írja be az e-mail címet'
                      }
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <div className="Signinlabel">
                      {' '}
                      {lang === 'EN' ? 'Password' : 'Jelszó'}
                    </div>
                    <input
                      type="password"
                      id="password"
                      placeholder={
                        lang === 'EN' ? 'Enter Password' : 'Írd be a jelszót'
                      }
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error ? <div className="login_err_msg">{error}</div> : ''}
                  <div className="field">
                    <div className="Signinlabel">
                      <Link to="/PasswordReset" className="pass_forgot_tit">
                        {lang === 'EN'
                          ? '  Forgot Password'
                          : ' Elfelejtett jelszó '}
                      </Link>
                    </div>
                  </div>

                  <div className="field">
                    <button
                      className="firstNext next"
                      type="submit"
                      style={{ marginTop: '-5rem' }}
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <>
                          <OnlyLoading />
                        </>
                      ) : (
                        <> {lang === 'EN' ? ' Sign-In' : ' Bejelentkezés'}</>
                      )}
                    </button>
                  </div>

                  <div className="mb-3" style={{ marginTop: '0rem' }}>
                    {lang === 'EN' ? ' New customer? ' : ' Új vevő? '}

                    <Link to={`/register?redirect=${redirect}`}>
                      {lang === 'EN'
                        ? '  Create your account '
                        : ' Hozd létre fiókodat '}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </center>
      </div>
      <Footer />
    </>
  );
}
