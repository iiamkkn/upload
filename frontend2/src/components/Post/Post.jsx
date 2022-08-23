import React, { useEffect, useState } from 'react';
import './Post.css';

import { likePost } from '../../api/zain/PostsRequests';
import { useSelector } from 'react-redux';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { Link } from 'react-router-dom';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { format } from 'timeago.js';
import { getAllUser } from '../../api/zain/UserRequests';
//

//

//

const Post = ({ data }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [liked, setLiked] = useState(data.likes.includes(userInfo._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    likePost(data._id, userInfo._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <>
      <div className="Main_container_Storefeeds">
        <div className="feeds_details_container">
          {/* <span> */}
          {/* <Link to={`/seller/${data.userId}`} className="feeds_link">
            {data.sellerName}
          </Link> */}
          {/* <Link to={`/seller/${data.userId}`} className="feeds_link">
            {' '}
            visit store 
          </Link> */}
          {/* </span> */}

          <div className="top_info_feeds">
            <div className="Main_align_cont">
              <div className="store_icon_feeds">
                <Link to={`/seller/${data.userId}`} style={{ color: 'black' }}>
                  {data.Sellerimage ? (
                    <>
                      {' '}
                      <Tippy
                        content={lang === 'EN' ? 'Visit Store' : 'Nézze meg'}
                        placement="left"
                      >
                        <div className="store_icon_feeds_imageDIV">
                          {/* <img
                          src={data.Sellerimage}
                          alt="store"
                          className="store_icon_feeds_image"
                        /> */}
                          {persons.map((person, id) => {
                            if (person._id === data.userId)
                              return (
                                <>
                                  <img
                                    src={person.seller.logo}
                                    alt="store"
                                    className="store_icon_feeds_image"
                                  />
                                </>
                              );
                          })}
                        </div>
                      </Tippy>
                    </>
                  ) : (
                    <>
                      <Tippy
                        content={lang === 'EN' ? 'Visit Store' : 'Nézze meg'}
                        placement="left"
                      >
                        <div className="store_icon_feeds1">
                          {/* <StorefrontOutlinedIcon className="store_icon_feeds_fit" /> */}
                          {persons.map((person, id) => {
                            if (person._id === data.userId)
                              return (
                                <>
                                  <img
                                    src={person.seller.logo}
                                    alt="store"
                                    className="store_icon_feeds_image"
                                  />
                                </>
                              );
                          })}
                        </div>
                      </Tippy>
                    </>
                  )}
                </Link>
              </div>
              <div className="sub_align_cont">
                <div>
                  {' '}
                  <Tippy
                    content={lang === 'EN' ? 'View Product' : 'Nézze meg'}
                    placement="top"
                  >
                    <Link
                      to={`/seller/${data.userId}`}
                      className="feeds_title_store"
                    >
                      {/* {lang === 'EN' ? <>{data.name}</> : <>{data.name}</>} */}
                      {persons.map((person, id) => {
                        if (person._id === data.userId)
                          return <>{person.seller.name}</>;
                      })}
                    </Link>
                  </Tippy>
                </div>

                <div>
                  <p className="Feeds_date">
                    {format(data.createdAt)}&nbsp; | &nbsp;
                    {data.createdAt.substring(0, 10)}
                  </p>
                </div>
                {/* <div className="feeds_title">{lang === 'EN' ? <>{data.name}</> : <>{data.name}</>}</div> */}
              </div>
            </div>{' '}
          </div>

          <div className="feeds_images_main_div">
            <div className="feeds_title_container">
              <Link to={`/product/${data._id}`} className="feeds_title">
                {lang === 'EN' ? <>{data.name}</> : <>{data.name}</>}
              </Link>
              <div className="feeds_title_price">{data.price}.00 HUF</div>
            </div>{' '}
            <img src={data.image} alt="Images" className="feeds_image" />
          </div>
          <div className="postReact" onClick={handleLike}>
            {liked ? (
              <p style={{ color: 'blue' }}>
                <ThumbUpOutlinedIcon />
              </p>
            ) : (
              <p style={{ color: 'black' }}>
                <ThumbUpOutlinedIcon />
              </p>
            )}
            <span className="ppllikes">
              <b style={{ color: '#7e7e7e' }}>{likes}</b>{' '}
              {lang === 'EN'
                ? 'people liked this product'
                : 'embereknek tetszett ez a termék'}
            </span>

            {/* <MessageOutlinedIcon />
            <ReplyOutlinedIcon /> */}
          </div>

          <span>
            {lang === 'EN' ? <>{data.description}</> : <>{data.description}</>}
          </span>
        </div>
      </div>
    </>
  );
};

export default Post;
