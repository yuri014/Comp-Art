import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

import { initializeApollo } from '@graphql/apollo/config';
import theme from '@styles/themes/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@context/auth';
import ThemeContext from '@context/theme';

const createAppRender = (
  children: React.ReactChild,
): RenderResult<
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement
> => {
  const apolloClient = initializeApollo();

  const isDarkMode = true;

  const toggleTheme = () => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'light' : 'dark',
    );
  };

  return render(
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ThemeContext.Provider
          value={{
            isDarkMode,
            toggleTheme,
          }}
        >
          <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={mainDarkTheme}>
              {children}
            </MuiThemeProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </AuthProvider>
    </ApolloProvider>,
  );
};

export default createAppRender;
