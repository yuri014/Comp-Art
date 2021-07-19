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
        background: '#38383C',
      },
    },
    MuiMenuItem: {
      root: {
        padding: '0',
      },
    },

    MuiButton: {
      root: {
        padding: '0',
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#111112',
        borderTop: '1px solid #38383C',
        height: '48px',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '12px',
      },
    },
  },
});

export default mainDarkTheme;
