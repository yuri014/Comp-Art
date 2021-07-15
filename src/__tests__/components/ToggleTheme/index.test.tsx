import React from 'react';
import { cleanup, screen } from '@testing-library/react';

import ToggleThemeButton from '@components/ToggleTheme';
import ThemeContext from '@context/theme';
import customRender from 'helpers/contextRender';

afterEach(cleanup);

describe('Should toggle themes', () => {
  const startRender = (providerProps: { value: { [key: string]: unknown } }) =>
    customRender(ThemeContext, <ToggleThemeButton />, providerProps);

  const createProviderProps = ({ isDarkMode }: { isDarkMode: boolean }) => ({
    value: {
      isDarkMode,
      toggleTheme: () => {
        throw new Error();
      },
    },
  });

  test('When dark theme, should render light icon', () => {
    const providerProps = createProviderProps({ isDarkMode: true });
    startRender(providerProps);

    expect(screen.getByTestId('toggle-button')).toContainElement(
      screen.getByTestId('light-icon'),
    );
    expect(screen.queryByTestId('dark-icon')).not.toBeInTheDocument();
  });

  test('When light theme, should render dark icon', () => {
    const providerProps = createProviderProps({ isDarkMode: false });

    startRender(providerProps);

    expect(screen.getByTestId('toggle-button')).toContainElement(
      screen.getByTestId('dark-icon'),
    );
    expect(screen.queryByTestId('light-icon')).not.toBeInTheDocument();
  });
});
