import React from 'react';
import { useQuery } from '@apollo/client';

import Share from '@components/Share';
import ArtistPost from '@components/Post/ArtistPost';
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
      }).then(newPosts => newPosts.data.getPosts.length === 6),
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
          if (postsLenght === index + 1 && postsLenght) {
            if (post.artist) {
              return (
                <div key={post._id} ref={lastPostRef}>
                  <Post post={post}>
                    <ArtistPost post={post} />
                  </Post>
                </div>
              );
            }

            return (
              <div key={`${post._id}`} ref={lastPostRef}>
                <Post post={post}>
                  <Share post={post} />
                </Post>
              </div>
            );
          }
          if (post.artist) {
            return (
              <div key={post._id}>
                <Post post={post}>
                  <ArtistPost post={post} />
                </Post>
              </div>
            );
          }

          return (
            <div key={post._id}>
              <Post post={post}>
                <Share post={post} />
              </Post>
            </div>
          );
        })
      )}
    </>
  );
};

export default Timeline;
