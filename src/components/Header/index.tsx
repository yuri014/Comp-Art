import React from 'react';
import { Link, NoSsr, TextField, ThemeProvider } from '@material-ui/core';
import { FaBell, FaCog, FaScroll, FaSearch } from 'react-icons/fa';

import HeaderContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';

const Header: React.FC = () => (
  <HeaderContainer>
    <Link href="/home">
      <a>
        <h1>COMP-ART</h1>
      </a>
    </Link>
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
