import React, { useCallback, useRef, useState } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header';
import HomeContainer from '../../styles/pages/home';
import HomeProfile from '../../components/HomeProfile';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import Post from '../../components/Post';
import QuestsProgress from '../../components/QuestsProgress';
import withAuth from '../../hocs/withAuth';
import { GET_POSTS } from '../../graphql/queries/post';
import LoadingPost from '../../components/Post/LoadingPost';
import ErrorRequest from '../../components/ErrorRequest';
import { ILoggedProfile } from '../../interfaces/Profile';
import { GET_LOGGED_PROFILE } from '../../graphql/queries/profile';
import { IGetPosts } from '../../interfaces/Post';

const Home: React.FC = () => {
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef(null);
  const { data, loading, error, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: { offset: 0 },
  });

  const lastPostRef = useCallback(
    node => {
      if (!data.getPosts) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !hasMore) {
          fetchMore({
            variables: { offset: data.getPosts.length },
          }).then(newPosts => {
            if (newPosts.data.getPosts.length < 3) {
              setHasMore(true);
            }
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [data],
  );

  const {
    data: profileData,
    loading: loadingProfile,
    error: errorProfile,
  } = useQuery<ILoggedProfile>(GET_LOGGED_PROFILE);

  if (loadingProfile) return <p>loading</p>;

  if (errorProfile) return <ErrorRequest />;

  const { getLoggedProfile } = profileData;

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <Header />
      <div className="container">
        <div className="home-desktop-content">
          <div className="profile">
            <HomeProfile getLoggedProfile={getLoggedProfile} />
          </div>
          <div className="timeline">
            {loading || error ? (
              <LoadingPost loading={loading} />
            ) : (
              data.getPosts.map((post, index) => {
                if (data.getPosts.length === index + 1) {
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
      <MobileHeader
        loading={loadingProfile}
        getLoggedProfile={getLoggedProfile}
      />
      <MobileFooter />
    </HomeContainer>
  );
};

export default withAuth(Home);
