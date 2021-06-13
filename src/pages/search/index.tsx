import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';

import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import NonAuthAltHeader from '@components/NonAuthAltHeader';

// eslint-disable-next-line arrow-body-style
const SearchPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <Meta
        uri="search"
        title="Busca - Comp-Art"
        description="Faça sua busca para encontrar novas artes e artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
      />
      <NonAuthAltHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default SearchPage;
