import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ThemeProvider } from '@material-ui/core';

import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import Post from '@components/Post';
import SkeletonPost from '@components/Post/SkeletonPost';
import ProfileLinks from '@components/Splitter/ProfileLinks';
import { AuthContext } from '@context/auth';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import { GET_PROFILE_POSTS } from '@graphql/queries/post';
import {
  GET_IS_FOLLOWING,
  GET_PROFILE,
  GET_LOGGED_PROFILE,
} from '@graphql/queries/profile';
import useInfiniteScroll from '@hooks/infiniteScroll';
import { Timeline } from '@interfaces/Post';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import CASecondaryButton from '@styles/components/secondaryButton';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import ArtistPost from '@components/Post/ArtistPost';
import ProfileSEO from '@components/SEO/ProfileSEO';
import ProfileContainer from './_styles';

const CAImage = dynamic(() => import('@components/CAImage'));

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

  return (
    <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
      <ProfileSEO getProfile={getProfile} />
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
                    <Post post={post}>
                      <ArtistPost post={post} />
                    </Post>
                  </div>
                );
              }
              return (
                <div key={`${post.artist}_${post.createdAt}`}>
                  <Post post={post}>
                    <ArtistPost post={post} />
                  </Post>
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

  if (jwtToken && !loggedProfile.data) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      username,
      getProfile,
      getLoggedProfile:
        loggedProfile.data && loggedProfile.data.getLoggedProfile,
    },
  };
};

export default Profile;
