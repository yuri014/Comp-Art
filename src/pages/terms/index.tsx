import React from 'react';

import Meta from '@components/SEO/Meta';
import ToggleThemeButton from '@components/ToggleTheme';
import Footer from '@components/Footer';
import Terms from './_terms.mdx';
import TermsContainer from './_styles';

const TermsPage: React.FC = () => (
  <TermsContainer className="container">
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
  </TermsContainer>
);

export default TermsPage;
