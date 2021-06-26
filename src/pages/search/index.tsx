import React, { useContext, useRef } from 'react';
import Lottie, { LottieRef } from 'lottie-react';
import { ThemeProvider } from '@material-ui/core';

import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import NonAuthAltHeader from '@components/NonAuthAltHeader';
import Input from '@components/Input';
import { SearchPageContainer } from './_styles';
import * as animationData from '../../animations/search-item.json';

const SearchPage: React.FC = () => {
  const lottieRef: LottieRef = useRef();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <SearchPageContainer>
      <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
        <Meta
          uri="search"
          title="Busca - Comp-Art"
          description="Faça sua busca para encontrar novas artes e artistas."
          keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
        />
        <NonAuthAltHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="container">
          <Input name="search" type="text" placeholder="Buscar..." />
          <div className="animation-container">
            <Lottie
              autoPlay={false}
              loop={false}
              animationData={animationData}
              onEnterFrame={() => {
                lottieRef.current.setSpeed(1);
              }}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
              height="auto"
              width="auto"
              lottieRef={lottieRef}
            />
          </div>
          <p className="no-data">Sem resultados por enquanto...</p>
        </main>
      </ThemeProvider>
    </SearchPageContainer>
  );
};

export default SearchPage;
