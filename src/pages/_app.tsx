import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import GlobalStyle from '../styles/global';
import theme from '../styles/themes/dark';
import { AuthProvider } from '../context/auth';
import { useApollo } from '../graphql/apollo/config';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const MainComponent = React.memo(() => <Component {...pageProps} />);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <MainComponent />
            <GlobalStyle />
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
