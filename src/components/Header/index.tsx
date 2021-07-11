import React, { useContext } from 'react';
import Link from 'next/link';
import { NoSsr, ThemeProvider } from '@material-ui/core';
import { FaMoon, FaSignInAlt, FaSun } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';

import NotificationMenu from '@components/Notification/NotificationMenu';
import SearchInput from '@components/SearchInput';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import { HeaderContainer } from './styles';
import { AuthContext } from '../../context/auth';
import ThemeContext from '../../context/theme';
import { ILoggedProfile } from '../../interfaces/Profile';
import Logo from '../../assets/logo.svg';
import ProfileMenu from './ProfileMenu';

const Header: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <HeaderContainer>
        <Link href="/home">
          <a>
            <Logo />
          </a>
        </Link>
        <SearchInput />
        {auth.user ? (
          <NoSsr>
            <div className="header-icons">
              <span />
              <a
                href="https://www.catarse.me/compart_6d8c?ref=project_link"
                target="_blank"
                rel="noopener noreferrer"
                title="Apoiar Comp-Art"
              >
                <BiDonateHeart />
              </a>
              <NotificationMenu />
              <ProfileMenu
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                getLoggedProfile={getLoggedProfile}
                logout={auth.logout}
              />
            </div>
          </NoSsr>
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
    </ThemeProvider>
  );
};

export default React.memo(Header);
