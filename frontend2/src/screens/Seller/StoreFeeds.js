import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Helmet } from 'react-helmet-async';
import Posts from '../../components/Posts/Posts';
import './Feeds.css';
import FollowersCard from '../../components/FollowersCard/FollowersCard';

//

//

//

//

//
export default function StoreFeeds(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  return (
    <>
      {' '}
      <Announcement />
      <Navbar />
      <Helmet>
        <title>{lang === 'EN' ? 'Store Feeds' : 'Hírcsatornák tárolása'}</title>
      </Helmet>
      <div className="Main_feed_container">
        <div className="feed_col_left">Menu and Tools</div>
        <div className="feed_col_middle">
          {userInfo ? (
            <>
              <Posts />
            </>
          ) : (
            'Please Login to see Store Feeds'
          )}
        </div>
        <div className="feed_col_right">
          <FollowersCard />
        </div>
      </div>
      <Footer />
    </>
  );
}
