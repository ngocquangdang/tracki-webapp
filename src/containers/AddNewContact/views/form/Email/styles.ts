import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export { useStyles };
