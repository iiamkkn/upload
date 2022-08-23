import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../CSS/RegisterScreen.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { register } from '../../actions/userActions';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { toast, ToastContainer } from 'react-toastify';
export default function RegisterScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warn(
        'A jelszavak nem egyeznek. Próbáld újra —— Passwords does not match. Try again',
        {
          theme: 'dark',
        }
      );
    } else {
      dispatch(register(name, username, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const lang = localStorage.getItem('lang' || 'HU');

  return (
    <>
      {' '}
      <Navbar /> <ToastContainer position="bottom-center" limit={1} />
      <div className="Main-Container">
        <Helmet>
          <title> {lang === 'EN' ? 'Register Now' : 'Regisztrálj most'}</title>
        </Helmet>

        {/* {loading && <LoadingBox></LoadingBox>} */}
        {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
        <center>
          <div class="container">
            <header>
              {lang === 'EN' ? 'Register Now' : 'Regisztrálj most'}
            </header>

            <div class="form-outer">
              <form onSubmit={submitHandler}>
                <div class="Signinpage slide-page">
                  <div class="field">
                    <div class="Signinlabel">
                      {lang === 'EN' ? ' Your Full Name' : 'A teljes neved'}
                    </div>
                    <input
                      type="text"
                      id="name"
                      placeholder={
                        lang === 'EN' ? ' Your Full Name' : 'A teljes neved'
                      }
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">
                      {' '}
                      {lang === 'EN' ? 'username' : 'felhasználónév'}
                    </div>
                    <input
                      type="username"
                      id="username"
                      placeholder={
                        lang === 'EN'
                          ? 'Enter username'
                          : 'Adja meg felhasználónevét'
                      }
                      required
                      onChange={(e) => setUserame(e.target.value)}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">Email</div>
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
                  <div class="field">
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
                  <div class="field">
                    <div class="Signinlabel">
                      {lang === 'EN'
                        ? ' Confirm Password'
                        : 'Jelszó megerősítése'}
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder={
                        lang === 'EN'
                          ? 'Enter Confirm Password'
                          : 'Írja be a Jelszó megerősítését'
                      }
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>{' '}
                  {error ? (
                    <div className="error_reg_mgs_div">
                      <div>{error}</div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div class="field">
                    <button
                      class="firstNext next"
                      type="submit"
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
                  <div className="mb-3">
                    {lang === 'EN'
                      ? 'Already have an account? '
                      : 'Már van fiókja? '}
                    <Link to={`/signin?redirect=${redirect}`}>
                      {lang === 'EN' ? ' Sign-In' : ' Bejelentkezés'}
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
