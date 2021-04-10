import { createMuiTheme } from '@material-ui/core/styles';

const formTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1cc5b7',
    },
    secondary: {
      main: '#f50057',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Jura"'].join(','),
    fontSize: 22,
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&::placeholder': {
          color: '#cbcaeb',
        },
        color: '#cbcaeb',
      },
      notchedOutline: {
        borderColor: 'grey',
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
    MuiFormHelperText: {
      root: {
        color: '#cbcaeb',
      },
    },
    MuiLinearProgress: {
      root: {
        '&.MuiLinearProgress-colorPrimary': {
          background: '#cbcaeb',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#ED4848',
        color: '#FFFFFF',
        borderRadius: 5,
        fontWeight: 'bold',
      },
    },
  },
});

export default formTheme;
