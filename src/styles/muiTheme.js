import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#black',
    },
    secondary: {
      main: '#D90368',
    },
  },
  typography: {},
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: 'none',
        },
        outlined: {
          textTransform: 'none',
        },
        text: {
          textTransform: 'none',
        },
      },
    },
  },
});
export default theme;
