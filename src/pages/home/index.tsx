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
import { IPost } from '../../interfaces/Post';
import LoadingPost from '../../components/Post/LoadingPost';

interface IGetPosts {
  getPosts: Array<IPost>;
}

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
          }).then(bah => {
            if (bah.data.getPosts.length < 3) {
              setHasMore(true);
            }
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [data],
  );

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <Header />
      <div className="home-desktop-content">
        <div className="profile">
          <HomeProfile />
        </div>
        <div className="timeline">
          {loading || error ? (
            <LoadingPost loading={loading} />
          ) : (
            data.getPosts.map((post, index) => {
              if (data.getPosts.length === index + 1) {
                return (
                  <div ref={lastPostRef}>
                    <Post post={post} />
                  </div>
                );
              }
              return (
                <div>
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
      <MobileHeader />
      <MobileFooter />
    </HomeContainer>
  );
};

export default withAuth(Home);
