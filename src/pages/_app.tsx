import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import GlobalStyle from '../styles/global';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
import { AuthProvider } from '../context/auth';
import { useApollo } from '../graphql/apollo/config';
import ThemeContext from '../context/theme';
import useTheme from '../hooks/theme';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const MainComponent = React.memo(() => <Component {...pageProps} />);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(window.localStorage.getItem('theme'));
  }, [setTheme]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={theme === 'light' ? light : dark}>
              <MainComponent />
              <GlobalStyle />
            </ThemeProvider>
          </ThemeContext.Provider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
