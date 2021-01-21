import React, { useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import {
  FaBandcamp,
  FaDeviantart,
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';
import { SiWattpad } from 'react-icons/si';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import { GET_PROFILE } from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';
import ProfileContainer from '../../styles/pages/profile/style';
import withAuth from '../../hocs/withAuth';
import { AuthContext } from '../../context/auth';
import { FOLLOW_PROFILE } from '../../graphql/mutations/profile';

const Profile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const auth = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      username,
    },
  });

  const [follow] = useMutation(FOLLOW_PROFILE, {
    onCompleted: response => console.log(response),
    onError: err => console.log(err),
  });

  if (loading) return <p>loading</p>;

  if (error) return <p>error</p>;

  const { getProfile }: { getProfile: IProfile } = data;
  return (
    <ProfileContainer>
      <Head>
        <title>{getProfile.owner} - Perfil</title>
      </Head>
      <Header />
      <main>
        <div className="cover-profile">
          {getProfile.coverImage ? (
            <img src={getProfile.coverImage} alt="Capa do perfil" />
          ) : (
            <div className="holder" />
          )}
        </div>
        <div className="avatar-profile">
          <img
            src={getProfile.avatar || '../profile.jpg'}
            alt="Imagem do perfil"
          />
        </div>
        <div className="edit-profile">
          {username === auth.user.username ? (
            <button type="button">Editar perfil</button>
          ) : (
            <button
              type="button"
              onClick={() =>
                follow({
                  variables: { username },
                })
              }
            >
              Seguir
            </button>
          )}
        </div>
        <section>
          <div className="profile">
            <div>
              <h1>{getProfile.name}</h1>
              <h2>@{getProfile.owner}</h2>
            </div>
            <div>
              <p>
                Level <span className="level">{getProfile.level}</span>
              </p>
              <p>Publicações: 0</p>
            </div>
            <div className="profile-follows">
              <p>Seguindo: {getProfile.following}</p>
              <p>Seguidores: {getProfile.followers}</p>
            </div>
          </div>
          <div className="mobile-profile-follows">
            <p>Seguindo: {getProfile.following}</p>
            <p>Seguidores: {getProfile.followers}</p>
          </div>
          {getProfile.bio && (
            <div className="bio">
              <p>{getProfile.bio}</p>
            </div>
          )}
          <div className="profile-links">
            {getProfile.links.soundcloud && (
              <a
                href={`http://soundcloud.com/${getProfile.links.soundcloud}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSoundcloud className="soundcloud-icon" />
              </a>
            )}
            {getProfile.links.twitter && (
              <a
                href={`http://twitter.com/${getProfile.links.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="twitter-icon" />
              </a>
            )}
            {getProfile.links.deviantart && (
              <a
                href={`http://deviantart.com/${getProfile.links.deviantart}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDeviantart className="deviantart-icon" />
              </a>
            )}
            {getProfile.links.bandcamp && (
              <a
                href={`http://${getProfile.links.bandcamp}.bandcamp.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaBandcamp className="bandcamp-icon" />
              </a>
            )}
            {getProfile.links.wattpad && (
              <a
                href={`http://wattpad.com/user/${getProfile.links.wattpad}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWattpad className="wattpad-icon" />
              </a>
            )}
            {getProfile.links.facebook && (
              <a
                href={`http://facebook.com/${getProfile.links.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="facebook-icon" />
              </a>
            )}
            {getProfile.links.pinterest && (
              <a
                href={`http://pinterest.com/${getProfile.links.pinterest}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest className="pinterest-icon" />
              </a>
            )}
            {getProfile.links.customLink && (
              <a
                href={getProfile.links.customLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="primary-icon" />
              </a>
            )}
          </div>
        </section>
      </main>
      <MobileFooter />
    </ProfileContainer>
  );
};

export default withAuth(Profile);
