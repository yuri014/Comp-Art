import React, { useContext, useState } from 'react';
import { FaBell, FaHome, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  NoSsr,
  ThemeProvider,
} from '@material-ui/core';

import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import MobileFooterContainer from './styles';

const MobileFooter: React.FC = () => {
  const routes = useRouter();
  const { isDarkMode } = useContext(ThemeContext);
  const [value, setValue] = useState(routes.pathname);

  const handleChange = (
    event: React.ChangeEvent<HTMLElement>,
    newValue: string,
  ) => {
    setValue(newValue);
  };

  return (
    <NoSsr>
      <MobileFooterContainer>
        <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Home"
              value="/home"
              icon={<FaHome />}
              onClick={() => routes.push('/home')}
            />

            <BottomNavigationAction
              label="Busca"
              value="/search"
              icon={<FaSearch />}
              onClick={() => routes.push('/search')}
            />
            <BottomNavigationAction
              label="Notificações"
              value="/notifications"
              icon={<FaBell />}
              onClick={() => routes.push('/notifications')}
            />
          </BottomNavigation>
        </ThemeProvider>
      </MobileFooterContainer>
    </NoSsr>
  );
};

export default React.memo(MobileFooter);
