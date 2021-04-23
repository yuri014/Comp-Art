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

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_HOST}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('jwtToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_HOST,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: (authLink.concat(httpLink as never) as unknown) as ApolloLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            },
            getProfilePosts: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            },
            getComments: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            },
            getLikes: {
              keyArgs: false,
              merge(existing, incoming, { args: { offset = 0 } }) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

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
