import { useQuery } from '@apollo/client';
import React from 'react';

import Post from '../Post';
import LoadingPost from '../Post/LoadingPost';
import { GET_POSTS } from '../../graphql/queries/post';
import { IGetPosts } from '../../interfaces/Post';
import useInfiniteScroll from '../../hooks/infiniteScroll';

const Timeline: React.FC = () => {
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
    <>
      {loading || error || data.getPosts.length === 0 ? (
        <LoadingPost loading={loading} />
      ) : (
        data.getPosts.map((post, index) => {
          if (data.getPosts.length === index + 1 && data.getPosts.length > 1) {
            return (
              <div key={`${post.artist}_${post.createdAt}`} ref={lastPostRef}>
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
    </>
  );
};

export default Timeline;
