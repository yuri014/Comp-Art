import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import GlobalStyle from '@styles/global';
import dark from '@styles/themes/dark';
import light from '@styles/themes/light';
import { AuthProvider } from '@context/auth';
import { useApollo } from '@graphql/apollo/config';
import ThemeContext from '@context/theme';
import useDarkMode from 'use-dark-mode';
import { MuiThemeProvider } from '@material-ui/core';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isMounted, setIsMounted] = useState(false);
  const darkmode = useDarkMode(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  const newTheme = darkmode.value ? dark : light;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ThemeContext.Provider
            value={{ isDarkMode: darkmode.value, toggleTheme: darkmode.toggle }}
          >
            <ThemeProvider theme={newTheme}>
              <MuiThemeProvider
                theme={darkmode.value ? mainDarkTheme : mainLightTheme}
              >
                {isMounted && <Component {...pageProps} />}
                <GlobalStyle />
              </MuiThemeProvider>
            </ThemeProvider>
          </ThemeContext.Provider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
