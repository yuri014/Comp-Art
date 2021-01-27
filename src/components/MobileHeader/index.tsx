import React from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { useQuery } from '@apollo/client';

import MobileHeaderContainer from './styles';
import { GET_LOGGED_PROFILE } from '../../graphql/queries/profile';
import { ILoggedProfile } from '../../interfaces/Profile';
import ErrorRequest from '../ErrorRequest';

const MobileHeader: React.FC = () => {
  const { data, loading, error } = useQuery<ILoggedProfile>(GET_LOGGED_PROFILE);

  if (loading) return <p>loading</p>;

  if (error) return <ErrorRequest />;

  const { getLoggedProfile } = data;

  return (
    <MobileHeaderContainer>
      <Link href="/profile">
        <a>
          <Image
            src={getLoggedProfile.avatar || '/profile.jpg'}
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
};

export default MobileHeader;
