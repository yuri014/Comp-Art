import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Snackbar, IconButton, ThemeProvider } from '@material-ui/core';

import { ISnackbar } from '@interfaces/Generics';
import formTheme from '@styles/themes/FormTheme';

interface CASnackbarProps {
  snackbarState?: ISnackbar;
  clearSnackbar: () => void;
}

const CASnackbar: React.FC<CASnackbarProps> = ({
  clearSnackbar,
  snackbarState,
}) => (
  <ThemeProvider theme={formTheme}>
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!snackbarState.message}
      autoHideDuration={6000}
      onClose={clearSnackbar}
      message={snackbarState.message}
      className="success"
      ContentProps={{
        style: {
          background:
            snackbarState.variant === 'success' ? '#077E76' : '#ED4848',
        },
      }}
      action={
        <IconButton
          size="small"
          aria-label="fechar menu"
          onClick={clearSnackbar}
        >
          <FaTimes />
        </IconButton>
      }
    />
  </ThemeProvider>
);

export default CASnackbar;
