import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from '../styles/global';
import theme from '../styles/themes/dark';
import { AuthProvider } from '../context/auth';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache(),
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
