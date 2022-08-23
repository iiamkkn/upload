import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './SearchBox.css';
// import { mobile } from '../../ResponsiveDesign/responsive';
import { Modal, useMantineTheme } from '@mantine/core';

const SearchBTN = styled.button`
  display: flex;
  border-radius: 0 0.5rem 0.5rem 0;
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
  height: 40px;
  width: 40px;
  &:hover {
    background-color: #181818;
  }
`;

const SearchINPUT = styled.input`
  /* border-radius: 0.5rem 0 0 0.5rem; */
  border-radius: 3px;
  border-right: none;
  border: 1px solid rgb(201, 199, 199);
  margin-left: 0.5rem;
  padding: 4px 7px;
  width: 100%;
  height: 40px;

  && {
    ::placeholder {
      color: rgb(186 186 186);
    }
  }
  && {
    ::selection {
      width: 100%;
    }
  }
  &:hover {
    width: 100%;
  }
  &:active {
    width: 100%;
  }
`;

export default function SearchBox({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form onSubmit={submitHandler} className="infoFormModal">
        <h3>
          {lang === 'EN' ? (
            <>Search anything you wish &nbsp;&nbsp; — &nbsp; Zalazon.</>
          ) : (
            <>Keressen bármit, amit szeretne &nbsp;&nbsp; — &nbsp; Zalazon.</>
          )}
        </h3>
        <div>
          {' '}
          <SearchINPUT
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'EN' ? 'Search Products...' : 'Termékek keresése...'
            }
            aria-label="Search Products"
            aria-describedby="button-search"
            className="BootstrapSearchInput"
          ></SearchINPUT>
          <SearchBTN
            type="submit"
            id="button-search"
            onClick={() => setModalOpened(false)}
          >
            <i
              className="fa fa-search top_modal_search_icon"
              onClick={() => setModalOpened(false)}
            ></i>
          </SearchBTN>
        </div>
      </form>
    </Modal>
  );
}
