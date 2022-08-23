import React, { useContext, useState } from 'react';
import './Navbar.css';
import styled from 'styled-components';
import {
  // Search,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Store } from '../../api/Store';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/userActions';
// import { logout } from '../../actions_v1/userActions';
import SearchBox from '../SearchBox/SearchBox';
// import { CategoriesList } from '../Categories/CategoriesList';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';
import MobileSearchBox from '../SearchBox/MobileSearchBox';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { BottomMenu } from './BottomMenu';
import { Languages } from './Languages';

import { WishList } from '../../Wish';

//

//

//

//
const Container = styled.div`
  position: relative;
  z-index: 7;
  font-family: 'Urbanist', sans-serif;
  height: 60px;
  background-color: #fff;
  box-shadow: 4px 4px 8px rgb(220 220 220), 0px 0px 0px rgb(255 255 255);
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: -12px;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
  ${mobile({
    // display: 'none'
    color: 'rgb(126 126 126)',
  })}
`;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   padding: 5px;
//   width: 300px;
//   font-size: 14px;
//   height: 10px;
// `;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({
    flex: '10',
  })}
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 36px;
  color: #000;
  font-family: 'Urbanist', sans-serif;
  cursor: context-menu;
  ${mobile({ fontSize: '30px', marginTop: '-5px' })}
`;
const MobileRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  display: none;
  ${mobile({ display: 'block' })};
  ${Mscreen({ display: 'block' })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ display: 'none' })}
  ${Mscreen({ display: 'none' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  & a,
  a:visited {
    color: #000;
  }
`;

const MenuItemUserInfo = styled.div`
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-left: 25px;
  opacity: 0.8;
  text-decoration: none;
  &:hover {
    opacity: 1;
  }
`;
const DropDownContainer = styled('div')`
  transition: all 0.5s ease;
`;

const DropDownHeader = styled('div')`
  margin-bottom: 0.1em;
  position: relative;
  font-size: 14px;
  cursor: pointer;
  font-family: Arial;
`;

const DropDownListContainer = styled('div')`
  transition: all 0.5s ease;
`;

const DropDownList = styled('ul')`
  transition: all 0.5s ease;
  width: 115px;
  z-index: 3;
  position: absolute;
  margin-top: 0em;
  margin-left: -3rem;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  border: 0.5px solid rgb(220 220 220);
  border-top: 0.5px solid rgb(250 240 240);
  /* box-sizing: border-box; */
  &:first-child {
    padding-top: 0.4em;
  }
`;

const ListItem = styled('li')`
  transition: all 0.5s ease;

  list-style: none;
  text-decoration: none;
  margin-top: -10px;
`;
const UserTitleInList = styled.span`
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  margin-left: 25px;
  opacity: 0.8;
  text-decoration: none;
  color: #000;
  &:hover {
    opacity: 1;
    text-decoration: none;
  }
`;

