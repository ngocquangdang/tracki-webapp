import {
  Theme as DefaultTheme,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme: DefaultTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#168449',
      },
      secondary: {
        main: '#999999',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
      text: {
        primary: '#fff',
        secondary: '#999999',
      },
    },
    typography: {
      button: {
        textTransform: 'capitalize',
      },
    },
  })
);

export { theme };
