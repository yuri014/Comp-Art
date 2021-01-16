import React from 'react';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import MobileHeaderContainer from './styles';
import GET_PROFILE from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';

const MobileHeader: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_PROFILE);

  if (loading) return <p>loading</p>;

  if (error) {
    router.push('/register');
    return <p>error</p>;
  }

  const { getProfile }: { getProfile: IProfile } = data;

  return (
    <MobileHeaderContainer>
      <Link href="/profile">
        <a>
          <Image
            src={getProfile.avatar || '/profile.jpg'}
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
