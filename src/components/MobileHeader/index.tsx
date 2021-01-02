import React from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';

import MobileHeaderContainer from './styles';

const MobileHeader: React.FC = () => (
  <MobileHeaderContainer>
    <Link href="/profile">
      <a>
        <img
          src="https://images.pexels.com/photos/3981624/pexels-photo-3981624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Imagem de perfil"
        />
      </a>
    </Link>
    <Link href="/home">
      <a>
        <h1>COMP-ART</h1>
      </a>
    </Link>
    <Link href="/config">
      <a>
        <FaCog />
      </a>
    </Link>
  </MobileHeaderContainer>
);

export default MobileHeader;
