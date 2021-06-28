import { ApolloQueryResult } from '@apollo/client';
import { useCallback, useRef, useState } from 'react';

export type UseInfiniteScroll = (args: unknown) => void;

/**
 * Cria um observer e executa um callback assim que o observer for disparado.
 * @param data dados iniciais.
 * @param callback função para ser disparada assim que infinite scroll for chamado.
 * @returns um Ref para colocar onde o hook deve ser disparado.
 */
const useInfiniteScroll = (
  data: unknown,
  callback: () => Promise<boolean | ApolloQueryResult<unknown>>,
): UseInfiniteScroll => {
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  const lastPostRef = useCallback(
    node => {
      if (!data) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async entries => {
        if (entries[0].isIntersecting && hasMore) {
          const length = await callback();
          setHasMore(length as boolean);
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback, data, hasMore],
  );

  return lastPostRef;
};

export default useInfiniteScroll;
