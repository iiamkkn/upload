import React from 'react';
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css';
import { Link } from 'react-router-dom';
import Wave from '../../images/wave.png';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';

const Container = styled.div`
  display: flex;
  transition: all 0.3s ease;
  border-top: 1px solid #efeded;
  background-color: #000;
  color: #fff;
  ${mobile({ display: 'none' })};
  ${Mscreen({ display: 'none' })};
`;
const ContainerMobile = styled.div`
  display: none;
  transition: all 0.3s ease;
  border-top: 1px solid #efeded;
  background-color: #000;
  color: #fff;
  ${mobile({ display: 'block' })};
  ${Mscreen({ display: 'block' })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin-top: -70px;
  ${mobile({ marginTop: '0px' })};
  ${Mscreen({ marginTop: '0px' })};
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Right = styled.div`
  flex: 1;
  padding: 0px 20px;
  /* ${Mscreen({ marginBottom: '2rem' })};
  ${mobile({ marginBottom: '0' })}; */
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px;
`;

const Icon = styled.div`
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const Title = styled.h1`
  margin-bottom: 14px;
  color: #fff;
  width: -moz-fit-content;
  width: fit-content;
  border-radius: 7px;
`;

const ContactTitle = styled.h1`
  margin-bottom: 14px;
  background-color: #ffffff33;
  color: #fff;
  width: -moz-fit-content;
  width: fit-content;
  border-radius: 7px;
  padding: 5px 20px;
  font-weight: 600;
  font-size: 16px;
  ${mobile({ width: '100%', textAlign: 'center' })};
  /* ${Mscreen({ width: '100%', textAlign: 'center' })}; */
`;
const Des = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(255, 255, 255, 0.65);
  cursor: context-menu;
  line-height: 24px;
  /* &:hover {
    color: #7a7a77;
  } */
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const Items = styled.li`
  width: 50%;
  margin-bottom: 6px;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(100 100 94);
  &:hover {
    text-decoration: underline;
    color: #7a7a77;
  }
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(100 100 94);
  cursor: context-menu;
  &:hover {
    color: #7a7a77;
  }
`;

const Payment = styled.img`
  height: 40px;
`;

