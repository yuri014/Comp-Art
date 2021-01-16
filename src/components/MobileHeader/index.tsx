import React from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';

import MobileHeaderContainer from './styles';

const MobileHeader: React.FC = () => (
  <MobileHeaderContainer>
    <Link href="/profile">
      <a>
        <Image
          src="/profile.jpg"
          alt="Imagem do perfil"
          width={500}
          height={500}
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
