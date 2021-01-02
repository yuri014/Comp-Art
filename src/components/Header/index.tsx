import React from 'react';
import { NoSsr, TextField, ThemeProvider } from '@material-ui/core';
import { FaBell, FaCog, FaScroll, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import HeaderContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';

const Header: React.FC = () => (
  <HeaderContainer>
    <h1>COMP-ART</h1>
    <div className="search-input">
      <ThemeProvider theme={formTheme}>
        <NoSsr>
          <TextField
            variant="outlined"
            id="search"
            label="Search"
            size="small"
            fullWidth
          />
        </NoSsr>
      </ThemeProvider>
      <button type="button">
        <FaSearch />
      </button>
    </div>
    <div className="header-icons">
      <Link href="/profile">
        <img
          src="https://images.pexels.com/photos/3981624/pexels-photo-3981624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Imagem de perfil"
        />
      </Link>
      <span>
        <FaBell />
      </span>
      <span>
        <FaScroll />
      </span>
      <span>
        <FaCog />
      </span>
    </div>
  </HeaderContainer>
);

export default Header;
