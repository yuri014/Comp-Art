import React, { useCallback, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';

import HomeProfile from '../HomeProfile';
import Post from '../Post';
import LoadingPost from '../Post/LoadingPost';
import QuestsProgress from '../QuestsProgress';
import { IGetPosts } from '../../interfaces/Post';
import { GET_POSTS } from '../../graphql/queries/post';
import { IProfile } from '../../interfaces/Profile';

interface HomeProps {
  getLoggedProfile: IProfile;
}

const Home: React.FC<HomeProps> = ({ getLoggedProfile }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
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
