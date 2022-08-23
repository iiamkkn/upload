import { Modal, useMantineTheme } from '@mantine/core';
import './ProfileModal.css';
import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState, useReducer } from 'react';
import { detailsUser, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { Link } from 'react-router-dom';

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

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [ProductIMGsaved, setProductIMGsaved] = useState('');

  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerCover, setSellerCover] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const [{ loadingUpload }, dispatch1] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerCover(user.seller.cover);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    window.location.reload();

    e.preventDefault();

    dispatch(
      updateUserProfile({
        userId: user._id,
        sellerName,
        sellerLogo,
        sellerCover,
        sellerDescription,
      })
    );
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

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
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
        {userInfo.isSeller && (
          <div className="SellerDIV">
            <h2 style={{ textAlign: 'center' }}>
              {lang === 'EN' ? 'Setup Your Store  ' : 'Állítsa be az üzletét'}
            </h2>
            <div class="contField">
              <div class="box" controlId="sellerName">
                <input
                  class="input"
                  type="text"
                  name="sellerName"
                  id="sellerName"
                  placeholder={lang === 'EN' ? 'Store Name' : 'Webáruház neve'}
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
                  <img className="sellerImgLogo" src={sellerLogo} alt="logo" />
                </div>

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
                          {lang === 'EN' ? 'Upload Logo' : 'Logó feltöltése'}
                        </span>
                      </>
                    )}
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
                            ? 'Upload Cover '
                            : 'Borító feltöltése'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
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
              <>{lang === 'EN' ? 'Save & Finish' : 'Mentés és befejezés'}</>
            )}
          </button>
          <br />
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}

          {successUpdate && (
            <center>
              <Link
                to={`/seller/${userInfo._id}`}
                style={{
                  textDecoration: 'none',
                  color: 'blue',
                }}
              ></Link>
            </center>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
