import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    '& ul': {
      paddingTop: 0,
      '& li:before': {
        flex: 0,
        padding: 0,
      },
    },
  },
}));

export default useStyles;
