/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import Cookie from 'js-cookie';

import mergeCache, { mergeArrayCache } from './mergeCache';

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

const authHttpLink = (cookie: string) =>
  (authLink(cookie).concat(httpLink as never) as unknown) as ApolloLink;

const wsLink = () => {
  if (process.browser) {
    return new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_WS_HOST,
      options: {
        reconnect: true,
      },
    });
  }

  return null;
};

const splitLink = (cookie: string) => {
  if (process.browser) {
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink(),
      authHttpLink(cookie),
    );
  }
  return authHttpLink(cookie);
};

function createApolloClient(cookie?: string) {
  return new ApolloClient({
    ssrMode: true,
    link: splitLink(cookie),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            getExplorePosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getProfilePosts: {
              keyArgs: ['username'],
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getProfilePostsAndShares: {
              keyArgs: ['username'],
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            getSavedPosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            searchPost: {
              keyArgs: ['query'],
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            getComments: {
              keyArgs: ['postID'],
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getLikes: {
              keyArgs: ['postID'],
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getFollowing: {
              keyArgs: ['username'],
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            getFollowers: {
              keyArgs: ['username'],
              merge(existing, incoming, { args: { offset = [0, 0] } }) {
                return mergeArrayCache(existing, incoming, offset);
              },
            },
            getWhoSharesPost: {
              keyArgs: ['postID'],
              merge(existing, incoming, { args: { offset = 0 } }) {
                return mergeCache(existing, incoming, offset);
              },
            },
            getNotifications: {
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
