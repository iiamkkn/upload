import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../CSS/RegisterScreen.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { register, clearErrors } from '../../actions_v1/userActions';

export default function RegisterScreenv1() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const { name, username, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, error, loading } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      // alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, redirect, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('username', username);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // const [name, setName] = useState('');
  // const [username, setUserame] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const userRegister = useSelector((state) => state.userRegister);
  // const { userInfo, loading, error } = userRegister;

  // const dispatch = useDispatch();
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     toast('Password and confirm password are not match');
  //   } else {
  //     dispatch(registerv1(name, username, email, password));
  //   }
  // };
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  return (
    <>
      <div className="Main-Container">
        <Helmet>
          <title>Create a new account</title>
        </Helmet>

        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <center>
          <div class="container">
            <header>Register Now</header>

            <div class="form-outer">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div class="Signinpage slide-page">
                  <div class="field">
                    <div class="Signinlabel">Name</div>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter name"
                      required
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">username</div>
                    <input
                      type="username"
                      id="username"
                      placeholder="Enter username"
                      required
                      name="username"
                      value={username}
                      onChange={onChange}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">Email</div>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      required
                      name="email"
                      value={email}
                      onChange={onChange}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">Password</div>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      required
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                  </div>
                  <div class="field">
                    <div class="Signinlabel">Avatar</div>
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="iamges/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                  <div class="field">
                    <button
                      class="firstNext next"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      Register
                    </button>
                  </div>
                  <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signinv1?redirect=${redirect}`}>Sign-In</Link>
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
