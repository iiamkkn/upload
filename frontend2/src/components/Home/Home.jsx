import React from 'react';
import Announcement from '../Announcement/Announcement';
import Navbar from '../Navbar/Navbar';
import MainSlider from '../MainSlider/MainSlider';
import Footer from '../Footer/Footer';
import NewsLetter from '../NewsLetter/NewsLetter';
import { Categories } from '../Categories/Categories';
import HomeScreenProducts from '../../screens/others/HomeScreenProducts';
// import ChatBox from '../ChatBox/ChatBox';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';
import styled from 'styled-components';

const HomePages = styled.div`
  ${mobile({ width: '100vw', overflow: 'hidden' })}
  ${Mscreen({ width: '100vw', overflow: 'hidden' })}
`;
const Home = () => {
  return (
    <HomePages>
      <Announcement />
      <Navbar />
      <Categories />
      <MainSlider />
      <HomeScreenProducts />
      <NewsLetter />
      {/* <ChatBox /> */}
      <Footer />
    </HomePages>
  );
};

export default Home;
