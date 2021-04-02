const toggleTheme = (
  theme: string,
  callback: (_arg0: string) => void,
): void => {
  if (theme === 'light') {
    window.localStorage.setItem('theme', 'dark');
    callback('dark');
  } else {
    window.localStorage.setItem('theme', 'light');
    callback('light');
  }
};

export default toggleTheme;
