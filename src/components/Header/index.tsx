import React, { useContext } from 'react';
import Link from 'next/link';
import { IconButton, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import {
  FaBell,
  FaBookmark,
  FaCog,
  FaExchangeAlt,
  FaMoon,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from 'react-icons/fa';

import { HeaderContainer, MenuListIcon } from './styles';
import { AuthContext } from '../../context/auth';
import ThemeContext from '../../context/theme';
import { ILoggedProfile } from '../../interfaces/Profile';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import SearchProfileHeader from '../Splitter/SearchProfileHeader';
import Logo from '../../assets/logo.svg';

const Header: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer>
      <Link href="/home">
        <a>
          <Logo />
        </a>
      </Link>
      <SearchProfileHeader />
      {auth.user ? (
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
          <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
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
                <MenuListIcon onClick={() => toggleTheme()}>
                  <FaMoon />
                  <p>Modo {!isDarkMode ? 'Escuro' : 'Claro'}</p>
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
      ) : (
        <div className="header-icons">
          <span />
          <span />
          <Link href="/login">
            <a title="Ir para o login">
              <FaSignInAlt />
            </a>
          </Link>
        </div>
      )}
    </HeaderContainer>
  );
};

export default React.memo(Header);
