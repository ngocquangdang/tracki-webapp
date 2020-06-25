import {
  Theme as DefaultTheme,
  createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';

const theme: DefaultTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
}));

export {
  theme
};
