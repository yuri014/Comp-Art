import React, { useContext, useState } from 'react';
import { QueryResult, useMutation, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';

import MobileFooter from '../../components/MobileFooter';
import { GET_IS_FOLLOWING, GET_PROFILE } from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';
import { Timeline } from '../../interfaces/Post';
import { ProfileContainer } from './_style';
import { AuthContext } from '../../context/auth';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_PROFILE_POSTS } from '../../graphql/queries/post';
import Post from '../../components/Post';
import SkeletonPost from '../../components/Post/SkeletonPost';
import Meta from '../../components/SEO/Meta';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import Header from '../../components/Header';
import ThemeContext from '../../context/theme';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import formatMetaHashtags from '../../utils/formatHashtags';
import ProfileLinks from '../../components/Splitter/ProfileLinks';

const FullScreenImage = dynamic(
  () => import('../../components/FullScreenImage'),
);

interface ProfileProps {
  username: string;
  profile: QueryResult<
    { getProfile: IProfile },
    {
      username: string;
    }
  >;
}

const Profile: React.FC<ProfileProps> = ({ username, profile }) => {
  const auth = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      id: profile.data.getProfile._id,
    },
    onCompleted: () => setIsFollowing(getIsFollowing.getIsFollowing),
  });

  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);

  const { client, data, error, loading: loadingPost, fetchMore } = useQuery<{
    getProfilePosts: Array<Timeline>;
  }>(GET_PROFILE_POSTS, {
    variables: { offset: 0, username },
    ssr: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    onCompleted: () => {
      if (data.getProfilePosts.length === 0) {
        client.cache.evict({ fieldName: 'getProfilePosts' });
      }
    },
  });

  const lastPostRef = useInfiniteScroll(
    data,
    () =>
      !!data.getProfilePosts &&
      fetchMore({
        variables: { offset: data.getProfilePosts.length },
      }).then(newPosts => newPosts.data.getProfilePosts.length < 3),
  );

  const { getProfile }: { getProfile: IProfile } = profile.data;

  const hasAuth = auth.user;

  const [followersCount, setFollowersCount] = useState(getProfile.followers);

  const checkFollowButton = () =>
    hasAuth && getProfile.owner !== auth.user.username;

  const hashtags = formatMetaHashtags(getProfile.hashtags);

  return (
    <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
      <Meta
        title={`${getProfile.owner} - Perfil`}
        description={`${getProfile.owner} é um ${
          getProfile.isArtist
            ? `artista que produz e/ou se interessa por ${hashtags}`
            : `apreciador de ${hashtags}`
        }`}
        keywords={`${getProfile.owner}, ${getProfile.name}, ${hashtags}, ${
          getProfile.bio
        }, ${getProfile.isArtist ? 'artista' : 'apreciador'}`}
        uri={`profile/${getProfile.owner}`}
      />
      <Header getLoggedProfile={getProfile} />
      <ProfileContainer>
        <main>
          <div className="cover-profile">
            {getProfile.coverImage !== '' ? (
              <img
                src={process.env.NEXT_PUBLIC_API_HOST + getProfile.coverImage}
                alt="Capa do perfil"
              />
            ) : (
              <div className="holder" />
            )}
          </div>
          <div className="container">
            <div
              className="avatar-profile"
              onClick={() => setIsImageFullScreen(true)}
              onKeyDown={() => setIsImageFullScreen(true)}
              onBlur={() => setIsImageFullScreen(false)}
              role="button"
              tabIndex={0}
            >
              <img
                src={process.env.NEXT_PUBLIC_API_HOST + getProfile.avatar}
                alt="Imagem do perfil"
              />
            </div>
            <div className="edit-profile">
              {hasAuth && getProfile.owner === auth.user.username && (
                <Link href="/profile/edit">
                  <a>
                    <button type="button">Editar perfil</button>
                  </a>
                </Link>
              )}

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
              <ProfileLinks links={getProfile.links} />
            </section>
          </div>
        </main>
        <section className="profile-posts">
          {loadingPost || error ? (
            <SkeletonPost />
          ) : (
            data.getProfilePosts.map((post, index) => {
              if (data.getProfilePosts.length === index + 1) {
                return (
                  <div
                    key={`${post.artist}_${post.createdAt}`}
                    ref={lastPostRef}
                  >
                    <Post post={post} />
                  </div>
                );
              }
              return (
                <div key={`${post.artist}_${post.createdAt}`}>
                  <Post post={post} />
                </div>
              );
            })
          )}
        </section>

        <MobileFooter />
        {isImageFullScreen && (
          <FullScreenImage
            img={process.env.NEXT_PUBLIC_API_HOST + getProfile.avatar}
            onClose={() => setIsImageFullScreen(false)}
          />
        )}
      </ProfileContainer>
    </ThemeProvider>
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

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username,
      profile,
    },
  };
};

export default Profile;
