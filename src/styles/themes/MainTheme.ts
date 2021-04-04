import { createMuiTheme } from '@material-ui/core/styles';

const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1cc5b7',
    },
    secondary: {
      main: '#cbcaeb',
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
    MuiCard: {
      root: {
        background: '#08162f',
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 30,
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
    MuiTextField: {
      root: {
        marginBottom: 20,
        color: '#cbcaeb',
        '&.Mui-disabled': {
          color: '#cbcaeb',
        },
      },
    },
    MuiInput: {
      input: {
        '&::placeholder': {
          color: '#cbcaeb',
        },
        color: '#cbcaeb',
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid grey',
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: '#cbcaeb',
      },
    },
  },
});

export default mainTheme;
