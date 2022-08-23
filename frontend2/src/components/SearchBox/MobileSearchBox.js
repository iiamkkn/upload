import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './SearchBox.css';
import { mobile } from '../../ResponsiveDesign/responsive';

const SearchDIV = styled.div`
  display: none;
  ${mobile({ display: 'block', alignItems: 'center' })}
`;
const SearchBTN = styled.button`
  border-radius: 0 0.5rem 0.5rem 0;
  height: 30px;
  border-right: none;
  margin-right: 0.5rem;
  border: 1px solid #424242;
  padding: 5px 7px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: filter 300ms;
  opacity: 0.9;
  transition: all 0.5s ease;
  &:hover {
    background-color: #181818;
  }
`;

const SearchINPUT = styled.input`
  border-radius: 0.1rem 0 0 0.1rem;
  border-right: none;
  border: 1px solid rgb(201, 199, 199);
  margin-top: 0.5rem;
  padding: 4px 7px;
  height: 30px;
  width: 85%;
`;

export default function MobileSearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <form onSubmit={submitHandler}>
      <SearchDIV>
        <SearchINPUT
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
          className="BootstrapSearchInput"
        ></SearchINPUT>
        <SearchBTN type="submit" id="button-search">
          <i className="fa fa-search"></i>
        </SearchBTN>
      </SearchDIV>
    </form>
  );
}
