import React from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { IconButton, NoSsr } from '@material-ui/core';

import { IThemeContext } from '@context/theme';
import NonAuthAltHeaderContainer from './styles';

const NonAuthAltHeader: React.FC<IThemeContext> = ({
  isDarkMode,
  toggleTheme,
}) => {
  const router = useRouter();

  return (
    <NoSsr>
      <NonAuthAltHeaderContainer>
        <nav>
          <IconButton
            onClick={() => router.back()}
            aria-label="Voltar"
            color="secondary"
          >
            <FaArrowLeft />
          </IconButton>
          <IconButton
            color="secondary"
            type="button"
            aria-label={`Mudar para modo ${!isDarkMode ? 'Escuro' : 'Claro'}`}
            onClick={() => toggleTheme()}
          >
            {!isDarkMode ? <FaMoon /> : <FaSun />}
          </IconButton>
        </nav>
      </NonAuthAltHeaderContainer>
    </NoSsr>
  );
};

export default NonAuthAltHeader;
