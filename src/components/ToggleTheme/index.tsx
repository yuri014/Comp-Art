import React, { useContext, useEffect } from 'react';

import ThemeContext from '../../context/theme';
import LightIcon from '../../assets/light-toggle.svg';
import DarkIcon from '../../assets/dark-toggle.svg';
import ToggleThemeContainer from './_styles';
import toggleTheme from '../../utils/toggleTheme';

const ToggleThemeButton: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme(window.localStorage.getItem('theme'));
  }, [setTheme]);

  return (
    <ToggleThemeContainer>
      <button
        aria-label={`mudar para tema ${theme === 'light' ? 'claro' : 'escuro'}`}
        onClick={() => toggleTheme(theme, setTheme)}
        type="button"
      >
        {theme === 'light' ? <LightIcon /> : <DarkIcon />}
      </button>
    </ToggleThemeContainer>
  );
};

export default ToggleThemeButton;
