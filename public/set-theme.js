var setInitialTheme = function setInitialTheme() {
  var getInitialTheme = function getInitialTheme() {
    var persistedColorPreference = window.localStorage.getItem('theme');
    var hasPersistedPreference = typeof persistedColorPreference === 'string';
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'dark';
  };
  var colorMode = getInitialTheme();
  var root = document.documentElement;
  root.style.setProperty('--initial-color-mode', colorMode);
  document.documentElement.setAttribute('data-theme', colorMode);
};
setInitialTheme();