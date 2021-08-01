import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import ToggleThemeButton from '@components/ToggleTheme';
import ThemeContext, { IThemeContext } from '@context/theme';

afterEach(cleanup);

describe('Should toggle themes', () => {
  const startRender = (providerProps: IThemeContext) =>
    render(
      <ThemeContext.Provider value={providerProps}>
        <ToggleThemeButton />
      </ThemeContext.Provider>,
    );

  const createProviderProps = ({ isDarkMode }: { isDarkMode: boolean }) => ({
    isDarkMode,
    toggleTheme: () => {
      throw new Error();
    },
  });

  it('When dark theme, should render light icon', () => {
    const providerProps = createProviderProps({ isDarkMode: true });
    startRender(providerProps);

    expect(screen.getByTestId('toggle-button')).toContainElement(
      screen.getByTestId('light-icon'),
    );
    expect(screen.queryByTestId('dark-icon')).not.toBeInTheDocument();
  });

  it('When light theme, should render dark icon', () => {
    const providerProps = createProviderProps({ isDarkMode: false });

    startRender(providerProps);

    expect(screen.getByTestId('toggle-button')).toContainElement(
      screen.getByTestId('dark-icon'),
    );
    expect(screen.queryByTestId('light-icon')).not.toBeInTheDocument();
  });
});
