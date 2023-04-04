import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f0430',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#0f0430',
    },
    background: {
      default: "#0f0430"
    },
  },
});
