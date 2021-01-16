import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';
import {
  FaHashtag,
  FaPlusCircle,
  FaRegCompass,
  FaUserAlt,
  FaUserFriends,
  FaUsers,
} from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import Image from 'next/image';

import HomeProfileContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';
import ProgressBar from '../ProgressBar';
import GET_PROFILE from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';

const HomeProfile: React.FC = () => {
  const { data, loading } = useQuery(GET_PROFILE);

  if (loading) return <p>loading</p>;

  const { getProfile }: { getProfile: IProfile } = data;

  return (
    <HomeProfileContainer>
      <ThemeProvider theme={formTheme}>
        <div className="profile">
          <Image
            src={getProfile.avatar || '/profile.jpg'}
            alt="Imagem do perfil"
            width={800}
            height={800}
          />
          <div className="profile-info">
            <h2>{getProfile.name}</h2>
            <div className="profile-connections">
              <p>Seguidores: {getProfile.followers}</p>
              <p>Seguindo: {getProfile.following}</p>
            </div>
          </div>
        </div>
        <div className="profile-reputation">
          <div className="level">
            <p>Level:</p>
            <span>{getProfile.level}</span>
          </div>
          <div className="xp">
            <p>XP:</p>
            <ProgressBar value={getProfile.xp} />
          </div>
        </div>
        <div className="profile-buttons">
          <Link href="/profile">
            <a>
              <FaUserAlt />
              <p>Meu Perfil</p>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <FaRegCompass />
              <p>Explorar</p>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <FaUsers />
              <p>Grupos</p>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <FaUserFriends />
              <p>Fandom</p>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <FaPlusCircle className="post-icon" />
              <p>Publicar</p>
            </a>
          </Link>
        </div>
        <div className="profile-hashtags">
          <h3>
            <FaHashtag />
            &nbsp;Hashtags Seguidas
          </h3>
          <div className="hashtags">
            <span>#samba</span>
            <span>#lo-fi</span>
            <span>#serie</span>
            <span>#folk</span>
            <span>#danca</span>
          </div>
        </div>
      </ThemeProvider>
    </HomeProfileContainer>
  );
};

export default HomeProfile;
