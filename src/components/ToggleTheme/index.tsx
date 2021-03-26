import React, { useContext, useEffect } from 'react';
import ThemeContext from '../../context/theme';

const ToggleThemeButton: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    setTheme(window.localStorage.getItem('theme'));
  }, [setTheme]);

  return (
    <button type="button" onClick={toggleTheme}>
      Toggle
    </button>
  );
};

export default ToggleThemeButton;
