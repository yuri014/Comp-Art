import React, { useContext } from 'react';
import Link from 'next/link';
import {
  IconButton,
  Menu,
  MenuItem,
  NoSsr,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { FaCog, FaSearch } from 'react-icons/fa';

import HeaderContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';
import mainTheme from '../../styles/themes/MainTheme';
import { AuthContext } from '../../context/auth';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <Link href="/home">
          <a>
            <p>COMP-ART</p>
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
          <span />
          <ThemeProvider theme={mainTheme}>
            <IconButton
              aria-controls="menu-header"
              aria-haspopup="true"
              onClick={handleClick}
              color="secondary"
            >
              <FaCog size={16} />
            </IconButton>
            <Menu
              id="menu-header"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => auth.logout()}>Sair</MenuItem>
            </Menu>
          </ThemeProvider>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default React.memo(Header);
