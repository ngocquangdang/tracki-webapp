import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  skeleton: {
    border: '1px solid #e3e3e3',
    borderRadius: 4,
  },
  skeleton1: {
    borderBottom: '1px solid #e6e6e6',
    backgroundColor: '#f2f2f2',
  },
  skeleton2: {
    backgroundColor: '#f2f2f2',
  },
}));

export { useStyles };
