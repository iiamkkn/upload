import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

import { Helmet } from 'react-helmet-async';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import '../CSS/ProfileEdit.css';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import axios from 'axios';
import { getError } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import { AxiosInstance } from '../../api/AxiosInstance';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;
  const [ProductIMGsaved, setProductIMGsaved] = useState('');

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerCover, setSellerCover] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  const [{ loadingUpload }, dispatch1] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setImage(user.image);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerCover(user.seller.cover);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    // window.location.reload();

    e.preventDefault();
    // dispatch update profile
    if (password === '' || confirmPassword === '') {
      if (lang === 'EN') {
        toast.warn('Passwords input cannot be empty', { theme: 'dark' });
      }
      if (lang === 'HU') {
        toast.warn('A jelszó megadása nem lehet üres', { theme: 'dark' });
      }
    } else if (password !== confirmPassword) {
      toast.error('Password and Confirm Password Are Not Matched', {
        theme: 'dark',
      });
      if (lang === 'HU') {
        toast.warn('A jelszó és a Jelszó megerősítése nem egyezik', {
          theme: 'dark',
        });
      }
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          image,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerCover,
          sellerDescription,
        })
      );
    }
  };

  //  images upload handler
  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch1({ type: 'UPLOAD_REQUEST' });
      const { data } = await AxiosInstance.post(
        '/api/upload/image',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch1({ type: 'UPLOAD_SUCCESS' });

      setSellerLogo(data.secure_url);

      // else {
      //   setImage(data.secure_url);
      // }
      if (lang === 'EN') {
        setProductIMGsaved(
          'Image uploaded successfully. Click to save the product.'
        );
      }
      if (lang === 'HU') {
        setProductIMGsaved(
          'A kép sikeresen feltöltve. Kattintson a termék mentéséhez.'
        );
      }

      // setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const uploadFileHandlerCover = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch1({ type: 'UPLOAD_REQUEST' });
      const { data } = await AxiosInstance.post(
        '/api/upload/image',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch1({ type: 'UPLOAD_SUCCESS' });

      setSellerCover(data.secure_url);

      // else {
      //   setImage(data.secure_url);
      // }
      if (lang === 'EN') {
        setProductIMGsaved(
          'Image uploaded successfully. Click to save the product.'
        );
      }
      if (lang === 'HU') {
        setProductIMGsaved(
          'A kép sikeresen feltöltve. Kattintson a termék mentéséhez.'
        );
      }

      // setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const uploadFileHandlerUserImgae = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch1({ type: 'UPLOAD_REQUEST' });
      const { data } = await AxiosInstance.post(
        '/api/upload/image',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch1({ type: 'UPLOAD_SUCCESS' });

      setImage(data.secure_url);

      // else {
      //   setImage(data.secure_url);
      // }
      if (lang === 'EN') {
        setProductIMGsaved(
          'Image uploaded successfully. Click to save the product.'
        );
      }
      if (lang === 'HU') {
        setProductIMGsaved(
          'A kép sikeresen feltöltve. Kattintson a termék mentéséhez.'
        );
      }

      // setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Navbar />
      <Helmet>
        <title>
          {lang === 'EN' ? 'Profile Settings' : 'Profilbeállítások'}
        </title>
      </Helmet>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="main-Userprofile-container">
            <h1>{lang === 'EN' ? 'Profile Settings' : 'Profilbeállítások'}</h1>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <form onSubmit={submitHandler}>
              <div class="contField">
                <div class="upload-button">
                  <div className="sellerImgs">
                    <img
                      className="sellerImgLogo"
                      src={image}
                      alt="Profile_Photo"
                    />
                  </div>

                  <div>
                    <div class="additionalImage_upload-button">
                      <label controlId="imageFile">
                        <input
                          type="file"
                          name="file"
                          onChange={uploadFileHandlerUserImgae}
                        />
                        <i class="bx bx-upload"></i>
                      </label>
                      {loadingUpload ? (
                        <>
                          <OnlyLoading />
                        </>
                      ) : (
                        <>
                          <span>
                            {lang === 'EN' ? 'Edit Profile' : 'Profile'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div class="box" controlId="name">
                  <input
                    class="input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder={lang === 'EN' ? 'Name' : 'Név'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label for="name">{lang === 'EN' ? 'Name' : 'Név'}</label>
                </div>

                <div class="box" controlId="email">
                  <input
                    class="input"
                    name="email"
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label for="email">{lang === 'EN' ? 'Email' : 'Email'}</label>
                </div>

                <div class="box" controlId="password">
                  <input
                    class="input"
                    name="password"
                    id="password"
                    placeholder={lang === 'EN' ? 'Password' : 'Jelszó'}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label for="password">
                    {lang === 'EN' ? 'Password' : 'Jelszó'}
                  </label>
                </div>

                <div class="box" controlId="Confirmpassword">
                  <input
                    class="input"
                    name="Confirmpassword"
                    id="Confirmpassword"
                    placeholder={
                      lang === 'EN' ? 'Confirm Password' : 'Jelszó megerősítése'
                    }
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label for="Confirmpassword">
                    {lang === 'EN' ? 'Confirm Password' : 'Jelszó megerősítése'}
                  </label>
                </div>
              </div>

              {userInfo.isSeller && (
                <div className="SellerDIV">
                  <h2>
                    {lang === 'EN' ? 'Seller Settings ' : 'Eladó beállításai'}
                  </h2>
                  <div class="contField">
                    <div class="box" controlId="sellerName">
                      <input
                        class="input"
                        type="text"
                        name="sellerName"
                        id="sellerName"
                        placeholder={
                          lang === 'EN' ? 'Store Name' : 'Webáruház neve'
                        }
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        required
                      />
                      <label for="sellerName">
                        {lang === 'EN' ? 'Store Name' : 'Webáruház neve'}
                      </label>
                    </div>

                    <div class="box">
                      <textarea
                        class="input"
                        type="text"
                        name="sellerDescription"
                        id="sellerDescription"
                        placeholder={
                          lang === 'EN' ? 'Store Name' : 'Webáruház leírása'
                        }
                        value={sellerDescription}
                        onChange={(e) => setSellerDescription(e.target.value)}
                        required
                      ></textarea>
                      <label for="sellerDescription">
                        {lang === 'EN' ? 'Store Name' : 'Webáruház leírása'}
                      </label>
                    </div>
                    <div class="upload-button">
                      <div className="sellerImgs">
                        <img
                          className="sellerImgLogo"
                          src={sellerLogo}
                          alt="logo"
                        />
                      </div>
                      {/* <label>
                        <input type="file" />
                        <i class="bx bx-upload"></i>
                      </label> */}

                      <div>
                        <div class="additionalImage_upload-button">
                          <label controlId="imageFile">
                            <input
                              type="file"
                              name="file"
                              onChange={uploadFileHandler}
                            />
                            <i class="bx bx-upload"></i>
                          </label>
                          {loadingUpload ? (
                            <>
                              <OnlyLoading />
                            </>
                          ) : (
                            <>
                              <span>
                                {lang === 'EN'
                                  ? 'Edit Logo'
                                  : 'Logó szerkesztése'}
                              </span>
                            </>
                          )}

                          {/* {loadingUpload && (
                        <center>
                          <OnlyLoading></OnlyLoading>
                        </center>
                      )} */}
                        </div>
                      </div>
                    </div>
                    <div class="upload-button">
                      <div className="sellerImgs">
                        <img
                          className="sellerImgLogo"
                          src={sellerCover}
                          alt="Cover"
                        />
                      </div>

                      <div>
                        <div class="additionalImage_upload-button">
                          <label controlId="imageFile">
                            <input
                              type="file"
                              name="file"
                              onChange={uploadFileHandlerCover}
                            />
                            <i class="bx bx-upload"></i>
                          </label>
                          {loadingUpload ? (
                            <>
                              <OnlyLoading />
                            </>
                          ) : (
                            <>
                              <span>
                                {lang === 'EN'
                                  ? 'Edit Cover '
                                  : 'Borító szerkesztése'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div class="box">
                      <input
                        class="input"
                        type="text"
                        name="sellerLogo"
                        id="sellerLogo"
                        placeholder="Store Logo"
                        value={sellerLogo}
                        onChange={(e) => setSellerLogo(e.target.value)}
                        required
                      ></input>
                      <label for="sellerLogo">Store Logo</label>
                    </div> */}

                    {/* <div class="box" controlId="sellerCover">
                      <input
                        class="input"
                        type="text"
                        name="sellerCover"
                        id="sellerCover"
                        placeholder="Store Cover"
                        value={sellerCover}
                        onChange={(e) => setSellerCover(e.target.value)}
                        required
                      />
                      <label for="sellerCover">Store Cover</label>
                    </div> */}
                  </div>
                </div>
              )}
              <br />
              <div className="profileUpdateBTN">
                <button className="btnProfileUpdate" type="submit">
                  {loadingUpdate ? (
                    <>
                      <OnlyLoading />
                    </>
                  ) : (
                    <>{lang === 'EN' ? 'Update ' : 'Frissítés'}</>
                  )}
                </button>
                {/* {loadingUpdate && <OnlyLoading></OnlyLoading>} */}
                <br />
                {errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {/* {successUpdate &&
                  toast.success(
                    lang === 'EN'
                      ? 'Updated Successfully '
                      : 'Sikeresen frissítve'
                  )} */}
                {successUpdate && (
                  <MessageBox variant="success">
                    {lang === 'EN'
                      ? 'Updated Successfully '
                      : 'Sikeresen frissítve'}
                  </MessageBox>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
