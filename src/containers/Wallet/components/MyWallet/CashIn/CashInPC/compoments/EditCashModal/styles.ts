import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    padding: '20px 0',
  },
  inputNumber: {
    width: '100%',
    '& input': {
      color: '#1a1a1a',
    },
  },
}));

export { useStyles };
