import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/zain/UserAction';
import { Link } from 'react-router-dom';
export const UserList = ({ person }) => {
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
    <div className="follower">
      <div>
        {/* <img src={person.image} alt="profile" className="followerImage" /> */}
        <img
          src={person.seller.logo ? person.seller.logo : person.image}
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>
            <Link to={`/seller/${person._id}`} className="follow_list_links">
              {' '}
              {/* {person.name} */}
              {person.seller.name}
            </Link>
          </span>
          <span>{person.email}</span>
        </div>
      </div>
      <button
        className={
          following
            ? 'button fc-button UnfollowButton'
            : 'button fc-button followButton'
        }
        onClick={handleFollow}
      >
        {following ? (
          <>{lang === 'EN' ? 'Unfollow' : 'Követés leállítása'}</>
        ) : (
          <>{lang === 'EN' ? 'Follow' : 'Követés'}</>
        )}
      </button>
    </div>
  );
};

export default UserList;
