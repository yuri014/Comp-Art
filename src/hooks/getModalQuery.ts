import { QueryLazyOptions, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

import { IProfile } from '../interfaces/Profile';
import useInfiniteScroll, { UseInfiniteScroll } from './infiniteScroll';
import { GET_LIKES } from '../graphql/mutations/post';

interface IGetProfileLikes {
  getLikes: Array<IProfile>;
}

type IUseGetProfileLikes = [
  boolean,
  (options?: QueryLazyOptions<Record<string, unknown>>) => void,
  UseInfiniteScroll,
  IGetProfileLikes,
];

const useGetProfileLikes = (id: string): IUseGetProfileLikes => {
  const [isLoading, setIsLoading] = useState(true);

  const [
    getProfilesLikes,
    { data, client, fetchMore },
  ] = useLazyQuery<IGetProfileLikes>(GET_LIKES, {
    variables: { id, offset: 0 },
    onCompleted: () => {
      setIsLoading(false);
    },
  });

  const lastPostRefLikes = useInfiniteScroll(
    data,
    () =>
      !!data.getLikes &&
      fetchMore({
        variables: { offset: data.getLikes.length },
      }).then(newProfiles => {
        if (newProfiles.data.getLikes.length < 3) {
          client.cache.evict({ fieldName: 'getLikes' });
        }

        return newProfiles.data.getLikes.length < 3;
      }),
  );

  return [isLoading, getProfilesLikes, lastPostRefLikes, data];
};

export default useGetProfileLikes;
