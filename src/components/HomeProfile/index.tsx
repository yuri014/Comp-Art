import React from 'react';
import Link from 'next/link';
import { LinearProgress, ThemeProvider } from '@material-ui/core';

import { FaPlusCircle, FaRegCompass, FaUserAlt, FaUsers } from 'react-icons/fa';
import HomeProfileContainer from './styles';
import formTheme from '../../styles/themes/FormTheme';

const HomeProfile: React.FC = () => (
  <HomeProfileContainer>
    <ThemeProvider theme={formTheme}>
      <div className="profile">
        <img
          src="https://images.pexels.com/photos/3981624/pexels-photo-3981624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Imagem de perfil"
        />
        <div className="profile-info">
          <h2>Nome do Perfil</h2>
          <div className="profile-connections">
            <p>Seguidores: 270</p>
            <p>Seguindo: 300</p>
          </div>
        </div>
      </div>
      <div className="profile-reputation">
        <div className="level">
          <p>Level:</p>
          <span>1</span>
        </div>
        <div className="xp">
          <p>XP:</p>
          <div className="xp-progress">
            <LinearProgress variant="determinate" value={90} />
            <p>90%</p>
          </div>
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
            <FaPlusCircle className="post-icon" />
            <p>Publicar</p>
          </a>
        </Link>
      </div>
      <div className="profile-hashtags">
        <h3>Hashtags Seguidas</h3>
        <div className="hashtags">
          <span>#samba</span>
          <span>#lo-fi</span>
          <span>#fotografia</span>
          <span>#instrumental</span>
          <span>#curta-metragem</span>
          <span>#serie</span>
          <span>#folk</span>
          <span>#danca</span>
        </div>
      </div>
    </ThemeProvider>
  </HomeProfileContainer>
);

export default HomeProfile;
