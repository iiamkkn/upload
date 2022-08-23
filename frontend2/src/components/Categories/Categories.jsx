import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Categories.css';
import { mobile } from '../../ResponsiveDesign/responsive';

const Container = styled.div`
  display: flex;
  padding: 15px 30px;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  ${mobile({
    justifyContent: 'center',
    padding: '15px 0px',
    marginTop: '2.5rem',
  })}
`;

const CategoriesItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  place-items: center;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 0.5rem;
  /* overflow: hidden; */
  color: #000;
  cursor: pointer;
  &:hover {
    color: blue;
    background-color: #f7f7f7;
    box-shadow: 1px 1px 1px rgb(220 220 220), -1px -1px 1px rgb(240 240 220);
  }
  ${mobile({ border: '1px solid #e1e1e1' })}
`;
const Img = styled.img`
  object-fit: cover;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* width: 50px;
  height: 50px; */
  overflow: hidden;
`;
const Title = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  place-content: center;
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: normal;
  color: rgb(94 94 94);
  font-family: Arial, Helvetica, sans-serif;
  &:hover {
    color: blue;
  }
  ${mobile({ fontSize: '12px' })}
`;

export const Categories = () => {
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Container>
        <Link to="/search?category=Clothes" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660426725/Zalazon_Icons/clothes_j2uovs.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Clothes' : 'Ruhák'}</Title>
          </CategoriesItem>
        </Link>

        <Link to="/search?category=Shoes" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660426810/Zalazon_Icons/shoes_zkvqof.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Shoes' : 'Cipők'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Sports" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427123/Zalazon_Icons/sports_nivp2a.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Sport' : 'Sport'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Travelling" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427227/Zalazon_Icons/travelling_xdzypg.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Travel' : 'Utazó'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Electronics" className="Category-link">
          <CategoriesItem style={{ width: '68px' }}>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427999/Zalazon_Icons/Electronics2_ahaxai.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Electronics' : 'Elektronika'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Cosmetics" className="Category-link">
          <CategoriesItem style={{ width: '68px' }}>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1661064755/Zalazon_Icons/cosmetics_u5gsvn.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Cosmetics' : 'Kozmetikumok'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Women" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427395/Zalazon_Icons/women_gb49mw.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Women' : 'Nők'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Men" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427396/Zalazon_Icons/men_ntqpbs.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Men' : 'Férfiak'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Kids" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427462/Zalazon_Icons/kids_sxrjtn.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Kids' : 'Gyerekek'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Kitchen" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427929/Zalazon_Icons/Kitchen2_lhdvtq.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Kitchen' : 'Konyha'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Erotics" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660427811/Zalazon_Icons/erotic2_cjwggo.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Erotic' : 'Erotika'}</Title>
          </CategoriesItem>
        </Link>
        <Link to="/search?category=Decoration" className="Category-link">
          <CategoriesItem style={{ width: '68px' }}>
            <Img
              src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660428102/Zalazon_Icons/decoration_vfowac.png"
              alt="img name"
            />
            <Title>{lang === 'EN' ? 'Decoration' : 'Dekoráció'}</Title>
          </CategoriesItem>
        </Link>
        {/* <Link to="/search?category=Shoes" className="Category-link">
          <CategoriesItem>
            <Img
              src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png"
              alt="img name"
            />
            <Title>Travelling</Title>
          </CategoriesItem>
        </Link> */}
      </Container>
    </>
  );
};
