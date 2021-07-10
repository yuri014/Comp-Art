import { useEffect, useState } from 'react';
import { IThemeContext } from '@context/theme';

const useTheme = (): IThemeContext => {
  const [isDarkMode, setDarkTheme] = useState(true);

  useEffect(() => {
    setDarkTheme(window.localStorage.getItem('theme') === 'dark');
  }, []);
  const toggleTheme = (): void => {
    if (isDarkMode) {
      window.localStorage.setItem('theme', 'light');
      setDarkTheme(false);
    } else {
      window.localStorage.setItem('theme', 'dark');

      setDarkTheme(true);
    }
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
