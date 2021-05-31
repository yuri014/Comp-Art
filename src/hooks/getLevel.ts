import { useEffect } from 'react';
import {
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
} from '@apollo/client';

import { GET_LEVEL_XP } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';

type UseGetLevel = {
  getLevel: (options?: QueryLazyOptions<OperationVariables>) => void;
  profileLevel: ILoggedProfile;
};

const useGetLevel = (): UseGetLevel => {
  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return { getLevel, profileLevel };
};

export default useGetLevel;
