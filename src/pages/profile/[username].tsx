import React, { useContext, useState } from 'react';
import Head from 'next/head';
import { QueryResult, useMutation, useQuery } from '@apollo/client';
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
import { GetServerSideProps } from 'next';
import Skeleton from '@material-ui/lab/Skeleton';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import { GET_IS_FOLLOWING, GET_PROFILE } from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';
import { IPost } from '../../interfaces/Post';
import ProfileContainer from '../../styles/pages/profile/style';
import { AuthContext } from '../../context/auth';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_PROFILE_POSTS } from '../../graphql/queries/post';
import Post from '../../components/Post';

interface ProfileProps {
  username: string;
  profile: QueryResult<
    { getProfile: IProfile },
    {
      username: string;
    }
  >;
  profilePosts: QueryResult<
    { getProfilePosts: Array<IPost> },
    {
      username: string;
    }
  >;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  profile,
  profilePosts,
}) => {
  const auth = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      username,
    },
    onCompleted: () => setIsFollowing(getIsFollowing.getIsFollowing),
  });

  const { data } = profile;

  const {
    data: { getProfilePosts },
  } = profilePosts;

  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);

  const { getProfile }: { getProfile: IProfile } = data;

  const hasAuth = auth.user;

  const [followersCount, setFollowersCount] = useState(getProfile.followers);

  const checkFollowButton = () =>
    hasAuth && getProfile.owner !== auth.user.username;

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
        <div className="container">
          <div className="avatar-profile">
            <img
              src={getProfile.avatar || '../profile.jpg'}
              alt="Imagem do perfil"
            />
          </div>
          <div className="edit-profile">
            {hasAuth && getProfile.owner === auth.user.username && (
              <button type="button">Editar perfil</button>
            )}

            {loading && <Skeleton width={60} height={40} />}

            {checkFollowButton() && isFollowing && !loading && (
              <button
                type="button"
                onClick={() => {
                  unfollow({
                    variables: { username: getProfile.owner },
                  });
                  setIsFollowing(false);
                  setFollowersCount(followersCount - 1);
                }}
              >
                Deixar de Seguir
              </button>
            )}
            {checkFollowButton() && !isFollowing && !loading && (
              <button
                type="button"
                onClick={() => {
                  follow({
                    variables: { username: getProfile.owner },
                  });
                  setIsFollowing(true);
                  setFollowersCount(followersCount + 1);
                }}
              >
                Seguir
              </button>
            )}
            {!hasAuth && <button type="button">Seguir</button>}
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
                {getProfile.sharedPostCount !== null && (
                  <p>Publicações: {getProfile.sharedPostCount}</p>
                )}
                {getProfile.postCount !== null && (
                  <p>Publicações: {getProfile.postCount}</p>
                )}
              </div>
              <div className="profile-follows">
                <p>Seguindo: {getProfile.following}</p>
                <p>Seguidores: {followersCount}</p>
              </div>
            </div>
            <div className="mobile-profile-follows">
              <p>Seguindo: {getProfile.following}</p>
              <p>Seguidores: {followersCount}</p>
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
        </div>
      </main>
      <div className="container">
        <section className="profile-posts">
          {getProfilePosts.map(post => (
            <Post key={`${post.artist}_${post.createdAt}`} post={post} />
          ))}
        </section>
      </div>
      <MobileFooter />
    </ProfileContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { username } = context.params;

  const client = initializeApollo();

  const profile = await client.query({
    query: GET_PROFILE,
    variables: { username },
    errorPolicy: 'ignore',
  });

  const profilePosts = await client.query({
    query: GET_PROFILE_POSTS,
    variables: { offset: 0, username },
  });

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username,
      profile,
      profilePosts,
    },
  };
};

export default Profile;
