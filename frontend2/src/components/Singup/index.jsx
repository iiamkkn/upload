import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    // lastName: '',
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://91.227.139.152/api/account/signup/user_verify';
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

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="User Name"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            {/* <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            /> */}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              // required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
