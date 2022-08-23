import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from './data';
import { mobile, Mscreen } from '../../ResponsiveDesign/responsive';
import { Link } from 'react-router-dom';
const Container = styled.div`
  margin-top: 2px;
  width: 100%;
  height: 60vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
  border: 1px solid #bcbcbc;
  ${mobile({
    width: '25px',
    height: '25px',
  })}
  ${Mscreen({
    width: '35px',
    height: '35px',
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  ${mobile({
    width: '100px',
  })}
  ${Mscreen({
    width: '150px',
  })}
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 50px;
  ${mobile({
    padding: '0',
  })}
  ${Mscreen({
    padding: '0',
  })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${Mscreen({
    position: 'relative',
    top: '50%',
    fontSize: '50px',
    marginTop: '180px',
  })}
  ${mobile({
    position: 'relative',
    top: '50%',
    fontSize: '30px',
    marginTop: '180px',
    marginLeft: '-50px',
  })}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({
    display: 'none',
  })}
  ${Mscreen({
    display: 'none',
  })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${mobile({
    padding: '5px',
    position: 'absolute',
    bottom: '3%',
    background: '#fff',
    border: '2px solid #000',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#303030',
    marginLeft: '-47px',
  })}
`;

const MainSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
    }
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{lang === 'EN' ? item.title : item.titleHU}</Title>
              <Desc>{lang === 'EN' ? item.desc : item.descHU}</Desc>
              <Button>
                <Link
                  to="/search"
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  {lang === 'EN' ? 'BUY NOW' : 'VÁSÁROLJ MOST'}
                </Link>
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default MainSlider;
