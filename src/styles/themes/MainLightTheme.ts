import { createMuiTheme } from '@material-ui/core/styles';

const mainLightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1cc5b7',
    },
    secondary: {
      main: '#787878',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Exo 2"'].join(','),
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
        background: '#f5f5f5',
      },
    },
    MuiMenuItem: {
      root: {
        padding: '0',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#eee',
        borderTop: '1px solid #adadad',
      },
    },
  },
});

export default mainLightTheme;
