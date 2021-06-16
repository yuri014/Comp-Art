import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';
import { FaBookmark, FaHome, FaRegCompass, FaUserAlt } from 'react-icons/fa';

import { HomeProfileContainer } from './styles';
import formTheme from '../../styles/themes/FormTheme';
import { ILoggedProfile } from '../../interfaces/Profile';
import LevelProgress from './utils/LevelProgress';

const HomeProfile: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => (
  <HomeProfileContainer>
    <ThemeProvider theme={formTheme}>
      <div className="profile">
        <figure>
          <img
            src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
            alt="Imagem do perfil"
          />
        </figure>
        <div className="profile-info">
          <h1 className="limited-text">{getLoggedProfile.name}</h1>
          <h2 className="limited-text">@{getLoggedProfile.owner}</h2>
          <p>Seguidores: {getLoggedProfile.followers}</p>
          <p>Seguindo: {getLoggedProfile.following}</p>
        </div>
      </div>
      <LevelProgress />
      <div className="profile-buttons">
        <Link href="/home">
          <a>
            <FaHome />
            <p>Página Inicial</p>
          </a>
        </Link>
        <Link href={`/profile/${getLoggedProfile.owner}`}>
          <a>
            <FaUserAlt />
            <p>Meu Perfil</p>
          </a>
        </Link>
        <Link href="/explore">
          <a>
            <FaRegCompass />
            <p>Explorar</p>
          </a>
        </Link>
        <Link href="/saved-posts">
          <a>
            <FaBookmark />
            <p>Salvos</p>
          </a>
        </Link>
      </div>
    </ThemeProvider>
  </HomeProfileContainer>
);

export default React.memo(HomeProfile);
