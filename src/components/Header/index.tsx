import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import {
  FaBell,
  FaBookmark,
  FaCog,
  FaExchangeAlt,
  FaMoon,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserAlt,
} from 'react-icons/fa';

import { HeaderContainer, MenuListIcon } from './styles';
import { AuthContext } from '../../context/auth';
import ThemeContext from '../../context/theme';
import toggleTheme from '../../utils/toggleTheme';
import { ILoggedProfile } from '../../interfaces/Profile';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';

const Header: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
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
          <Link href="/market">
            <a title="Ir para o marketplace">
              <FaShoppingCart />
            </a>
          </Link>
          <Link href="/market">
            <a title="Ir para o marketplace">
              <FaBell />
            </a>
          </Link>
          <Link href="/market">
            <a title="Ir para os salvos">
              <FaBookmark />
            </a>
          </Link>
          <ThemeProvider
            theme={theme === 'light' ? mainLightTheme : mainDarkTheme}
          >
            <IconButton
              aria-controls="menu-header"
              aria-haspopup="true"
              aria-label="Abrir menu de configurações"
              onClick={handleClick}
              color="secondary"
            >
              <img
                src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
                alt="Foto do perfil"
              />
            </IconButton>
            <Menu
              id="menu-header"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link href={`/profile/${getLoggedProfile.owner}`}>
                  <MenuListIcon as="a">
                    <FaUserAlt />
                    <p>Meu Perfil</p>
                  </MenuListIcon>
                </Link>
              </MenuItem>
              <MenuItem>
                <MenuListIcon onClick={() => toggleTheme(theme, setTheme)}>
                  <FaMoon />
                  <p>Modo {theme === 'light' ? 'Escuro' : 'Claro'}</p>
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
