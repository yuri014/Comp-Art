import React from 'react';
import dynamic from 'next/dynamic';
import { DocumentNode, useQuery } from '@apollo/client';

import LoadingPost from '../Post/LoadingPost';
import useInfiniteScroll from '../../hooks/infiniteScroll';

const TimelineManager = dynamic(
  () => import('@components/Timeline/TimelineManager'),
  { loading: () => <LoadingPost loading /> },
);

interface TimelineProps {
  query: DocumentNode;
  queryName: string;
  otherVariables?: { [key: string]: string };
}

const Timeline: React.FC<TimelineProps> = ({
  query,
  queryName,
  otherVariables,
}) => {
  const { client, data, loading, error, fetchMore } = useQuery(query, {
    variables: { offset: 0, ...otherVariables },
    onCompleted: () => {
      if (data.getProfilePosts && data.getProfilePosts.length === 0) {
        client.cache.evict({ fieldName: 'getProfilePosts' });
      }
    },
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
        <LoadingPost loading={loading} />
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
