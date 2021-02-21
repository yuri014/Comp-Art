import React, { useContext } from 'react';
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
import Skeleton from '@material-ui/lab/Skeleton';

import HomeProfileContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';
import ProgressBar from '../ProgressBar';
import { ILoggedProfile } from '../../interfaces/Profile';
import TagsContainer from '../../styles';
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
            <h2>{getLoggedProfile.name}</h2>
            <div className="profile-connections">
              <p>Seguidores: {getLoggedProfile.followers}</p>
              <p>Seguindo: {getLoggedProfile.following}</p>
            </div>
          </div>
        </div>
        <div className="profile-reputation">
          {context && context.level ? (
            <>
              <div className="level">
                <p>Level:</p>
                <span>{context.level.getLoggedProfile.level}</span>
              </div>
              <div className="xp">
                <p>XP:</p>
                <ProgressBar value={context.level.getLoggedProfile.xp} />
              </div>
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
          {getLoggedProfile.isArtist && (
            <Link href="/new-post">
              <a>
                <FaPlusCircle className="post-icon" />
                <p>Publicar</p>
              </a>
            </Link>
          )}
        </div>
        <div className="profile-hashtags">
          <h3>
            <FaHashtag />
            &nbsp;Hashtags Seguidas
          </h3>
          <TagsContainer>
            {getLoggedProfile.hashtags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </TagsContainer>
        </div>
      </ThemeProvider>
    </HomeProfileContainer>
  );
};

export default HomeProfile;
