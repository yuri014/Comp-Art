import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';

import MobileFooter from '../../components/MobileFooter';
import {
  GET_IS_FOLLOWING,
  GET_LOGGED_PROFILE,
  GET_PROFILE,
} from '../../graphql/queries/profile';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';
import { Timeline } from '../../interfaces/Post';
import ProfileContainer from './_styles';
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
import CASecondaryButton from '../../styles/components/secondaryButton';

const CAImage = dynamic(() => import('../../components/CAImage'));

interface ProfileProps extends ILoggedProfile {
  username: string;
  getProfile: IProfile;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  getProfile,
  getLoggedProfile,
}) => {
  const auth = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      id: getProfile._id,
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
            : `fã de ${hashtags}`
        }`}
        keywords={`${getProfile.owner}, ${getProfile.name}, ${hashtags}, ${
          getProfile.bio
        }, ${getProfile.isArtist ? 'artista' : 'fã'}`}
        uri={`profile/${getProfile.owner}`}
        seoImage={getProfile.avatar}
      />
      <Header getLoggedProfile={getLoggedProfile} />
      <ProfileContainer>
        <main>
          <div className="cover-profile">
            {getProfile.coverImage !== '' ? (
              <CAImage image={getProfile.coverImage} />
            ) : (
              <div className="holder" />
            )}
          </div>
          <div className="container">
            <CAImage className="avatar-profile" image={getProfile.avatar} />
            <div className="buttons-profile">
              <CASecondaryButton type="button">Patrocinar</CASecondaryButton>
              {hasAuth && getProfile.owner === auth.user.username && (
                <Link href="/profile/edit">
                  <a>
                    <CASecondaryButton className="main-color" type="button">
                      Editar perfil
                    </CASecondaryButton>
                  </a>
                </Link>
              )}

              {checkFollowButton() && isFollowing && !loading && (
                <CASecondaryButton
                  className="main-color"
                  type="button"
                  onClick={() => {
                    unfollow({
                      variables: { username: getProfile.owner },
                    });
                    setIsFollowing(false);
                    setFollowersCount(followersCount - 1);
                  }}
                >
                  Seguindo
                </CASecondaryButton>
              )}
              {checkFollowButton() && !isFollowing && !loading && (
                <CASecondaryButton
                  className="main-color"
                  onClick={() => {
                    follow({
                      variables: { username: getProfile.owner },
                    });
                    setIsFollowing(true);
                    setFollowersCount(followersCount + 1);
                  }}
                >
                  Seguir
                </CASecondaryButton>
              )}
              {!hasAuth && (
                <CASecondaryButton className="main-color" type="button">
                  Seguir
                </CASecondaryButton>
              )}
            </div>
            <section>
              <div className="profile">
                <div>
                  <h1 title={getProfile.name}>{getProfile.name}</h1>
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
                  <p>
                    Seguindo: <span>{getProfile.following}</span>
                  </p>
                  <p>
                    Seguidores: <span>{followersCount}</span>
                  </p>
                </div>
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
      </ProfileContainer>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { username } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const profile = await client.query({
    query: GET_PROFILE,
    variables: { username },
    errorPolicy: 'ignore',
  });

  const loggedProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }

  const { getProfile } = profile.data;
  const { getLoggedProfile } = loggedProfile.data;

  return {
    props: {
      username,
      getProfile,
      getLoggedProfile,
    },
  };
};

export default Profile;
