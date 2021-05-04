import React, { useContext, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import Head from 'next/head';

import HomeProfile from '@components/HomeProfile';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Post from '@components/Post';
import LoadingPost from '@components/Post/LoadingPost';
import QuestsProgress from '@components/QuestsProgress';
import { AuthContext } from '@context/auth';
import LevelContext from '@context/level';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { GET_LOGGED_PROFILE, GET_LEVEL_XP } from '@graphql/queries/profile';
import useInfiniteScroll from '@hooks/infiniteScroll';
import { Timeline } from '@interfaces/Post';
import HomeContainer from '../home/_styles';

interface IExplorePosts {
  getExplorePosts: Array<Timeline>;
}

const Explore: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error, fetchMore } = useQuery<IExplorePosts>(
    GET_EXPLORE_POSTS,
    {
      variables: { offset: 0 },
    },
  );

  const lastPostRef = useInfiniteScroll(
    data,
    () =>
      !!data.getExplorePosts &&
      fetchMore({
        variables: { offset: data.getExplorePosts.length },
      }).then(newPosts => newPosts.data.getExplorePosts.length < 3),
  );

  const [
    getProfile,
    { data: profileData, loading: loadingProfile },
  ] = useLazyQuery(GET_LOGGED_PROFILE);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [getProfile, user]);

  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <div className="container">
        <div className="home-desktop-content">
          <div className="profile">
            {profileData && (
              <LevelContext.Provider
                value={{ updateLevel: getLevel, level: profileLevel }}
              >
                <HomeProfile getLoggedProfile={profileData.getLoggedProfile} />
              </LevelContext.Provider>
            )}
          </div>
          <div className="timeline">
            {loading || error ? (
              <LoadingPost loading={loading} />
            ) : (
              data.getExplorePosts.map((post, index) => {
                if (data.getExplorePosts.length === index + 1) {
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
          </div>
          <div className="quests">
            <QuestsProgress />
          </div>
        </div>
      </div>
      {profileData && (
        <MobileHeader
          loading={loadingProfile}
          getLoggedProfile={profileData.getLoggedProfile}
        />
      )}
      <MobileFooter />
    </HomeContainer>
  );
};

export default Explore;
