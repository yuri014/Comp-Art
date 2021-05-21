import React from 'react';
import { DocumentNode, useQuery } from '@apollo/client';

import TimelineManager from '@components/Timeline/TimelineManager';
import LoadingPost from '../Post/LoadingPost';
import useInfiniteScroll from '../../hooks/infiniteScroll';

interface TimelineProps {
  query: DocumentNode;
  queryName: string;
}

const Timeline: React.FC<TimelineProps> = ({ query, queryName }) => {
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: { offset: 0 },
  });

  const lastPostRef = useInfiniteScroll(data, async () => {
    if (data[`${queryName}`].length === 6) {
      const newPosts = await fetchMore({
        variables: { offset: data[`${queryName}`].length },
      });
      return newPosts.data[`${queryName}`].length === 6;
    }

    return false;
  });

  return (
    <>
      {loading || error || data[`${queryName}`].length === 0 ? (
        <>
          <LoadingPost loading={loading} />
        </>
      ) : (
        <TimelineManager
          lastPostRef={lastPostRef}
          posts={data[`${queryName}`]}
        />
      )}
    </>
  );
};

export default Timeline;
