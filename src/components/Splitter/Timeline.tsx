import React from 'react';
import { useQuery } from '@apollo/client';

import TimelineManager from '@components/Timeline/TimelineManager';
import LoadingPost from '../Post/LoadingPost';
import { GET_POSTS } from '../../graphql/queries/post';
import { IGetPosts } from '../../interfaces/Post';
import useInfiniteScroll from '../../hooks/infiniteScroll';

const Timeline: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: { offset: 0 },
  });

  const lastPostRef = useInfiniteScroll(data, async () => {
    if (data.getPosts.length === 6) {
      const newPosts = await fetchMore({
        variables: { offset: data.getPosts.length },
      });
      return newPosts.data.getPosts.length === 6;
    }

    return false;
  });

  return (
    <>
      {loading || error || data.getPosts.length === 0 ? (
        <>
          <LoadingPost loading={loading} />
        </>
      ) : (
        <TimelineManager lastPostRef={lastPostRef} posts={data.getPosts} />
      )}
    </>
  );
};

export default Timeline;
