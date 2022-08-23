import React, { useState } from 'react';
import './Auth.css';
import { logIn, signUp } from '../../actions/zain/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const zainAuthReducer = useSelector((state) => state.zainAuthReducer);
  const { loading, error } = zainAuthReducer;

  // const loading = useSelector((state) => state.authReducer.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPassword, setconfirmPassword] = useState(true);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setconfirmPassword(true);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setconfirmPassword(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmPassword
        ? dispatch(signUp(data, navigate))
        : setconfirmPassword(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <div className="Webname">
          <h1>Login/Register</h1>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Register' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder=" Name"
                className="infoInput"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Email"
                className="infoInput"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
              display: confirmPassword ? 'none' : 'block',
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? 'Already have an account Login'
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
              {error && { error }}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
