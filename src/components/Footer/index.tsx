import React from 'react';

import FooterContainer from './styles';
import Logo from '../../assets/logo.svg';

const Footer: React.FC = () => (
  <FooterContainer>
    <Logo />

    <div>
      <a href="/about" target="_blank">
        Sobre
      </a>
      <a href="/terms" target="_blank">
        Termos de uso
      </a>
      <a href="/privacy-policy" target="_blank">
        Políticas de privacidade
      </a>
    </div>
  </FooterContainer>
);

export default Footer;
