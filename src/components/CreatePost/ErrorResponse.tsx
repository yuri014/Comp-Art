import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import formTheme from '@styles/themes/FormTheme';

interface SendErrorProps {
  showError: string;
  setShowError: React.Dispatch<React.SetStateAction<string>>;
}

const SendError: React.FC<SendErrorProps> = ({ setShowError, showError }) => (
  <ThemeProvider theme={formTheme}>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={!!showError}
      autoHideDuration={5000}
      onClose={() => setShowError('')}
      message={showError}
      action={
        <IconButton
          size="small"
          aria-label="fechar menu erro"
          onClick={() => setShowError('')}
        >
          <FaTimes />
        </IconButton>
      }
    />
  </ThemeProvider>
);

export default SendError;
