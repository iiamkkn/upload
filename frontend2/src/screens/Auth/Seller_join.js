import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../CSS/SellerJoin.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { SellerRegister } from '../../actions/userActions';
import Navbar from '../../components/Navbar/Navbar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import styled from 'styled-components';
import { mobile } from '../../ResponsiveDesign/responsive';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { toast, ToastContainer } from 'react-toastify';

//

//

//

//
const Logo = styled.h1`
  text-decoration: none;
  font-weight: bold;
  font-size: 40px;
  color: #000;
  font-family: 'Urbanist', sans-serif;
  cursor: pointer;
  ${mobile({ fontSize: '30px' })}
  & a {
    text-decoration: none;
    color: #000;
  }
  &:hover {
    filter: brightness(1.2);
  }
`;

export default function SellerJoin() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [isSeller, setisSeller] = useState(false);
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
      dispatch(SellerRegister(name, isSeller, username, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/store/verification');
    }
  }, [navigate, redirect, userInfo]);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  let Go2SellerForm = useRef();
  const onClickSellerBTN = async (e) => {
    e.preventDefault();
    window.scrollTo({
      behavior: 'smooth',
      top: Go2SellerForm.current.offsetTop,
    });
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <ToastContainer position="bottom-center" limit={1} />
      <div className="Main-Container">
        <Helmet>
          <title>
            {lang === 'EN' ? 'Open a Store' : 'Nyisson meg egy boltot'}
          </title>
        </Helmet>
        {/* {loading && <LoadingBox></LoadingBox>} */}

        <div className="WebDiv">
          <div className="seller_main_container_join">
            <div className="Seller_top_msg">
              {' '}
              {/* <Logo>
                <Link to="/index">Zalazon.</Link>
              </Logo> */}
              <div className="seller_join_divs_container">
                <div className="seller_join_div_left">
                  <motion.h1
                    initial={{
                      position: 'relative',
                      top: '20%',
                    }}
                    whileInView={{
                      top: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                  >
                    Sell Your Products
                  </motion.h1>
                  <motion.h1
                    initial={{
                      position: 'relative',
                      top: '20%',
                    }}
                    whileInView={{
                      top: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                  >
                    <span className="Online4free">Online For Free!</span>
                  </motion.h1>
                  <motion.button
                    initial={{
                      position: 'relative',
                      top: '20%',
                    }}
                    whileInView={{
                      top: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                    className="seller_join_now_btn"
                    type="submit"
                    onClick={onClickSellerBTN}
                  >
                    Open a Store Now
                    <i className="bx bx-right-arrow-alt"></i>
                  </motion.button>
                  <motion.p
                    initial={{
                      position: 'relative',
                      top: '20%',
                    }}
                    whileInView={{
                      top: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                  >
                    Zalazon is an online marketplace with an aim to promote
                    online selling and buying, artisans, artists and
                    manufacturers with a focus on e-commerce. Zalazon aims to
                    empower the sellers', satisfy the customer and make online
                    business professional, easy and fast.
                  </motion.p>
                </div>
                <motion.div
                  initial={{
                    position: 'relative',
                    // top: '4%',
                    left: '30%',
                    // rotate: -180
                  }}
                  whileInView={{
                    left: '0%',
                    // rotate: 0
                  }}
                  // viewport={{}}

                  transition={{
                    duration: 3,
                    // delay: 0.3,
                    type: 'spring',
                  }}
                  // animate={{ x: 195 }}
                  // whileHover={{
                  //   rotate: 360,
                  //   scale: 1.2,
                  //   transition: { duration: 1 },
                  // }}
                  // whileHover={{ scale: 1.2, transition: { duration: 0.4 } }}
                  whileTap={{ scale: 0.95 }}
                  className="seller_join_div_right"
                >
                  <img
                    src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660687716/avatars/pexels-photo-7857499_dj8leb.webp"
                    alt=""
                  />
                </motion.div>
              </div>
              <div className="expand_with_zalazon_DIV">
                <motion.div
                  initial={{
                    position: 'relative',
                    left: '-20%',
                  }}
                  whileInView={{
                    left: '0%',
                  }}
                  transition={{
                    duration: 2,
                    type: 'spring',
                  }}
                  className="expand_with_zalazon"
                >
                  {lang === 'EN' ? (
                    <>Expand your Business</>
                  ) : (
                    'Bővítse vállalkozását'
                  )}
                </motion.div>
                <motion.div
                  initial={{
                    position: 'relative',
                    left: '-20%',
                  }}
                  whileInView={{
                    left: '0%',
                  }}
                  transition={{
                    duration: 2,
                    type: 'spring',
                  }}
                  className="expand_with_zalazon_line2"
                >
                  {lang === 'EN' ? <>with Zalazon.</> : 'Zalazonnal.'}
                </motion.div>
                <div className="expand_with_zalazon_img_div">
                  <motion.img
                    initial={{
                      position: 'relative',
                      top: '30%',
                    }}
                    whileInView={{
                      top: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                    whileTap={{ scale: 0.95 }}
                    src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660687716/avatars/pexels-photo-7857491_p9mvkw.jpg"
                    alt=""
                    className="expand_with_zalazon_img"
                  />
                  <motion.div
                    initial={{
                      position: 'relative',
                      left: '-20%',
                    }}
                    whileInView={{
                      left: '0%',
                    }}
                    transition={{
                      duration: 2,
                      type: 'spring',
                    }}
                    className="expand_with_zalazon_img_right_div"
                  >
                    ✔ Get free and easy to manage online store account with
                    advance features.
                    <br /> ✔ Store Analytics
                    <br /> ✔ Easy and secure payment
                    <br /> ✔ Sell in whole Hungary
                    <br /> ✔ Deliver at your own or by us (No restirction)
                    <br /> ✔ Easy and efficient services
                    <br /> ✔ No hidden fees
                    <br /> ✔ We bring trust and commitment
                    <br /> ✔ Follow unfollow a store, StoreFeeds features and
                    more
                  </motion.div>
                </div>
              </div>
              <motion.div
                initial={{
                  position: 'relative',
                  top: '20%',
                }}
                whileInView={{
                  top: '0%',
                }}
                transition={{
                  duration: 2,
                  type: 'spring',
                }}
                className="how_this_works_zalazon"
              >
                {lang === 'EN' ? (
                  <>How this all Works?</>
                ) : (
                  'Hogyan működik ez az egész?'
                )}
                <div className="step_join_cont_align">
                  <div className="step_join_1">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-1_dnyxo8.png"
                        alt=""
                        className="step_join_img"
                      />
                      <div className="step_join_num">01</div>
                      <div className="step_join_title">Registration</div>
                      <div className="step_join_para">
                        Fill in all required details and register your online
                        store.
                      </div>
                    </div>
                  </div>
                  <div className="step_join_2">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-2_iuak00.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">02</div>
                      <div className="step_join_title">
                        Verification & Agreement
                      </div>
                      <div className="step_join_para">
                        Zalazon. will check portfolio and reach out to you with
                        a <i>Seller Contract</i>.
                      </div>
                    </div>
                  </div>
                  <div className="step_join_3">
                    <div className="step_join_content_cont">
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-3_lvuvyo.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">03</div>
                      <div className="step_join_title">Start selling</div>
                      <div className="step_join_para">
                        After your portofolio verification, you can start
                        uploading your products and start selling.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step_join_cont_align">
                  <div className="step_join_1">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719676/Zalazon_Icons/step-4_ndzgql.png"
                        alt=""
                        className="step_join_img"
                      />
                      <div className="step_join_num">04</div>
                      <div className="step_join_title">Quality Check</div>
                      <div className="step_join_para">
                        All products uploaded by any store or seller which be
                        checked periodically will time and it meets our{' '}
                        <i>Standards</i>.
                      </div>
                    </div>
                  </div>
                  <div className="step_join_2">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719676/Zalazon_Icons/step-5_r73vma.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">05</div>
                      <div className="step_join_title">Features & Settings</div>
                      <div className="step_join_para">
                        With time, we are adding more advance features for both
                        our sellers and customers.
                      </div>
                    </div>
                  </div>
                  <div className="step_join_3">
                    <div className="step_join_content_cont">
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719953/Zalazon_Icons/step-7_ezqmyr.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">06</div>
                      <div className="step_join_title">
                        Have fun selling online
                      </div>
                      <div className="step_join_para">
                        Have your own business and stay connected with your
                        clients and have fun togather.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <h1 className="msg_top_zalazon">
                {/* {lang === 'EN' ? (
                  <>
                    Start your online business at <b>Zalazon</b>
                  </>
                ) : (
                  <>
                    Indítsa el online vállalkozását a <b>Zalazonnál</b>
                  </>
                )} */}
                {lang === 'EN' ? 'Why Zalazon?' : 'Miért Zalazon?'}
              </h1>
              {/* <h5 className="why_zalazon_">
                {lang === 'EN' ? 'Why Zalazon. ?' : 'Miért Zalazon. ?'}
              </h5> */}
              <div className="msg_itemsDIV">
                <div
                  className="item_list_seller_store anim-bg-gradient"
                  // style={{ backgroundColor: '#00ed5f' }}
                >
                  <StoreMallDirectoryOutlinedIcon />

                  {lang === 'EN'
                    ? 'Free Store Setup'
                    : 'Ingyenes boltbeállítás'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient1"
                  // style={{ backgroundColor: '#00edd7' }}
                >
                  <MonetizationOnOutlinedIcon />
                  {lang === 'EN'
                    ? 'Sell at 0% Commission'
                    : 'Eladás 0% jutalékkal'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient2"
                  // style={{ backgroundColor: '#deed00' }}
                >
                  <CheckCircleOutlineOutlinedIcon />
                  {lang === 'EN'
                    ? 'Trust & Commitment'
                    : 'Bizalom és elkötelezettség'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient3"
                  // style={{ backgroundColor: '#ea19ed' }}
                >
                  <FmdGoodOutlinedIcon />
                  {lang === 'EN'
                    ? '  Sell in Whole Hungary'
                    : 'Eladó egész Magyarországon'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient4"
                  // style={{ backgroundColor: '#71f7a7' }}
                >
                  <ElectricBoltOutlinedIcon />
                  {lang === 'EN'
                    ? 'Fast, Easy, & Efficient Services'
                    : 'Gyors, egyszerű és hatékony szolgáltatások'}
                </div>
              </div>
            </div>

            <div className="seller_inside_info_cont">
              {/* <div className="left_seller">
               
              </div> */}

              <div className="center_seller" ref={Go2SellerForm}>
                <div className="container_seller_reg">
                  <h1>
                    {lang === 'EN'
                      ? 'STORE REGISTRATION'
                      : 'ONLINE ÁRUHÁZ REGISZTRÁCIÓ'}
                  </h1>{' '}
                  {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                  <div className="form_outer_seller">
                    <form onSubmit={submitHandler}>
                      {/* <i
                        onClick={toggleOrderDIV}
                        className={
                          join_div_1
                            ? 'fa-solid fa-circle-chevron-up down_arrow_order_color'
                            : 'fa-solid fa-circle-chevron-down down_arrow_order_color'
                        }
                      ></i> */}

                      {/* <div
                        className={
                          join_div_1
                            ? 'Signinpage_seller slide-page join_div_1_content_hide'
                            : 'Signinpage_seller slide-page join_div_1_content'
                        }
                      > */}
                      <div className="Signinpage_seller slide-page join_div_1_content">
                        <br />
                        <div className="field_input_container">
                          <fieldset className="zalazon_agree_check">
                            <legend>
                              {' '}
                              {lang === 'EN'
                                ? 'Open a store at Zalazon. ?'
                                : 'Nyiss üzletet Zalazon. ?'}
                            </legend>

                            <div>
                              <input
                                type="radio"
                                id="yes"
                                name="yes"
                                value={true}
                                onChange={(e) => setisSeller(e.target.value)}
                              />

                              <label for="yes">
                                {' '}
                                {lang === 'EN' ? 'Yes' : 'Igen'}
                              </label>
                            </div>
                          </fieldset>
                          <div className="without_field_input_container">
                            <div className="field">
                              <div className="Signinlabel">
                                {lang === 'EN'
                                  ? ' Your Full Name'
                                  : 'A teljes neved'}
                              </div>
                              <input
                                type="text"
                                id="name"
                                placeholder={
                                  lang === 'EN'
                                    ? ' Your Full Name'
                                    : 'A teljes neved'
                                }
                                required
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>

                            <div className="field">
                              <div className="Signinlabel">
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
                          </div>
                        </div>
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
                        <div className="pass_field_input_container">
                          <div className="field">
                            <div className="Signinlabel">
                              {lang === 'EN' ? 'Password' : 'Jelszó'}
                            </div>
                            <input
                              type="password"
                              placeholder={
                                lang === 'EN'
                                  ? 'Enter Password'
                                  : 'Írd be a jelszót'
                              }
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="field">
                            <div className="Signinlabel">
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
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <center>
                          {error ? (
                            <div className="error_reg_mgs_div_seller">
                              <div>{error}</div>
                            </div>
                          ) : (
                            ''
                          )}
                          <br />
                        </center>
                        <div className="field_seller">
                          {/* <button
                            className="firstNext next"
                            onClick={toggleOrderDIV}
                          >
                            {lang === 'EN' ? 'Next' : 'Következő'}
                          </button> */}
                          <button
                            className="firstNext next"
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            {loading ? (
                              <>
                                <OnlyLoading />
                              </>
                            ) : (
                              <> {lang === 'EN' ? ' Confirm' : ' Megerősít'}</>
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
                      {/* {join_div_1 && (
                        <div className="">
                          <button
                            className="join_previos_next_btn"
                            onClick={toggleOrderDIV}
                          >
                            {lang === 'EN'
                              ? 'Show Previous'
                              : 'Előző megjelenítése'}
                          </button>
                          <div className="Signinpage_seller slide-page">
                            <div className="field">
                              <div className="Signinlabel">
                                {lang === 'EN'
                                  ? ' Phone Number'
                                  : 'Telefonszám'}
                              </div>
                              <input
                                type="password"
                                id="confirmPassword"
                                placeholder={
                                  lang === 'EN'
                                    ? 'Enter Your Phone Number'
                                    : 'Írja be a telefonszámát'
                                }
                                required
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )} */}
                    </form>
                  </div>
                </div>
              </div>

              {/* <div className="right_seller">left</div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
