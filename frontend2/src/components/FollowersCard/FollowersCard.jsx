import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import FollowersModal from './FollowersModal';
import { getAllUser } from '../../api/zain/UserRequests';
// import User from './User';
import { useSelector } from 'react-redux';
import UserList from './UserList';

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
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

  return (
    <div className="FollowersCard">
      <h3>
        {lang === 'EN'
          ? ' Follow & get updates from your favourite stores'
          : 'Kövesse és kapja meg kedvenc üzleteinek frissítéseit'}
      </h3>

      {persons.map((person, id) => {
        // if (person._id !== userInfo._id)
        if (person.isSeller && person._id !== userInfo._id)
          return <UserList person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>
          {lang === 'EN' ? 'Show more' : 'Mutass többet'}
        </span>
      ) : (
        ''
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
// return <User person={person} key={id} />;
