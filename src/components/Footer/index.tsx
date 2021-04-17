import React from 'react';
import Link from 'next/link';

import FooterContainer from './styles';
import Logo from '../../assets/logo.svg';

const Footer: React.FC = () => (
  <FooterContainer>
    <Logo />

    <div>
      <Link href="/about">
        <a>Sobre</a>
      </Link>
      <Link href="/terms">
        <a>Termos de uso</a>
      </Link>
      <Link href="/about">
        <a>Políticas de privacidade</a>
      </Link>
    </div>
  </FooterContainer>
);

export default Footer;
