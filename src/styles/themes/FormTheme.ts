import { createMuiTheme } from '@material-ui/core/styles';

const formTheme = createMuiTheme({
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
    MuiTextField: {
      root: {
        marginBottom: '1rem',
        '@media (min-width: 1100px)': {
          marginBottom: '2rem',
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

export default formTheme;
