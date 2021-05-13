/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import Cookie from 'js-cookie';
import mergeCache from './mergeCache';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_HOST}/graphql`,
  credentials: 'same-origin',
});

const authLink = (cookie?: string) =>
  setContext((_, { headers }) => {
    const token = cookie || Cookie.get('jwtToken');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_HOST,
      },
    };
  });

function createApolloClient(cookie?: string) {
  return new ApolloClient({
    ssrMode: true,
    link: (authLink(cookie).concat(httpLink as never) as unknown) as ApolloLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getProfilePosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getComments: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getLikes: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null, cookie?: string) {
  const _apolloClient = apolloClient ?? createApolloClient(cookie);

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
