import React, { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/zain/PostsAction';
import Post from '../Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css';
import { useLocation } from 'react-router-dom';
import OnlyLoading from '../LoadingBox/OnlyLoading';
// import { useParams } from 'react-router-dom';

const Posts = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const userIds = location.pathname.split('/')[2];

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error, user } = userDetails;

  const zainPostReducer = useSelector((state) => state.zainPostReducer);
  const { posts, loading } = zainPostReducer;
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  useEffect(() => {
    dispatch(getTimelinePosts(userInfo?._id));
    dispatch(getTimelinePosts());
  }, [dispatch]);

  // if (user?.following.length === 0 || ' ') {
  //   return 'Please follow some store to get their feeds.';
  // }
  if (!posts) {
    if (lang === 'EN') {
      return 'No Store Feeds were found. Try Follow some stores.';
    }
    if (lang === 'HU') {
      return 'Nem található bolti hírcsatorna. Próbálja Kövessen néhány üzletet.';
    }
  }

  if (userIds) posts.filter((post) => post.userId === user?._id);

  return (
    <div className="Posts">
      {loading ? (
        <>
          {lang === 'EN' ? (
            <>
              <OnlyLoading />
            </>
          ) : (
            <>
              <OnlyLoading />
            </>
          )}
        </>
      ) : user?.following.length === 0 ? (
        'Please follow some store to get their feeds.'
      ) : (
        posts.map((post, id) => {
          return <Post data={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Posts;
