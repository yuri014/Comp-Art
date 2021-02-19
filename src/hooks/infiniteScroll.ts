import { ApolloQueryResult } from '@apollo/client';
import { useCallback, useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
type UseInfiniteScroll = (args: unknown) => void;

const useInfiniteScroll = (
  data: unknown,
  condition: boolean,
  callback: () => Promise<boolean | ApolloQueryResult<unknown>>,
): UseInfiniteScroll => {
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef(null);

  const lastPostRef = useCallback(
    node => {
      if (condition) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async entries => {
        if (entries[0].isIntersecting && !hasMore) {
          const lenght = await callback();
          setHasMore(lenght as boolean);
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return lastPostRef;
};

export default useInfiniteScroll;
