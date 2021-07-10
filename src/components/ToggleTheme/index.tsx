import React, { useContext } from 'react';

import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import ThemeContext from '../../context/theme';
import LightIcon from '../../assets/light-toggle.svg';
import DarkIcon from '../../assets/dark-toggle.svg';
import ToggleThemeContainer from './_styles';

const ToggleThemeButton: React.FC = () => {
  const isMount = usePreventMemoryLeak();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleThemeContainer>
      {isMount && (
        <button
          aria-label={`mudar para tema ${!isDarkMode ? 'claro' : 'escuro'}`}
          onClick={() => toggleTheme()}
          type="button"
        >
          {isDarkMode ? <DarkIcon /> : <LightIcon />}
        </button>
      )}
    </ToggleThemeContainer>
  );
};

export default ToggleThemeButton;
