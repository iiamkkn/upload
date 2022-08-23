import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import FollowersModal from './FollowersModal';
import { getAllUser } from '../../api/zain/UserRequests';
// import User from './User';
import { useSelector } from 'react-redux';
import FollowSeller from './FollowSeller';
import { useLocation } from 'react-router-dom';

const FollowSellerButton = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const location2 = useLocation();
  const sellerId = location2.pathname.split('/')[2];
  const [persons, setPersons] = useState([]);
  // const { user } = useSelector((state) => state.authReducer.authData);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
      {persons.map((person, id) => {
        if (person._id === sellerId)
          return <FollowSeller person={person} key={id} />;
      })}
    </>
  );
};

export default FollowSellerButton;
