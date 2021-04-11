import { createMuiTheme } from '@material-ui/core/styles';

const mainDarkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1cc5b7',
    },
    secondary: {
      main: '#ababab',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Jura"'].join(','),
    fontSize: 22,
  },
  overrides: {
    MuiCard: {
      root: {
        background: '#08162f',
      },
    },
    MuiMenu: {
      paper: {
        background: '#38383C',
      },
    },
    MuiMenuItem: {
      root: {
        padding: '0',
      },
    },
    MuiIconButton: {
      root: {
        padding: '0',
      },
    },
    MuiButton: {
      root: {
        padding: '0',
      },
    },
  },
});

export default mainDarkTheme;
