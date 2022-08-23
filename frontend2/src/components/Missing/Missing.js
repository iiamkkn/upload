import { Link } from 'react-router-dom';
import Announcement from '../Announcement/Announcement';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export const Missing = () => {
  const lang = localStorage.getItem('lang' || 'HU');

  return (
    <>
      <Announcement />
      <Navbar />

      {lang === 'EN' ? (
        <>
          <article style={{ padding: '100px' }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <br />
            <br />
            <div className="links">
              <Link to="/" className="links" style={{ fontSize: '12px' }}>
                Visit Our Homepage
              </Link>
            </div>
          </article>
        </>
      ) : (
        <>
          <article style={{ padding: '100px' }}>
            <h1>Hoppá!</h1>
            <p>Az oldal nem található</p>
            <br />
            <br />
            <div className="links">
              <Link to="/" className="links" style={{ fontSize: '12px' }}>
                Látogassa meg Honlapunkat
              </Link>
            </div>
          </article>
        </>
      )}

      <Footer />
    </>
  );
};

export default Missing;
