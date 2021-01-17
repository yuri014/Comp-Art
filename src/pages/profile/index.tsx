import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import {
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';
import { SiWattpad } from 'react-icons/si';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import GET_PROFILE from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';
import ProfileContainer from '../../styles/pages/profile/style';

const Profile: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PROFILE);

  if (loading) return <p>loading</p>;

  if (error) return <p>error</p>;

  const { getProfile }: { getProfile: IProfile } = data;
  return (
    <ProfileContainer>
      <Head>
        <title>USERNAME - Perfil</title>
      </Head>
      <Header />
      <main>
        <div className="cover-profile">
          <img src={getProfile.coverImage} alt="Capa do perfil" />
        </div>
        <div className="avatar-profile">
          <img src={getProfile.avatar} alt="Imagem do perfil" />
        </div>
        <section>
          <div className="profile">
            <div>
              <h1>{getProfile.name}</h1>
              <h2>@yuri014</h2>
            </div>
            <p>
              Level <span className="level">{getProfile.level}</span>
            </p>
          </div>
          <div className="bio">
            <p>{getProfile.bio}</p>
          </div>
          <div className="follows-and-links">
            <div className="profile-follows">
              <p>Seguindo: {getProfile.following}</p>
              <p>Seguidores: {getProfile.followers}</p>
            </div>
            <div className="profile-links">
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSoundcloud className="soundcloud-icon" />
              </a>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="twitter-icon" />
              </a>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest className="pinterest-icon" />
              </a>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWattpad className="wattpad-icon" />
              </a>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="facebook-icon" />
              </a>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="additional-link" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <MobileFooter />
    </ProfileContainer>
  );
};

export default Profile;
