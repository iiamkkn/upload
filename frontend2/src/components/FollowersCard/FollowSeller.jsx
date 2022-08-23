import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/zain/UserAction';

export const FollowSeller = ({ person }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(userInfo._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, userInfo))
      : dispatch(followUser(person._id, userInfo));
    setFollowing((prev) => !prev);
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      {/* <div>
        <img src={person.image} alt="profile" className="followerImage" />
        <div className="name">
          <span>{person.name}</span>
          <span>{person.email}</span>
        </div>
      </div> */}
      <div class="follow_unfollow_icon_div">
        <button
          className={following ? 'Unfollow_seller_btn' : 'follow_seller_btn'}
          onClick={handleFollow}
        >
          {following ? (
            <>{lang === 'EN' ? 'Unfollow' : 'Követés leállítása'}</>
          ) : (
            <>{lang === 'EN' ? 'Follow' : 'Követés'}</>
          )}
        </button>
        <div class="cross_tick_followDIV">
          {following ? (
            <>
              <i className="fa-regular fa-circle-xmark UI_icon_small_crossUNFOLLOW"></i>
            </>
          ) : (
            <>
              <i className="fa-regular fa-circle-check UI_icon_small_crossFOLLOW"></i>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FollowSeller;
