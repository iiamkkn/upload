import React, { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, Store_verification } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { Link } from 'react-router-dom';
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
import { getAllUser } from '../../api/zain/UserRequests';
import { countries } from 'countries-list';
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

export default function SellerVerification() {
  const [ProductIMGsaved, setProductIMGsaved] = useState('');
  const countriesList = Object.values(countries);

  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerCover, setSellerCover] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const [checked, setisChecked] = useState(false);
  const [document, setDocument] = useState('');
  const [nationality, setNationality] = useState('');
  const [country, setCountry] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

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
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerCover(user.seller.cover);
        setSellerDescription(user.seller.description);
        // id verification
        setisChecked(user.IdVerification.checked);
        setDocument(user.IdVerification.document);
        setNationality(user.IdVerification.nationality);
        setCountry(user.IdVerification.country);
        setFront(user.IdVerification.front);
        setBack(user.IdVerification.back);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    // window.location.reload();

    e.preventDefault();
    // dispatch update profile
    // if (password === '' || confirmPassword === '') {
    //   if (lang === 'EN') {
    //     toast.warn('Passwords input cannot be empty', { theme: 'dark' });
    //   }
    //   if (lang === 'HU') {
    //     toast.warn('A jelszó megadása nem lehet üres', { theme: 'dark' });
    //   }
    // } else if (password !== confirmPassword) {
    //   toast.error('Password and Confirm Password Are Not Matched', {
    //     theme: 'dark',
    //   });
    //   if (lang === 'HU') {
    //     toast.warn('A jelszó és a Jelszó megerősítése nem egyezik', {
    //       theme: 'dark',
    //     });
    //   }
    // } else {

    dispatch(
      Store_verification({
        userId: user._id,
        sellerName,
        sellerLogo,
        sellerCover,
        sellerDescription,
        checked,
        document,
        nationality,
        country,
        front,
        back,
      })
    );
    // }
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

      setFront(data.secure_url);

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

      setBack(data.secure_url);

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

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  return (
    <>
      <Navbar />
      <Helmet>
        <title>{lang === 'EN' ? 'Store Settings' : 'Áruház beállításai'}</title>
      </Helmet>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="main-Userprofile-container">
            {/* <h1>{lang === 'EN' ? 'Profile Settings' : 'Profilbeállítások'}</h1> */}

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
            {persons.map((person, id) => {
              if (person._id === userInfo._id)
                return (
                  <>
                    {person.IdVerification.checked &&
                      !person.IdVerification.approved && (
                        <div className="already_sbmited_processing">
                          <div className="alert_already_sbmited_processing">
                            {lang === 'EN' ? (
                              <>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  Your documents are submitted and are under
                                  verification. &nbsp;
                                  <i class="fa-solid fa-check-double"></i>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  Dokumentumait benyújtották, és ellenőrzés
                                  alatt állnak. &nbsp;
                                  <i class="fa-solid fa-check-double"></i>
                                </div>
                              </>
                            )}
                          </div>
                          {/* <form onSubmit={submitHandler}>
                          {userInfo.isSeller && (
                            <div className="SellerDIV">
                              <h2>
                                {lang === 'EN'
                                  ? 'Setup Your Store  '
                                  : 'Állítsa be az üzletét'}
                              </h2>
                              <div class="contField">
                                <div class="box" controlId="sellerName">
                                  <input
                                    class="input"
                                    type="text"
                                    name="sellerName"
                                    id="sellerName"
                                    placeholder={
                                      lang === 'EN'
                                        ? 'Store Name'
                                        : 'Webáruház neve'
                                    }
                                    value={sellerName}
                                    onChange={(e) =>
                                      setSellerName(e.target.value)
                                    }
                                    required
                                  />
                                  <label for="sellerName">
                                    {lang === 'EN'
                                      ? 'Store Name'
                                      : 'Webáruház neve'}
                                  </label>
                                </div>

                                <div class="box">
                                  <textarea
                                    class="input"
                                    type="text"
                                    name="sellerDescription"
                                    id="sellerDescription"
                                    placeholder={
                                      lang === 'EN'
                                        ? 'Store Name'
                                        : 'Webáruház leírása'
                                    }
                                    value={sellerDescription}
                                    onChange={(e) =>
                                      setSellerDescription(e.target.value)
                                    }
                                    required
                                  ></textarea>
                                  <label for="sellerDescription">
                                    {lang === 'EN'
                                      ? 'Store Name'
                                      : 'Webáruház leírása'}
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
                                              ? 'Upload Logo'
                                              : 'Logó feltöltése'}
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
                                <>
                                  {lang === 'EN'
                                    ? 'Save & Finish'
                                    : 'Mentés és befejezés'}
                                </>
                              )}
                            </button>
                            <br />
                            {errorUpdate && (
                              <MessageBox variant="danger">
                                {errorUpdate}
                              </MessageBox>
                            )}

                            {successUpdate && (
                              <center>
                                <Link
                                  to={`/seller/${userInfo._id}`}
                                  style={{
                                    textDecoration: 'none',
                                    color: 'blue',
                                  }}
                                >
                                  {' '}
                                  <MessageBox variant="success">
                                    {lang === 'EN' ? (
                                      <span
                                        style={{
                                          textDecoration: 'none',
                                          color: 'blue',
                                        }}
                                      >
                                        View Store Now
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          textDecoration: 'none',
                                          color: 'blue',
                                        }}
                                      >
                                        Nézd meg az Áruházat most
                                      </span>
                                    )}
                                  </MessageBox>
                                </Link>
                              </center>
                            )}
                          </div>
                        </form> */}
                        </div>
                      )}
                    {person.IdVerification.checked &&
                      person.IdVerification.approved && (
                        <>
                          <div className="already_sbmited_processing">
                            <div className="alert_already_sbmited_processing">
                              {lang === 'EN' ? (
                                <>
                                  <h2>Congratulations!</h2>
                                  <br />
                                  <br />
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    {' '}
                                    Your account has been approved. &nbsp;
                                    <i class="fa-solid fa-circle-check"></i>
                                  </div>
                                  <br /> You can set up your online store and
                                  start selling products.
                                </>
                              ) : (
                                <>
                                  <h2>Gratulálunk!</h2>
                                  <br />
                                  <br />
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    {' '}
                                    Fiókját jóváhagytuk. &nbsp;
                                    <i class="fa-solid fa-circle-check"></i>
                                  </div>
                                  <br />
                                  Beállíthatja online áruházát, és megkezdheti a
                                  termékek értékesítését.
                                </>
                              )}
                            </div>{' '}
                          </div>
                        </>
                      )}
                    {!person.IdVerification.checked &&
                      !person.IdVerification.approved && (
                        <>
                          <form onSubmit={submitHandler}>
                            {userInfo.isSeller && (
                              <div className="SellerDIV_verify">
                                <h2>
                                  {lang === 'EN' ? (
                                    <>
                                      <i class="fa-solid fa-user-check"></i>{' '}
                                      &nbsp; Verify yourself{' '}
                                    </>
                                  ) : (
                                    <>
                                      <i class="fa-solid fa-user-check"></i>{' '}
                                      &nbsp; Igazolja magát{' '}
                                    </>
                                  )}
                                </h2>{' '}
                                <div className="verification_titles">
                                  {lang === 'EN'
                                    ? 'Nationality'
                                    : 'Állampolgárság'}
                                </div>
                                <div className="filter-select_nationality">
                                  {' '}
                                  <select
                                    value={nationality}
                                    onChange={(e) =>
                                      setNationality(e.target.value)
                                    }
                                    disabled={
                                      person.IdVerification.nationality
                                        ? true
                                        : false
                                    }
                                    style={{
                                      cursor: person.IdVerification.nationality
                                        ? 'not-allowed'
                                        : 'pointer',
                                    }}
                                    required
                                  >
                                    <option
                                      className="select-options"
                                      value="Chooseyournationality"
                                    >
                                      {lang === 'EN'
                                        ? 'Choose your nationality'
                                        : 'Válassza ki nemzetiségét'}
                                    </option>
                                    <option
                                      className="select-options"
                                      value="Hungarian"
                                    >
                                      {lang === 'EN'
                                        ? 'I am Hungarian'
                                        : 'Magyar vagyok'}
                                    </option>
                                    <option
                                      className="select-options"
                                      value="Foreigner"
                                    >
                                      {lang === 'EN'
                                        ? ' I am Foreigner'
                                        : 'Külföldi vagyok'}
                                    </option>
                                  </select>
                                </div>
                                {nationality === 'Hungarian' && (
                                  <>
                                    <div className="verification_titles">
                                      {lang === 'EN' ? 'Country' : 'Ország'}
                                    </div>
                                    <div className="filter-select_nationality">
                                      {' '}
                                      <select
                                        value={country}
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                        disabled={
                                          person.IdVerification.country
                                            ? true
                                            : false
                                        }
                                        style={{
                                          cursor: person.IdVerification.country
                                            ? 'not-allowed'
                                            : 'pointer',
                                        }}
                                        required
                                      >
                                        <option
                                          className="select-options"
                                          value="Choose a Country"
                                        >
                                          {lang === 'EN'
                                            ? 'Choose a Country'
                                            : 'Válassz egy országot'}
                                        </option>
                                        <option
                                          className="select-options"
                                          value="Hungary"
                                        >
                                          {lang === 'EN'
                                            ? 'Hungary'
                                            : 'Magyarország'}
                                        </option>
                                      </select>
                                    </div>
                                  </>
                                )}
                                {nationality === 'Foreigner' && (
                                  <>
                                    <div className="verification_titles">
                                      {lang === 'EN' ? 'Country' : 'Ország'}
                                    </div>
                                    <div className="filter-select_nationality">
                                      {' '}
                                      <select
                                        value={country}
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                        disabled={
                                          person.IdVerification.country
                                            ? true
                                            : false
                                        }
                                        style={{
                                          cursor: person.IdVerification.country
                                            ? 'not-allowed'
                                            : 'pointer',
                                        }}
                                        required
                                      >
                                        {countriesList.map((country) => (
                                          <option
                                            key={country.name}
                                            value={country.name}
                                          >
                                            {country.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </>
                                )}
                                {nationality === 'Hungarian' && (
                                  <>
                                    <div className="verification_titles">
                                      {lang === 'EN'
                                        ? 'Document Type'
                                        : 'Dokumentum típus'}
                                    </div>
                                    <div className="filter-select_nationality">
                                      {' '}
                                      <select
                                        value={document}
                                        onChange={(e) =>
                                          setDocument(e.target.value)
                                        }
                                        disabled={
                                          person.IdVerification.document
                                            ? true
                                            : false
                                        }
                                        style={{
                                          cursor: person.IdVerification.document
                                            ? 'not-allowed'
                                            : 'pointer',
                                        }}
                                        required
                                      >
                                        <option
                                          className="select-options"
                                          value="Choose verification document"
                                        >
                                          {lang === 'EN'
                                            ? 'Choose verification document'
                                            : 'Igazoló dokumentum'}
                                        </option>
                                        <option
                                          className="select-options"
                                          value="Hungarian ID Card"
                                        >
                                          {lang === 'EN'
                                            ? 'Hungarian ID Card'
                                            : 'Magyar igazolvány'}
                                        </option>
                                        <option
                                          className="select-options"
                                          value="Hungarian Passport"
                                        >
                                          {lang === 'EN'
                                            ? 'Hungarian Passport'
                                            : 'Útlevél'}
                                        </option>
                                      </select>
                                    </div>{' '}
                                  </>
                                )}{' '}
                                {nationality === 'Foreigner' && (
                                  <>
                                    <div className="verification_titles">
                                      {lang === 'EN'
                                        ? 'Document Type'
                                        : 'Dokumentum típus'}
                                    </div>
                                    <div className="filter-select_nationality">
                                      {' '}
                                      <select
                                        value={document}
                                        onChange={(e) =>
                                          setDocument(e.target.value)
                                        }
                                        disabled={
                                          person.IdVerification.document
                                            ? true
                                            : false
                                        }
                                        style={{
                                          cursor: person.IdVerification.document
                                            ? 'not-allowed'
                                            : 'pointer',
                                        }}
                                        required
                                      >
                                        <option
                                          className="select-options"
                                          value="Choose verification document"
                                        >
                                          {lang === 'EN'
                                            ? 'Choose verification document'
                                            : 'Igazoló dokumentum'}
                                        </option>
                                        <option
                                          className="select-options"
                                          value="Hungarian Permit ID"
                                        >
                                          {lang === 'EN'
                                            ? 'Hungarian Permit ID'
                                            : 'Magyar engedélyazonosító'}
                                        </option>
                                        {/* <option
                                        className="select-options"
                                        value="Passport"
                                      >
                                        {lang === 'EN' ? 'Passport' : 'Útlevél'}
                                      </option> */}
                                      </select>
                                    </div>{' '}
                                  </>
                                )}
                                <div className="verification_titles">
                                  {lang === 'EN'
                                    ? 'Upload documents'
                                    : 'Dokumentumok feltöltése'}
                                </div>
                                <br />
                                <div class="contField">
                                  <div class="upload-button">
                                    <div className="sellerImgs">
                                      <img
                                        className="sellerImgLogo"
                                        src={front}
                                        alt="front"
                                      />
                                    </div>

                                    <div>
                                      {person.IdVerification.front ? (
                                        <div className="already_sbmited">
                                          You have already submitted.{' '}
                                          <i class="fa-solid fa-circle-check"></i>
                                        </div>
                                      ) : (
                                        <>
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
                                                    ? 'Front Side'
                                                    : 'Elülső oldal'}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div class="upload-button">
                                    <div className="sellerImgs">
                                      <img
                                        className="sellerImgLogo"
                                        src={back}
                                        alt="back"
                                      />
                                    </div>

                                    <div>
                                      {person.IdVerification.back ? (
                                        <div className="already_sbmited">
                                          You have already submitted.{' '}
                                          <i class="fa-solid fa-circle-check"></i>
                                        </div>
                                      ) : (
                                        <>
                                          <div class="additionalImage_upload-button">
                                            <label controlId="imageFile">
                                              <input
                                                type="file"
                                                name="file"
                                                onChange={
                                                  uploadFileHandlerCover
                                                }
                                                disabled={
                                                  person.IdVerification.back
                                                    ? true
                                                    : false
                                                }
                                                style={{
                                                  cursor: person.IdVerification
                                                    .back
                                                    ? 'not-allowed'
                                                    : 'pointer',
                                                }}
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
                                                    ? 'Back Side '
                                                    : 'Hátoldal'}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <br />
                            <div className="verification_titles">
                              {lang === 'EN'
                                ? 'Everything you provided is correct?'
                                : 'Minden, amit megadtál, helyes?'}
                            </div>
                            <div className="check_tick_mark_seller">
                              <input
                                type="checkBox"
                                id="true"
                                name="true"
                                value={true}
                                onChange={(e) => setisChecked(e.target.value)}
                              />

                              <label for="yes">
                                {' '}
                                {lang === 'EN' ? 'Yes' : 'Igen'}
                              </label>
                            </div>
                            <br />
                            <div className="profileUpdateBTN">
                              <button
                                className="btnProfileUpdate"
                                type="submit"
                              >
                                {loadingUpdate ? (
                                  <>
                                    <OnlyLoading />
                                  </>
                                ) : (
                                  <>
                                    {lang === 'EN'
                                      ? 'Confirm & Finish'
                                      : 'Megerősít'}
                                  </>
                                )}
                              </button>
                              <br />
                              {errorUpdate && (
                                <MessageBox variant="danger">
                                  {errorUpdate}
                                </MessageBox>
                              )}

                              {successUpdate && (
                                <center>
                                  {' '}
                                  <MessageBox variant="success">
                                    {lang === 'EN' ? (
                                      <span
                                        style={{
                                          textDecoration: 'none',
                                          color: 'green',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        Your documents are submitted and are
                                        under verification.
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          textDecoration: 'none',
                                          color: 'blue',
                                        }}
                                      >
                                        Dokumentumait benyújtották, és
                                        ellenőrzés alatt állnak.
                                      </span>
                                    )}
                                  </MessageBox>
                                </center>
                              )}
                            </div>
                          </form>
                        </>
                      )}
                  </>
                );
            })}
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
