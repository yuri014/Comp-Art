import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import GlobalStyle from '../styles/global';
import theme from '../styles/themes/dark';
import { AuthProvider } from '../context/auth';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_HOST}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: (authLink.concat(httpLink) as unknown) as ApolloLink,
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
);

export default MyApp;
