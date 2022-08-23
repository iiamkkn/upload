import { useState } from 'react';
import axios from 'axios';
import styles from '../Singup/styles.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../../screens/CSS/SigninScreen.css';
import { Helmet } from 'react-helmet-async';

const UserForgetPass = () => {
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
    try {
      const url = 'http://91.227.139.152/api/account/signup/user_forgetpass';
      const { data: res } = await axios.post(url, data);
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
    }
  };

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    // <div className={styles.signup_container}>
    //   <div className={styles.signup_form_container}>
    //     <div className={styles.left}>
    //       <h1>Welcome Back</h1>
    //       <Link to="/login">
    //         <button type="button" className={styles.white_btn}>
    //           Sing in
    //         </button>
    //       </Link>
    //     </div>
    //     <div className={styles.right}>
    //       <form className={styles.form_container} onSubmit={handleSubmit}>
    //         <h1>Create Account</h1>

    //         <input
    //           type="email"
    //           placeholder="Email"
    //           name="email"
    //           onChange={handleChange}
    //           value={data.email}
    //           required
    //           className={styles.input}
    //         />

    //         {error && <div className={styles.error_msg}>{error}</div>}
    //         {msg && <div className={styles.success_msg}>{msg}</div>}
    //         <button type="submit" className={styles.green_btn}>
    //           Send Password
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <>
      <Helmet>
        <title>
          {lang === 'EN' ? 'Reset Password' : 'Jelszó visszaállítása'}
        </title>
      </Helmet>
      <Navbar />
      <br />
      <br />
      <center>
        <form onSubmit={handleSubmit}>
          <div class="contField">
            <h1 className="mb-3">Reset Password</h1>
            <div class="box" controlId="email">
              <input
                class="input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={handleChange}
                value={data.email}
                required
              />
              <label for="email">Enter Email</label>
            </div>
            {error && (
              <div className={styles.error_msgNew}>
                {error}
                <i className="fa-regular fa-circle-xmark UI_icon_small_crossforget"></i>
              </div>
            )}
            {msg && (
              <div className={styles.success_msgNew}>
                Link sent to: <b style={{ color: 'black' }}>{msg}</b>
                <i class="fa-regular fa-circle-check UI_icon_small_tickforget"></i>
              </div>
            )}
            <div class="box_btn">
              <button type="submit" className="DefaultBTN">
                Send Password
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

export default UserForgetPass;
