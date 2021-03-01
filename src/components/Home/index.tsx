import React from 'react';
import { useQuery } from '@apollo/client';

import HomeProfile from '../HomeProfile';
import Post from '../Post';
import LoadingPost from '../Post/LoadingPost';
import QuestsProgress from '../QuestsProgress';
import { IGetPosts } from '../../interfaces/Post';
import { GET_POSTS } from '../../graphql/queries/post';
import { IProfile } from '../../interfaces/Profile';
import useInfiniteScroll from '../../hooks/infiniteScroll';

interface HomeProps {
  getLoggedProfile: IProfile;
}

const Home: React.FC<HomeProps> = ({ getLoggedProfile }) => {
  const { data, loading, error, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: { offset: 0 },
  });

  const lastPostRef = useInfiniteScroll(
    data,
    () =>
      !!data.getPosts &&
      fetchMore({
        variables: { offset: data.getPosts.length },
      }).then(newPosts => newPosts.data.getPosts.length < 3),
  );

  return (
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
  );
};

export default React.memo(Home);
