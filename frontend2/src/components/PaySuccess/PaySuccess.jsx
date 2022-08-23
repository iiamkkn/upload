import { Link } from 'react-router-dom';
import React from 'react';
// import { useSelector } from 'react-redux';
// import Auth from '../../pages/Auth/Auth';
// import Footer from '../Footer/Footer';
// import Navbar from '../Navbar/Navbar';

export const PaySuccess = () => {
  // const navigate = useNavigate();

  // const { search } = useLocation();
  // const redirectInUrl = new URLSearchParams(search).get('redirect');
  // const redirect = redirectInUrl ? redirectInUrl : '/';

  // const auth = useSelector((state) => state.auth);
  // const { user } = auth;

  // if (!user) {
  //   navigate('/signinv1');
  //   // window.location.reload();
  // }
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      {/* <Navbar /> */}

      {/* <br /> */}
      <div
        className="no_order_to_be_placed_DIV"
        style={{ lineHeight: '2.5rem' }}
      >
        <h1>{lang === 'EN' ? 'Congratulations!' : 'Gratulálunk!'}</h1>
        <h2 style={{ fontWeight: 'normal' }}>
          {lang === 'EN' ? 'You have paid successfully' : 'Sikeresen fizetett'}
        </h2>
        <p style={{ fontSize: '0.8rem' }}>
          {lang === 'EN' ? 'visit' : 'látogatás'} &#x2192;{' '}
          <Link to="/">{lang === 'EN' ? 'Home Page' : 'Home'}</Link>
        </p>
      </div>
      <br />
      {/* <Auth /> */}
      {/* <Footer /> */}
    </>
  );
};
