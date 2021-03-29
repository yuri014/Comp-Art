import React, { useContext, useEffect } from 'react';
import { IconButton } from '@material-ui/core';

import ThemeContext from '../../context/theme';
import LightIcon from '../../assets/light-toggle.svg';
import DarkIcon from '../../assets/dark-toggle.svg';
import ToggleThemeContainer from './_styles';

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
    <IconButton
      aria-label={`mudar para tema ${theme === 'light' ? 'claro' : 'escuro'}`}
      onClick={toggleTheme}
    >
      <ToggleThemeContainer>
        {theme === 'light' ? <LightIcon /> : <DarkIcon />}
      </ToggleThemeContainer>
    </IconButton>
  );
};

export default ToggleThemeButton;
