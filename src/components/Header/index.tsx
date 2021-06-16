import React, { useContext } from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';
import { FaEnvelopeOpenText, FaMoon, FaSignInAlt, FaSun } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';

import Notification from '@components/Notification';
import { NewNotificationsProvider } from '@context/notification';
import { HeaderContainer } from './styles';
import { AuthContext } from '../../context/auth';
import ThemeContext from '../../context/theme';
import { ILoggedProfile } from '../../interfaces/Profile';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import SearchProfileHeader from '../Splitter/SearchProfileHeader';
import Logo from '../../assets/logo.svg';
import ProfileMenu from './ProfileMenu';

const Header: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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
            <ProfileMenu
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              getLoggedProfile={getLoggedProfile}
              logout={auth.logout}
            />
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
