import React, { useContext, useRef } from 'react';
import Lottie, { LottieRef } from 'lottie-react';

import Meta from '@components/SEO/Meta';
import SearchInput from '@components/SearchInput';
import ThemeContext from '@context/theme';
import NonAuthAltHeader from '@components/NonAuthAltHeader';
import { SearchPageContainer } from './_styles';
import * as animationData from '../../animations/search-item.json';

const SearchPage: React.FC = () => {
  const lottieRef: LottieRef = useRef();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <SearchPageContainer>
      <Meta
        uri="search"
        title="Busca - Comp-Art"
        description="Faça sua busca para encontrar novas artes e artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
      />
      <NonAuthAltHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="container">
        <SearchInput />
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
        <p className="no-data">Busque por perfis ou posts</p>
      </main>
    </SearchPageContainer>
  );
};

export default SearchPage;