const UserIconMenu = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  object-fit: cover;
`;

export const Navbar = () => {
  const { cartState } = useContext(Store);
  const { cart } = cartState;

  const { wstate } = useContext(WishList);
  const { wishlist } = wstate;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const auth = useSelector((state) => state.auth);
  // const { user: userInfo, loading } = auth;

  // const logoutHandler = () => {
  //   dispatch(logout());
  //   alert.success('Logged out successfully.');
  // };

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    // dispatch(logout());
    // alert.success('Logged out successfully.');
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const togglingAdmin = () => setIsOpenAdmin(!isOpenAdmin);

  const [isOpenSeller, setIsOpenSeller] = useState(false);
  const togglingSeller = () => setIsOpenSeller(!isOpenSeller);

  const Closedropdown = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
    if (isOpenAdmin) {
      setIsOpenAdmin(!isOpenAdmin);
    }
    if (isOpenSeller) {
      setIsOpenSeller(!isOpenSeller);
    }
  };

  const [sidebar, setSidebar] = useState(false);
  const toggleSIdebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const [ListDiv, setListDiv] = useState(false);
  const toggleLISTDIV = () => {
    setListDiv((prevState) => !prevState);
    setListDiv2(false);
    setListDiv3(false);
  };

  const [ListDiv2, setListDiv2] = useState(false);
  const toggleLISTDIV2 = () => {
    setListDiv2((prevState) => !prevState);
    setListDiv(false);
    setListDiv3(false);
  };

  const [ListDiv3, setListDiv3] = useState(false);
  const toggleLISTDIV3 = () => {
    setListDiv3((prevState) => !prevState);
    setListDiv2(false);
    setListDiv(false);
  };
  const [modalOpened, setModalOpened] = useState(false);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Container onClick={() => Closedropdown()}>
        <Wrapper>
          <Left>
            {/* <Language>
              EN
            </Language> */}
            <Languages />

            {/*  <SearchContainer>
             <Input placeholder="Search" />
              <Search style={{ color: 'gray', fontSize: 16 }} /> 
            </SearchContainer>*/}
            <div className="top_search_model_div">
              <SearchBox
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              <div onClick={() => setModalOpened(true)}>
                <SearchOutlinedIcon className="SearchOutlinedIconstyle" />{' '}
                <div className="SearchOutlinedIconP">
                  {lang === 'EN' ? 'Search' : 'Keresés'}
                </div>
              </div>
            </div>
          </Left>
          <Center>
            <Link
              to={`/index`}
              style={{ textDecoration: 'none', fontFamily: 'Urbanist' }}
            >
              <Logo>Zalazon.</Logo>
            </Link>
          </Center>
          <Right>
            {!userInfo?.isSeller && (
              <Link to="/seller" style={{ textDecoration: 'none' }}>
                <MenuItem>
                  <div className="open_store_navbar">Open a Store</div>
                </MenuItem>
              </Link>
            )}
            {/* <CategoriesList /> */}

            {/* {userInfo?.avatar && userInfo?.avatar.url && (
              <MenuItem>
                <img
                  src={userInfo?.avatar && userInfo?.avatar.url}
                  alt={userInfo && userInfo?.name}
                  className="rounded-header-avtar"
                />
              </MenuItem>
            )} */}
            {userInfo && (
              <MenuItem>
                <Link to="/feeds">
                  <Tippy content="Store Feeds" placement="bottom">
                    <FeedOutlinedIcon />
                  </Tippy>
                </Link>
              </MenuItem>
            )}
            <MenuItem>
              <Link to="/wishlist">
                <Tippy content="Wishlist" placement="bottom">
                  <FavoriteBorderOutlined />
                </Tippy>
                {wishlist.wishistItem.length > 0 && (
                  <Badge
                    // badgeContent={wishlist.wishistItem.reduce(
                    //   (a, c) => a + c.quantity,
                    //   0
                    // )}
                    badgeContent={wishlist.wishistItem.length}
                    color="primary"
                    className="WishListBadge"
                  />
                )}
              </Link>
            </MenuItem>

            <MenuItem>
              <Link to="/cart">
                <Tippy content="Cart" placement="bottom">
                  <ShoppingCartOutlined />
                </Tippy>

                {cart.cartItems.length > 0 && (
                  <Badge
                    badgeContent={cart.cartItems.length}
                    color="primary"
                    className="CartBadge"
                  ></Badge>
                  // <Badge
                  //   badgeContent={cart.cartItems.reduce(
                  //     (a, c) => a + c.quantity,
                  //     0
                  //   )}
                  //   color="primary"
                  //   className="CartBadge"
                  // ></Badge>
                )}
              </Link>
            </MenuItem>
            {userInfo ? (
              <DropDownContainer>
                <MenuItemUserInfo>
                  <DropDownHeader onClick={toggling}>
                    <UserIconMenu src={userInfo.image} alt="" />
                  </DropDownHeader>
                  <center>
                    <ArrowDropDownIcon
                      onClick={toggling}
                      className="ArrowDropDownIcon"
                    />
                  </center>
                </MenuItemUserInfo>
                {isOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      <ArrowDropUpIcon
                        onClick={toggling}
                        className="ArrowDropUpIcon"
                      />
                      <UserTitleInList className="UserTitleInList">
                        <ListItem
                          className="UserTitleInList"
                          style={{ marginTop: '-7px' }}
                        >
                          {userInfo.name}
                        </ListItem>
                      </UserTitleInList>
                      <Link to="/profile" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN'
                            ? 'Profile Settings'
                            : 'Profilbeállítások'}
                        </ListItem>
                      </Link>

                      <Link to="/orderhistory" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN'
                            ? ' Order History'
                            : 'Rendeléstörténet'}
                        </ListItem>
                      </Link>

                      <Link
                        to="#signout"
                        onClick={signoutHandler}
                        className="UserInfoLinksList"
                      >
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'Sign Out' : 'Kijelentkezés'}
                        </ListItem>
                      </Link>
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>
            ) : (
              <DropDownContainer>
                <MenuItemUserInfo>
                  <DropDownHeader onClick={toggling}>
                    <AccountCircleOutlinedIcon />
                  </DropDownHeader>
                  <center>
                    <ArrowDropDownIcon
                      onClick={toggling}
                      className="ArrowDropDownIcon"
                    />
                  </center>
                </MenuItemUserInfo>
                {isOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      <ArrowDropUpIcon
                        onClick={toggling}
                        className="ArrowDropUpIcon2"
                      />

                      <Link to="/signin" className="UserInfoLinksList">
                        <ListItem
                          className="UserInfoLinksList"
                          style={{ marginTop: '-7px' }}
                        >
                          {lang === 'EN' ? 'Sign in' : 'Bejelentkezés'}
                        </ListItem>
                      </Link>

                      <Link to="/register" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'Register Now' : 'Regisztráció'}
                        </ListItem>
                      </Link>

                      <Link to="/seller" className="UserInfoLinks">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'Open a Store' : 'A te boltod'}
                        </ListItem>
                      </Link>
                      <br />
                      {/* <ListItem style={{ color: 'white' }}>---</ListItem> */}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>
            )}
            {/* {Seller section} */}
            {userInfo && userInfo.isSeller && (
              <DropDownContainer>
                <MenuItemUserInfo>
                  <DropDownHeader onClick={togglingSeller}>
                    <StorefrontIcon />
                  </DropDownHeader>
                  <center>
                    <ArrowDropDownIcon
                      onClick={togglingSeller}
                      className="ArrowDropDownIcon"
                    />
                  </center>
                </MenuItemUserInfo>
                {isOpenSeller && (
                  <DropDownListContainer>
                    <DropDownList>
                      <ArrowDropUpIcon
                        onClick={togglingSeller}
                        className="ArrowDropUpIcon"
                      />

                      <Link
                        to={`/seller/${userInfo._id}`}
                        className="UserInfoLinksList"
                      >
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'My Store' : 'Az én boltom'}
                        </ListItem>
                      </Link>
                      <Link
                        to="/productlist/seller"
                        className="UserInfoLinksList"
                      >
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'Seller Products' : 'Eladó termékek'}
                        </ListItem>
                      </Link>

                      <Link
                        to="/orderlist/seller"
                        className="UserInfoLinksList"
                      >
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN'
                            ? 'Seller Orders'
                            : 'Eladói rendelések'}
                        </ListItem>
                      </Link>
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>
            )}
            {/* {Admin Section} */}
            {userInfo && userInfo.isAdmin && (
              <DropDownContainer>
                <MenuItemUserInfo>
                  <DropDownHeader onClick={togglingAdmin}>
                    <AdminPanelSettingsOutlinedIcon />
                  </DropDownHeader>
                  <center>
                    <ArrowDropDownIcon
                      onClick={togglingAdmin}
                      className="ArrowDropDownIcon"
                    />
                  </center>
                </MenuItemUserInfo>
                {isOpenAdmin && (
                  <DropDownListContainer>
                    <DropDownList>
                      <ArrowDropUpIcon
                        onClick={togglingAdmin}
                        className="ArrowDropUpIcon"
                      />

                      <Link to="/admin/dashboard" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN'
                            ? 'Admin Dashboard'
                            : 'Rendszergazdai irányítópult'}
                        </ListItem>
                      </Link>

                      <Link
                        to="/admin/productlist"
                        className="UserInfoLinksList"
                      >
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'All Products' : 'Minden termék'}
                        </ListItem>
                      </Link>

                      <Link to="/admin/orderlist" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'All Orders' : 'Minden rendelés'}
                        </ListItem>
                      </Link>

                      <Link to="/admin/userslist" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'All Users' : 'Minden felhasználó'}
                        </ListItem>
                      </Link>

                      <Link to="/admin/support" className="UserInfoLinksList">
                        <ListItem className="UserInfoLinksList">
                          {lang === 'EN' ? 'Support' : 'Támogatás'}
                        </ListItem>
                      </Link>
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>
            )}
          </Right>
          {/* Mobile userInfo options and settings */}
          <MobileRight>
            {!userInfo?.isSeller && (
              <Link to="/seller" style={{ textDecoration: 'none' }}>
                <MenuItem>
                  <div className="open_store_navbar_mob">Open a Store</div>
                </MenuItem>
              </Link>
            )}
            {userInfo && (
              <MenuOutlinedIcon
                onClick={toggleSIdebar}
                className="MenuOutlinedIconScreensFit"
              />
            )}
            <div className={sidebar ? 'sidebar__open_mob' : 'Sidebar_mobile'}>
              {userInfo ? (
                <>
                  <img
                    src={userInfo?.image}
                    className="side_top_mob_user_img"
                    alt={userInfo?.name}
                  />

                  <li
                    onClick={toggleLISTDIV}
                    style={{ borderTop: '1px solid #242424' }}
                  >
                    <AccountCircleOutlinedIcon /> {userInfo?.name}
                    <i className="fa-solid fa-circle-chevron-down down_arrow_light_color"></i>
                  </li>
                  <div className={ListDiv ? 'LDiv__open_mob' : 'LDiv_mob'}>
                    <Link to="/profile" className="UserInfoLinksList_mob">
                      <li>{lang === 'EN' ? 'My Profile' : 'A profilom'} </li>
                    </Link>

                    <Link to="/orderhistory" className="UserInfoLinksList_mob">
                      <li>
                        {' '}
                        {lang === 'EN'
                          ? 'Order History'
                          : 'Rendeléstörténet'}{' '}
                      </li>
                    </Link>

                    <Link
                      to="#signout"
                      onClick={signoutHandler}
                      className="UserInfoLinksList_mob"
                    >
                      {' '}
                      <li> {lang === 'EN' ? ' Sign Out' : 'Kijelentkezés'}</li>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="LDiv_mob_no_signIn">
                    <Link to="/signin" className="UserInfoLinksList_mob">
                      <li>
                        {' '}
                        <LoginOutlinedIcon className="no_signIn_icon" /> &nbsp;
                        {lang === 'EN' ? ' Sign In' : ' Bejelentkezés'}
                      </li>{' '}
                    </Link>

                    <Link to="/register" className="UserInfoLinksList_mob">
                      <li>
                        {' '}
                        <HowToRegOutlinedIcon className="no_signIn_icon" />
                        &nbsp;
                        {lang === 'EN' ? ' Sign up' : ' Regisztrálj'}
                      </li>
                    </Link>

                    <Link to="/seller" className="UserInfoLinksList_mob">
                      <li>
                        {' '}
                        <StorefrontOutlinedIcon className="no_signIn_icon" />
                        &nbsp;
                        {lang === 'EN'
                          ? ' Open a Store'
                          : ' Nyisson meg egy boltot'}
                      </li>
                    </Link>
                  </div>
                </>
              )}

              {userInfo && userInfo.isSeller && (
                <li onClick={toggleLISTDIV2}>
                  <StorefrontIcon />{' '}
                  {lang === 'EN' ? ' Store Settings' : ' Áruház beállításai'}
                  <i className="fa-solid fa-circle-chevron-down down_arrow_light_color"></i>
                </li>
              )}
              <div className={ListDiv2 ? 'LDiv__open_mob' : 'LDiv_mob'}>
                <Link
                  to={`/seller/${userInfo?._id}`}
                  className="UserInfoLinksList_mob"
                >
                  <li>{lang === 'EN' ? ' My Store' : ' Az én boltom'} </li>
                </Link>

                <Link
                  to="/productlist/seller"
                  className="UserInfoLinksList_mob"
                >
                  <li>
                    {' '}
                    {lang === 'EN' ? ' Store Products' : ' Bolti termékek'}{' '}
                  </li>
                </Link>

                <Link to="/orderlist/seller" className="UserInfoLinksList_mob">
                  <li>
                    {lang === 'EN' ? ' Store Orders' : ' Bolti rendelések'}
                  </li>
                </Link>
              </div>
              {userInfo && userInfo.isAdmin && (
                <li onClick={toggleLISTDIV3}>
                  <AdminPanelSettingsOutlinedIcon />{' '}
                  {lang === 'EN'
                    ? ' Admin Settings'
                    : ' Adminisztrációs beállítások'}
                  <i className="fa-solid fa-circle-chevron-down down_arrow_light_color"></i>
                </li>
              )}
              <div className={ListDiv3 ? 'LDiv__open_mob' : 'LDiv_mob'}>
                <Link to="/admin/dashboard" className="UserInfoLinksList_mob">
                  <li>
                    {' '}
                    {lang === 'EN'
                      ? ' Admin Dashboard'
                      : ' Rendszergazdai irányítópult'}{' '}
                  </li>
                </Link>

                <Link to="/admin/productlist" className="UserInfoLinksList_mob">
                  <li>
                    {' '}
                    {lang === 'EN' ? ' All Products' : ' Minden termék'}{' '}
                  </li>
                </Link>

                <Link to="/admin/orderlist" className="UserInfoLinksList_mob">
                  <li>{lang === 'EN' ? ' All Orders' : ' Minden rendelés'}</li>
                </Link>

                <Link to="/admin/userslist" className="UserInfoLinksList_mob">
                  <li>
                    {' '}
                    {lang === 'EN' ? ' All Users' : ' Minden felhasználó'}{' '}
                  </li>
                </Link>
              </div>
              <div onClick={toggleSIdebar} className="sideXbtn_hide">
                {' '}
                <i className="fa-regular fa-circle-xmark sideXbtn"></i>
              </div>
            </div>
            <div
              className={sidebar ? 'Backdrop_open' : 'Backdrop'}
              onClick={toggleSIdebar}
            ></div>{' '}
            {!userInfo && (
              <MenuOutlinedIcon
                onClick={toggleSIdebar}
                className="MenuOutlinedIconScreensFit"
              />
            )}
          </MobileRight>
        </Wrapper>
        <center>
          {' '}
          <MobileSearchBox />
        </center>
      </Container>
      {/* Mobile Bottom Menu */}
      <BottomMenu toggleSIdebar={toggleSIdebar} />
    </>
  );
};

export default Navbar;