export const Footer = () => {
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Container>
        <Left>
          <Title style={{ marginTop: '4rem' }}>Zalazon.</Title>
          <Des>
            {lang === 'EN' ? (
              <>
                Zalazon. — aims to empower the Online Sellers in Hungary by
                giving them easy, fast, and efficient services with a focus on
                e-commerce. We aim to build trust, commitment, and sellers' and
                buyers' satisfaction with our platform. We plan to make starting
                an online business simple, professional, and easy with few
                clicks from home.
              </>
            ) : (
              <>
                Zalazon. — célja a magyarországi Online Eladók felhatalmazása
                azáltal, hogy egyszerű, gyors és hatékony szolgáltatást nyújt
                számukra az e-kereskedelemre fókuszálva. Célunk, hogy bizalmat,
                elkötelezettséget, valamint az eladók és a vevők elégedettségét
                kiépítsük platformunkkal. Azt tervezzük, hogy egy online
                vállalkozás elindítását egyszerűvé, professzionálissá és
                egyszerűvé tesszük, néhány kattintással otthonról.
              </>
            )}
          </Des>
          {/* <IconContainer>
            <Icon color=" #115dfd">
              <FacebookIcon />
            </Icon>
            <Icon color="  #FD1D1D">
              <InstagramIcon />
            </Icon>
            <Icon color="  #00acee">
              <TwitterIcon />
            </Icon>
            <Icon color=" #038fd3">
              <LinkedInIcon />
            </Icon>
          </IconContainer> */}
        </Left>
        <Center>
          {/* <Title className="footer_titles">Useful Links</Title>
          <List>
            <Items>Home</Items>
            <Items>Man Fashion</Items>
            <Items>Accessories</Items>
            <Items>Order Tracking</Items>
            <Items>Wishlist</Items>
            <Items>Cart</Items>
            <Items>Woman Fashion</Items>
            <Items>My Account</Items>
            <Items>Contact</Items>
            <Items>Terms</Items>
          </List> */}
          <div className="footerNew3">
            <div>
              <div className="rowNew3">
                <div>
                  <h4>{lang === 'EN' ? 'Pages' : 'Oldalak'}</h4>
                  <ul>
                    <li>
                      <Link to="">{lang === 'EN' ? 'About Us' : 'Rólunk'}</Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Our Services' : 'Szolgáltatásaink'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN'
                          ? 'Privacy & Policy'
                          : 'Adatvédelmi irányelvek'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN'
                          ? 'Refund Policy'
                          : 'Pénzvisszatérítési eljárás'}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>{lang === 'EN' ? 'Help' : 'Segítség'}</h4>

                  <ul>
                    <li>
                      <Link to="">{lang === 'EN' ? 'FAQ' : 'GYIK'}</Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Shipping' : 'Szállítás'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Seller Policy' : 'Eladói szabályzat'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Payouts' : 'Kifizetések'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">{lang === 'EN' ? 'Fees' : 'Díjak'}</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>
                    {lang === 'EN'
                      ? 'Connect with us'
                      : 'Kapcsolatba lép velünk'}
                  </h4>
                  <div className="socialButton">
                    <a
                      href="https://www.instagram.com/zalazon.hu/"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram-alt"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/zalazon.hu"
                      target="_blank"
                    >
                      <i className="bx bxl-facebook"></i>
                    </a>
                    {/* <i className="bx bxl-twitter"></i> */}
                    {/* <i className="bx bxl-discord-alt"></i> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Center>
        <Right>
          <ContactTitle className="footer_titles">
            {lang === 'EN' ? 'Contact' : 'Kapcsolatba lépni'}
          </ContactTitle>
          <ContactItem>
            <LocationOnIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            112 Nagy lajos Kiralyi utca Budapest, Hungary.
          </ContactItem>
          <ContactItem>
            <CallIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            +36 30 9916 218
          </ContactItem>
          <ContactItem>
            <EmailIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            zalazonkft@gmail.com
          </ContactItem>
          <Payment src="https://pasoroblesdailynews.com/wp-content/uploads/2018/03/payments.png" />
        </Right>
      </Container>
      <div className="copyright hideinMob">
        <p>Zalazon. © — 2022 All Right Reserved</p>
      </div>
      <ContainerMobile>
        <Left>
          <Title>Zalazon.</Title>
          <Des>
            {lang === 'EN' ? (
              <>
                Zalazon. — aims to empower the Online Sellers in Hungary by
                giving them easy, fast, and efficient services with a focus on
                e-commerce. We aim to build trust, commitment, and sellers' and
                buyers' satisfaction with our platform. We plan to make starting
                an online business simple, professional, and easy with few
                clicks from home.
              </>
            ) : (
              <>
                Zalazon. — célja a magyarországi Online Eladók felhatalmazása
                azáltal, hogy egyszerű, gyors és hatékony szolgáltatást nyújt
                számukra az e-kereskedelemre fókuszálva. Célunk, hogy bizalmat,
                elkötelezettséget, valamint az eladók és a vevők elégedettségét
                kiépítsük platformunkkal. Azt tervezzük, hogy egy online
                vállalkozás elindítását egyszerűvé, professzionálissá és
                egyszerűvé tesszük, néhány kattintással otthonról.
              </>
            )}
          </Des>
          {/* <IconContainer>
            <Icon color=" #115dfd">
              <FacebookIcon />
            </Icon>
            <Icon color="  #FD1D1D">
              <InstagramIcon />
            </Icon>
            <Icon color="  #00acee">
              <TwitterIcon />
            </Icon>
            <Icon color=" #038fd3">
              <LinkedInIcon />
            </Icon>
          </IconContainer> */}
        </Left>
        <Center>
          {/* <Title className="footer_titles">Useful Links</Title>
          <List>
            <Items>Home</Items>
            <Items>Man Fashion</Items>
            <Items>Accessories</Items>
            <Items>Order Tracking</Items>
            <Items>Wishlist</Items>
            <Items>Cart</Items>
            <Items>Woman Fashion</Items>
            <Items>My Account</Items>
            <Items>Contact</Items>
            <Items>Terms</Items>
          </List> */}
          <div className="footerNew3">
            <div>
              <div className="rowNew3">
                <div>
                  <h4>{lang === 'EN' ? 'Pages' : 'Oldalak'}</h4>
                  <ul>
                    <li>
                      <Link to="">{lang === 'EN' ? 'About Us' : 'Rólunk'}</Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Our Services' : 'Szolgáltatásaink'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN'
                          ? 'Privacy & Policy'
                          : 'Adatvédelmi irányelvek'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN'
                          ? 'Refund Policy'
                          : 'Pénzvisszatérítési eljárás'}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>{lang === 'EN' ? 'Help' : 'Segítség'}</h4>

                  <ul>
                    <li>
                      <Link to="">{lang === 'EN' ? 'FAQ' : 'GYIK'}</Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Shipping' : 'Szállítás'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Seller Policy' : 'Eladói szabályzat'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {lang === 'EN' ? 'Payouts' : 'Kifizetések'}
                      </Link>
                    </li>
                    <li>
                      <Link to="">{lang === 'EN' ? 'Fees' : 'Díjak'}</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>
                    {lang === 'EN'
                      ? 'Connect with us'
                      : 'Kapcsolatba lép velünk'}
                  </h4>
                  <div className="socialButton">
                    <a
                      href="https://www.instagram.com/zalazon.hu/"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram-alt"></i>
                    </a>
                    <a
                      href="https://www.facebook.com/zalazon.hu"
                      target="_blank"
                    >
                      <i className="bx bxl-facebook"></i>
                    </a>
                    {/* <i className="bx bxl-twitter"></i> */}
                    {/* <i className="bx bxl-discord-alt"></i> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Center>
        <Right>
          <ContactTitle className="footer_titles">
            {' '}
            {lang === 'EN' ? 'Contact' : 'Kapcsolatba lépni'}
          </ContactTitle>
          <ContactItem>
            <LocationOnIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            112 Nagy lajos Kiralyi utca Budapest, Hungary.
          </ContactItem>
          <ContactItem>
            <CallIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            +36 30 9916 218
          </ContactItem>
          <ContactItem>
            <EmailIcon
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            zalazonkft@gmail.com
          </ContactItem>
          <Payment src="https://pasoroblesdailynews.com/wp-content/uploads/2018/03/payments.png" />
        </Right>
        <div className="copyright">
          <p>Zalazon. © — 2022 All Right Reserved</p>
        </div>
      </ContainerMobile>

      {/* <div className="footer_main_div"> */}
      {/* <img src={Wave} alt="wave" style={{ width: '100%' }}></img> */}
      {/* <img src={Wave} alt="wave" className="footerblack_BG"></img> */}
      {/* <div className="f-content"> */}
      {/* <span>iamKhushalNasar@gmail.com</span>
          <div className="f-icons">
            <span>Insta</span>
            <span>fbook</span>
            <span>twitter</span>
          </div> */}
      {/* <footer className="footerMain">
            <div className="cont">
              <div className="row">
                <div>
                  <h2 className="footer_zalazon_mobile_title">Zalazon.</h2>
                  <p>
                    {lang === 'EN' ? (
                      <>
                        Zalazon. — is the future of e-commerce in Hungary. We
                        have started this new startup with young talented
                        experts to bring digital economy, digital shopping on a
                        large scale, and also fast and easy online shopping,
                        selling (online store) and delivery services to the
                        people of Hungary and fill the large gap of digital
                        shopping which is accessible to everyone.
                      </>
                    ) : (
                      <>
                        Zalazon. — ez az e-kereskedelem jövője Magyarországon.
                        Fiatal, tehetséges szakértőkkel indítottuk útjára ezt az
                        új startupot, hogy a digitális gazdaságot, a digitális
                        vásárlást, valamint a gyors és egyszerű online
                        vásárlást, értékesítést (online áruház) és kiszállítási
                        szolgáltatásokat is elhozzuk a magyar lakossághoz, és
                        betöltsük a digitális piac nagy hiányosságát. mindenki
                        számára elérhető vásárlás.
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="pagesTitle_mob">Pages</h4>
                  <ul>
                    <li>
                      <Link to="">About Us</Link>
                    </li>
                    <li>
                      <Link to="">Our services</Link>
                    </li>
                    <li>
                      <Link to="">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="">Our Policy</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>Help</h4>
                  <ul>
                    <li>
                      <Link to="">About Us</Link>
                    </li>
                    <li>
                      <Link to="">Our services</Link>
                    </li>
                    <li>
                      <Link to="">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="">Our Policy</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  {/* <h4>Social</h4> */}
      {/* <div className="socialButton">
                    <Link to="">
                      <i className="bx bxl-instagram-alt"></i>
                    </Link>
                    <Link to="">
                      <i className="bx bxl-facebook"></i>
                    </Link>
                    <Link to="">
                      <i className="bx bxl-twitter"></i>
                    </Link>
                    <Link to="">
                      <i className="bx bxl-discord-alt"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright">
              <p>Zalazon. — All Right Reserved</p>
            </div>
          </footer>
        </div>
      </div>  */}

      {/* <p>Zalazon. © — 2022 All Right Reserved</p> */}

      {/* <div className="footer_main_div2">
        <img src={Wave} alt="wave" style={{ width: '100%' }}></img>

        <div className="f-content2">
          <div>iamKhushalNasar@gmail.com</div>

          <div className="f-icons2">
            <Link to="">
              <i className="bx bxl-instagram-alt"></i>
            </Link>
            <Link to="">
              <i className="bx bxl-facebook"></i>
            </Link>
            <Link to="">
              <i className="bx bxl-twitter"></i>
            </Link>
            <Link to="">
              <i className="bx bxl-discord-alt"></i>
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Footer;
