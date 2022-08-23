import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Announcement from '../Announcement/Announcement';
// import Footer from '../Footer/Footer';
// import Navbar from '../Navbar/Navbar';

export default function SearchBox(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <>
      {/* <Announcement /> */}
      {/* <Navbar /> */}
      <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="q"
            id="q"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {/* <Footer /> */}
    </>
  );
}
