import React, { useContext, useState } from 'react';
import { FaBell, FaCog, FaHome, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import {
  BottomNavigation,
  BottomNavigationAction,
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
            label="Search"
            value="/search"
            icon={<FaSearch />}
            onClick={() => routes.push('/search')}
          />
          <BottomNavigationAction
            label="Notifications"
            value="/notifications"
            icon={<FaBell />}
            onClick={() => routes.push('/notifications')}
          />
          <BottomNavigationAction
            label="Quest"
            value="/quest"
            icon={<FaCog />}
            onClick={() => routes.push('/config')}
          />
        </BottomNavigation>
      </ThemeProvider>
    </MobileFooterContainer>
  );
};

export default React.memo(MobileFooter);
