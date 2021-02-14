import React, { useState } from 'react';
import { FaBell, FaHome, FaScroll, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/dist/client/router';
import {
  BottomNavigation,
  BottomNavigationAction,
  ThemeProvider,
} from '@material-ui/core';

import MobileFooterContainer from './styles';
import mainTheme from '../../styles/themes/MainTheme';

const MobileFooter: React.FC = () => {
  const routes = useRouter();

  const [value, setValue] = useState(routes.pathname);

  const handleChange = (
    event: React.ChangeEvent<HTMLElement>,
    newValue: string,
  ) => {
    setValue(newValue);
  };

  return (
    <MobileFooterContainer>
      <ThemeProvider theme={mainTheme}>
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
            icon={<FaScroll />}
            onClick={() => routes.push('/quest')}
          />
        </BottomNavigation>
      </ThemeProvider>
    </MobileFooterContainer>
  );
};

export default React.memo(MobileFooter);
