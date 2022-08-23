import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Singup/styles.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import '../../screens/CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';

const UserForgetPassUpdate = () => {
  const location = useLocation();
  const userToken = location.pathname.split('/')[3];
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [ErrorMSG, setErrorMSG] = useState('');
  const [SUCCESSMSG, setSUCCESSMSG] = useState('');

  const [data, setData] = useState({
    email: '',
  });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   password === '' ||
    //   confirmPassword === '' ||
    //   (password === '' && confirmPassword === '')
    // ) {
    //   setErrorMSG(
    //     '<span class="errorColorz">Please enter your both password. It cannot be empty.<i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
    //   );
    //   setSUCCESSMSG('');
    // } else if (password !== confirmPassword) {
    //   setErrorMSG(
    //     '<span class="errorColorz">Confirm Passowrd does not match.<i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i></span>'
    //   );
    //   setSUCCESSMSG('');
    // } else if (!userToken) {
    //   setErrorMSG('Password reset token is invalid or has been expired');
    //   setSUCCESSMSG('');
    // } else {
    try {
      const url = `http://91.227.139.152/api/account/signup/user_forgetpass_update/${userToken}`;
      const { data: res } = await axios.put(url, data);
      setMsg(res.message);
      setError('');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg('');
      }
      // }
    }
  };
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (error) {
      setErrorMSG(
        `${error} <i className="fa-regular fa-circle-xmark UI_icon_small_cross"></i>`
      );
      setErrorMSG('');
    }

    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, userInfo, redirect]);
  const lang = localStorage.getItem('lang' || 'HU');

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Update Password' : 'Jelszó frissítése'}</title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <center>
        <form onSubmit={handleSubmit}>
          <div class="contField">
            <h1 className="mb-3">Change Password</h1>
            <div class="box" controlId="password">
              <input
                class="input"
                type="password"
                name="password"
                id="password"
                placeholder="Enter New Password"
                onChange={handleChange}
                value={data.password}
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
                onChange={handleChange}
                value={data.confirmPassword}
              />
              <label for="confirmPassword">Confirm Password</label>
            </div>
            {error && (
              <div className={styles.error_msgNew}>
                {error} &nbsp;
                <i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i>
              </div>
            )}
            {msg && (
              <div className={styles.success_msgNew}>
                <b style={{ color: 'black' }}>{msg}</b> &nbsp;
                <i class="fa-regular fa-circle-check UI_icon_small_tickforget"></i>
              </div>
            )}
            {parse(ErrorMSG)}
            {parse(SUCCESSMSG)}
            <div class="box_btn">
              <button type="submit" className="DefaultBTN">
                Update Password
              </button>
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

export default UserForgetPassUpdate;
