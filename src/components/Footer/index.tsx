import React from 'react';
import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';

import FooterContainer from './styles';

const Footer: React.FC = () => (
  <FooterContainer>
    <FaGamepad />
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
