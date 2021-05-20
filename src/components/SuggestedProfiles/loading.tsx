import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import mainLightTheme from '../../styles/themes/MainLightTheme';
import ThemeContext from '../../context/theme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';

const LoadingSuggestedProfile: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <div className="suggested-profile-container">
        <div className="suggested-profile">
          <Skeleton variant="circle" animation="wave" width={40} height={40} />
          <div className="suggested-profile-info">
            <Skeleton animation="wave" variant="text" width={140} height={20} />
            <Skeleton animation="wave" variant="text" width={80} height={15} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoadingSuggestedProfile;
