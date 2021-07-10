const setInitialTheme = () => {
  const getInitialTheme = () => {
    const persistedColorPreference = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }

    return 'dark';
  };

  const colorMode = getInitialTheme();
  const root = document.documentElement;
  root.style.setProperty('--initial-color-mode', colorMode);

  document.documentElement.setAttribute('data-theme', colorMode);
};

setInitialTheme();
