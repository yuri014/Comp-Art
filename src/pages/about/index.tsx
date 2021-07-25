import React from 'react';

import Meta from '@components/SEO/Meta';
import BureaucracyPageContainer from '@styles/pages/bureaucracyPages';
import Footer from '@components/Footer';
import ToggleThemeButton from '@components/ToggleTheme';
import About from './_about.mdx';

const AboutPage: React.FC = () => (
  <BureaucracyPageContainer className="container">
    <Meta
      uri="terms"
      title="Sobre - Comp-Art"
      description="Sobre a plataforma."
      keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, sobre, como funciona"
    />
    <div className="toggle-button">
      <ToggleThemeButton />
    </div>
    <main>
      <About />
    </main>
    <main />
    <Footer />
  </BureaucracyPageContainer>
);

export default AboutPage;
