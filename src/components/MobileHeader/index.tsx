import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IconButton, SwipeableDrawer, ThemeProvider } from '@material-ui/core';

import ThemeContext from '@context/theme';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { ILoggedProfile } from '@interfaces/Profile';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import Logo from '../../assets/logo.svg';
import HomeProfile from '../HomeProfile';
import MobileHeaderContainer from './styles';

const MobileHeader: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(true);
  const isMount = usePreventMemoryLeak();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <MobileHeaderContainer>
      <nav className={visible ? '' : 'hide'}>
        <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
          <button
            className="profile"
            onClick={() => setIsDrawerOpen(true)}
            type="button"
          >
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
              alt="Imagem do perfil"
            />
          </button>
          <Link href="/home">
            <a>
              <Logo />
            </a>
          </Link>
          <IconButton
            color="secondary"
            type="button"
            aria-label={`Mudar para modo ${!isDarkMode ? 'Escuro' : 'Claro'}`}
            onClick={() => toggleTheme()}
          >
            {!isDarkMode ? <FaMoon /> : <FaSun />}
          </IconButton>
          {isMount && (
            <SwipeableDrawer
              anchor="left"
              onClose={() => setIsDrawerOpen(false)}
              onOpen={() => setIsDrawerOpen(true)}
              open={isDrawerOpen}
            >
              <HomeProfile getLoggedProfile={getLoggedProfile} />
            </SwipeableDrawer>
          )}
        </ThemeProvider>
      </nav>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
