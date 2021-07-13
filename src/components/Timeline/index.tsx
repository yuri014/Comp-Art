import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DocumentNode, useQuery } from '@apollo/client';

import { Timeline as ITimeline } from '@interfaces/Post';
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

interface TimelineQueryResponse extends ITimeline {
  __typename: 'Share' | 'Post';
}

interface GenericTimeline {
  [key: string]: TimelineQueryResponse[];
}

const Timeline: React.FC<TimelineProps> = ({
  query,
  queryName,
  otherVariables,
}) => {
  const { client, data, loading, error, fetchMore } = useQuery<GenericTimeline>(
    query,
    {
      variables: {
        offset: queryName !== 'getExplorePosts' ? [0, 0] : 0,
        ...otherVariables,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const dataLength = () => {
    if (queryName !== 'getExplorePosts') {
      const postLength = data[`${queryName}`].filter(
        item => item.__typename === 'Post',
      ).length;

      const shareLength = data[`${queryName}`].length - postLength;

      return [postLength || 0, shareLength || 0];
    }
    return data[`${queryName}`].length;
  };

  const lastPostRef = useInfiniteScroll(data, async () => {
    const newPosts = await fetchMore({
      variables: { ...otherVariables, offset: dataLength() },
    });
    return newPosts.data[`${queryName}`].length >= 3;
  });

  useEffect(
    () => () => {
      client.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: queryName,
        broadcast: false,
      });
      client.cache.gc();
    },
    [client.cache, queryName],
  );

  return (
    <>
      {loading || error || data[`${queryName}`].length === 0 ? (
        <>
          {console.log(data)}
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

export default React.memo(Timeline);
