import React, { useState, useRef } from 'react';
import './PostShare.css';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/zain/UploadAction';

const PostShare = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authData);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const zainPostReducer = useSelector((state) => state.zainPostReducer);
  const { loading } = zainPostReducer;

  // const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const description = useRef();
  const name = useRef();
  // const slug = useRef();
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: userInfo._id,
      sellerId: userInfo._id,
      seller: userInfo._id,
      name: name.current.value,
      slug: name.current.value,
      description: description.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append('name', fileName);
      data.append('file', image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    description.current.value = '';
    name.current.value = '';
  };
  return (
    <>
      {userInfo && (
        <div className="PostShare">
          <img src={userInfo?.image} alt="Profile" />
          <div>
            <input
              type="text"
              placeholder="What's happening?"
              required
              ref={description}
            />
            <input type="text" placeholder="Name" required ref={name} />
            {/* <input type="text" placeholder="slug" required ref={slug} /> */}
            <div className="postOptions">
              <div
                className="option"
                style={{ color: 'var(--photo)' }}
                onClick={() => imageRef.current.click()}
              >
                <UilScenery />
                Photo
              </div>

              <div className="option" style={{ color: 'var(--video)' }}>
                <UilPlayCircle />
                Video
              </div>
              <div className="option" style={{ color: 'var(--location)' }}>
                <UilLocationPoint />
                Location
              </div>
              <div className="option" style={{ color: 'var(--shedule)' }}>
                <UilSchedule />
                Shedule
              </div>
              <button
                className="button ps-button"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? 'uploading' : 'Share'}
              </button>

              <div style={{ display: 'none' }}>
                <input type="file" ref={imageRef} onChange={onImageChange} />
              </div>
            </div>

            {image && (
              <div className="previewImage">
                <UilTimes
                  className="imgCLZBTN"
                  onClick={() => setImage(null)}
                />
                <img src={URL.createObjectURL(image)} alt="preview" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostShare;
