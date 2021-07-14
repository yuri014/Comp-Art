import React from 'react';

import Meta from '@components/SEO/Meta';
import ToggleThemeButton from '@components/ToggleTheme';
import Footer from '@components/Footer';
import BureaucracyPageContainer from '@styles/pages/bureaucracyPages';
import Terms from './_terms.mdx';

const TermsPage: React.FC = () => (
  <BureaucracyPageContainer className="container">
    <Meta
      uri="terms"
      title="Termos - Comp-Art"
      description="Termos de uso da plataforma."
      keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, termos, termos de uso, regras"
    />
    <div className="toggle-button">
      <ToggleThemeButton />
    </div>
    <main>
      <Terms />
    </main>
    <main />
    <Footer />
  </BureaucracyPageContainer>
);

export default TermsPage;
