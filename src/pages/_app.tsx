import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import { MuiThemeProvider } from '@material-ui/core';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import GlobalStyle from '@styles/global';
import theme from '@styles/themes/theme';
import { AuthProvider } from '@context/auth';
import { useApollo } from '@graphql/apollo/config';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import { NewNotificationsProvider } from '@context/notification';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  const [isDarkMode, setDarkMode] = useState(
    typeof window !== 'undefined' &&
      window.document.documentElement.style.getPropertyValue(
        '--initial-color-mode',
      ) === 'dark',
  );

  const toggleTheme = () => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'light' : 'dark',
    );
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');

    setDarkMode(!isDarkMode);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <NewNotificationsProvider>
            <ThemeContext.Provider
              value={{
                isDarkMode,
                toggleTheme,
              }}
            >
              <ThemeProvider theme={theme}>
                <MuiThemeProvider
                  theme={isDarkMode ? mainDarkTheme : mainLightTheme}
                >
                  <GlobalStyle />
                  <Component {...pageProps} />
                </MuiThemeProvider>
              </ThemeProvider>
            </ThemeContext.Provider>
          </NewNotificationsProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
