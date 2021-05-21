import React, { useContext } from 'react';
import Link from 'next/link';
import { LinearProgress, ThemeProvider } from '@material-ui/core';
import { FaBookmark, FaRegCompass, FaUserAlt, FaUsers } from 'react-icons/fa';
import Skeleton from '@material-ui/lab/Skeleton';

import { HomeProfileContainer } from './styles';
import formTheme from '../../styles/themes/FormTheme';
import { ILoggedProfile } from '../../interfaces/Profile';
import LevelContext from '../../context/level';

const HomeProfile: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const context = useContext(LevelContext);

  return (
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
        <div className="profile-reputation">
          {context && context.level ? (
            <>
              <div className="xp">
                <div className="level">
                  <p>Level:</p>
                  <span>{context.level.getLoggedProfile.level}</span>
                </div>
                <p>{context.level.getLoggedProfile.xp}%</p>
              </div>
              <LinearProgress
                variant="determinate"
                value={context.level.getLoggedProfile.xp}
              />
            </>
          ) : (
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              height={20}
            />
          )}
        </div>
        <div className="profile-buttons">
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
          <Link href="/profile">
            <a>
              <FaUsers />
              <p>Grupos</p>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <FaBookmark />
              <p>Salvos</p>
            </a>
          </Link>
        </div>
      </ThemeProvider>
    </HomeProfileContainer>
  );
};

export default React.memo(HomeProfile);
