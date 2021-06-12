import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IconButton, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaEnvelopeOpenText,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUserAlt,
} from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';

import Notification from '@components/Notification';
import { NewNotificationsProvider } from '@context/notification';
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
  const { push } = useRouter();
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
        <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
          <div className="header-icons">
            <button type="button">
              <FaEnvelopeOpenText />
            </button>
            <a
              href="https://www.catarse.me/compart_6d8c?ref=project_link"
              target="_blank"
              rel="noopener noreferrer"
              title="Apoiar Comp-Art"
            >
              <BiDonateHeart />
            </a>
            <NewNotificationsProvider>
              <Notification />
            </NewNotificationsProvider>
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
              <MenuItem
                onClick={() => push(`/profile/${getLoggedProfile.owner}`)}
              >
                <MenuListIcon>
                  <FaUserAlt />
                  <p>Meu Perfil</p>
                </MenuListIcon>
              </MenuItem>
              <MenuItem onClick={() => toggleTheme()}>
                <MenuListIcon>
                  <FaMoon />
                  <p>Modo {!isDarkMode ? 'Escuro' : 'Claro'}</p>
                </MenuListIcon>
              </MenuItem>
              <MenuItem onClick={() => push('/config')}>
                <MenuListIcon>
                  <FaCog />
                  <p>Configurações</p>
                </MenuListIcon>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  auth.logout();
                  push('/login');
                }}
              >
                <MenuListIcon>
                  <FaSignOutAlt />
                  <p>Sair</p>
                </MenuListIcon>
              </MenuItem>
            </Menu>
          </div>
        </ThemeProvider>
      ) : (
        <div className="header-icons">
          <span />
          <span />
          <button
            type="button"
            aria-label={`Mudar para modo ${!isDarkMode ? 'Escuro' : 'Claro'}`}
            onClick={() => toggleTheme()}
          >
            {!isDarkMode ? <FaMoon /> : <FaSun />}
          </button>
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
