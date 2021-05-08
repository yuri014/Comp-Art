import React from 'react';
import { useQuery } from '@apollo/client';

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
      }).then(newPosts => newPosts.data.getPosts.length < 6),
  );

  return (
    <>
      {loading || error || data.getPosts.length === 0 ? (
        <>
          <LoadingPost loading={loading} />
        </>
      ) : (
        data.getPosts.map((post, index) => {
          const postsLenght = data.getPosts.length;
          if (postsLenght === index + 1 && postsLenght >= 6) {
            if (post.artist) {
              return (
                <div key={post._id} ref={lastPostRef}>
                  <Post post={post} />
                </div>
              );
            }

            return (
              <p key={`${post._id}`} ref={lastPostRef}>
                shares
              </p>
            );
          }
          if (post.artist) {
            return (
              <div key={post._id}>
                <Post post={post} />
              </div>
            );
          }

          return <p key={post._id}>shares</p>;
        })
      )}
    </>
  );
};

export default Timeline;
