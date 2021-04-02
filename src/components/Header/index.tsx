import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaExchangeAlt,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt,
} from 'react-icons/fa';

import { HeaderContainer, MenuListIcon } from './styles';
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
            <p>CompArt</p>
          </a>
        </Link>
        <div className="search-input">
          <input type="text" title="Buscar..." placeholder="Buscar..." />
          <div className="search-button">
            <IconButton type="button" aria-label="Buscar">
              <FaSearch />
            </IconButton>
          </div>
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
              <MenuItem>
                <Link href="/profile">
                  <MenuListIcon as="a">
                    <FaUserAlt />
                    <p>Meu Perfil</p>
                  </MenuListIcon>
                </Link>
              </MenuItem>
              <MenuItem>
                <MenuListIcon>
                  <FaMoon />
                  <p>Modo Escuro</p>
                </MenuListIcon>
              </MenuItem>
              <MenuItem>
                <Link href="/changelog">
                  <MenuListIcon as="a">
                    <FaExchangeAlt />
                    <p>Changelog</p>
                  </MenuListIcon>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/config">
                  <MenuListIcon as="a">
                    <FaCog />
                    <p>Configurações</p>
                  </MenuListIcon>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => auth.logout()}>
                <MenuListIcon>
                  <FaSignOutAlt />
                  <p>Sair</p>
                </MenuListIcon>
              </MenuItem>
            </Menu>
          </ThemeProvider>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default React.memo(Header);
