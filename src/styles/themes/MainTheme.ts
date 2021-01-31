import { createMuiTheme } from '@material-ui/core/styles';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1cc5b7',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Jura"'].join(','),
    fontSize: 22,
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#0f0f28',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&.MuiBottomNavigationAction-iconOnly': {
          color: '#393B73',
        },
      },
    },
  },
});

export default mainTheme;
