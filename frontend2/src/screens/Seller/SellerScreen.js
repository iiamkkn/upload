import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { detailsUser } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Rating from '../../components/Rating/Rating';
import './Seller.css';
import SellerProducts from './SellerProducts';
import verifytick from '../../images/tick2.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Helmet } from 'react-helmet-async';
// import NewsLetter from '../../components/NewsLetter/NewsLetter';
// import Auth from '../../pages/Auth/Auth';
// import PostShare from '../../components/PostShare/PostShare';
// import Posts from '../../components/Posts/Posts';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from './ProfileModal';
// import FollowersCard from '../../components/FollowersCard/FollowersCard';
import FollowersSellerButton from '../../components/FollowersCard/FollowSellerButton';

//

//

//

//

//
export default function SellerScreen(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const sellerId = location.pathname.split('/')[2];
  // const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const zainPostReducer = useSelector((state) => state.zainPostReducer);
  // const { posts } = zainPostReducer;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));

    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  const [modalOpened, setModalOpened] = useState(false);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="Left">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="cover-container">
                <div className="ProfileImages">
                  <img src={user.seller.cover} alt={user.seller.name}></img>
                  <img src={user.seller.logo} alt={user.seller.name}></img>
                </div>
                <Helmet>
                  <title>{user.seller.name}</title>
                </Helmet>
                <div className="title_info_seller">
                  <span>{user.seller.name}</span>

                  {user.seller.verified && (
                    <Tippy
                      content={
                        lang === 'EN' ? 'Verified Seller' : 'Ellenőrzött eladó'
                      }
                      placement="top"
                    >
                      <img
                        src={verifytick}
                        alt="verified"
                        className="verification_tick"
                      ></img>
                    </Tippy>
                  )}
                </div>

                <div className="followDIV">
                  {userInfo && (
                    <>
                      <div className="Followers_sellers">
                        {/* {
                          posts.filter((post) => post?.userId === user?._id)
                            .length
                        } */}
                        {products?.length}{' '}
                        {lang === 'EN' ? 'Products' : 'Termékek'}
                      </div>
                      <div className="Followers_sellers">
                        {/* <b>{user.followers.length}</b>&nbsp;Followers */}
                        {user?.followers.length}{' '}
                        {lang === 'EN' ? 'Followers' : 'Követő'}
                      </div>

                      <div className="Followers_sellers">
                        {user?.following.length}{' '}
                        {lang === 'EN' ? 'Following' : 'Követés'}
                      </div>
                      {userInfo._id !== sellerId && (
                        <div className="Followers_sellers">
                          <FollowersSellerButton />
                        </div>
                      )}
                    </>
                  )}
                  {!userInfo && (
                    <>
                      <div className="Followers_sellers">
                        {products?.length}{' '}
                        {lang === 'EN' ? 'Products' : 'Termékek'} |{' '}
                        {user?.followers.length}{' '}
                        {lang === 'EN'
                          ? 'persons following this store'
                          : 'az üzletet követő személyek'}
                      </div>
                    </>
                  )}

                  {userInfo?._id === sellerId && (
                    <div className="Followers_sellers">
                      <div className="mob_pen">
                        <UilPen
                          width="0.9rem"
                          height="0.9rem"
                          className="edit_uilPen"
                          onClick={() => navigate('/settings')}
                        />
                      </div>
                      <div className="normal_screen_pen">
                        <UilPen
                          width="0.9rem"
                          height="0.9rem"
                          className="edit_uilPen"
                          onClick={() => setModalOpened(true)}
                        />

                        <ProfileModal
                          modalOpened={modalOpened}
                          setModalOpened={setModalOpened}
                          data={user}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-container">
                <div className="ProfileName">
                  {/* <span>{user.seller.name}</span> */}
                  <span></span>
                  <span>Seller Bio</span>
                  <span>
                    <a className="seller-contact" href={`mailto:${user.email}`}>
                      {lang === 'EN'
                        ? 'Contact Seller'
                        : 'Kapcsolatfelvétel az eladóval'}
                    </a>
                  </span>
                  <span>{user.seller.description}</span>
                  <span>
                    <Rating
                      rating={user.seller.rating}
                      numReviews={user.seller.numReviews}
                    ></Rating>
                  </span>
                  {/* <div className="hline"></div> */}
                </div>
              </div>
              {/* <PostShare /> */}
            </>
          )}
        </div>
      </div>

      <div className="Center">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>
                {lang === 'EN' ? 'No Product Found' : 'Nem található termék'}
              </MessageBox>
            )}
            <div className="product-main-container">
              {products.map((product) => (
                <SellerProducts
                  key={product._id}
                  product={product}
                ></SellerProducts>
              ))}
            </div>
          </>
        )}

        {/* <div className="Right">Right</div> */}
      </div>
      {/* <NewsLetter /> */}
      {/* <FollowersCard /> */}
      {/* <Auth /> */}
      {/* <Posts /> */}
      <Footer />
    </>
  );
}
