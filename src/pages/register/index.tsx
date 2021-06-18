import React, { useState } from 'react';

import Footer from '@components/Footer';
import Meta from '@components/SEO/Meta';
import ChooseProfile from '@components/Splitter/ChooseProfile';
import RegisterForm from '@components/Splitter/RegisterForm';
import Title from '@components/Title';
import ToggleThemeButton from '@components/ToggleTheme';
import RegisterContainer from './_styles';

const ArtistHandler: React.FC = () => {
  const [isArtist, setIsArtist] = useState(true);

  return (
    <>
      <ChooseProfile isArtist={isArtist} setIsArtist={setIsArtist} />
      <RegisterForm isArtist={isArtist} />
    </>
  );
};

const SignUp: React.FC = () => (
  <>
    <Meta
      uri="register"
      title="Comp-Art - Cadastre-se"
      description="Cadastre-se para divulgar sua arte ou para apreciar a divulgar e apreciar a arte de outros artistas."
      keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, cadastro, entrar"
    />
    <RegisterContainer className="container">
      <div className="toggle-button">
        <ToggleThemeButton />
      </div>
      <main>
        <Title />
        <ArtistHandler />
      </main>
      <Footer />
    </RegisterContainer>
  </>
);

export default SignUp;
