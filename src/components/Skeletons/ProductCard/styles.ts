import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 295,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginBottom: 15,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  row2: {
    margin: '15px 0 30px 10px',
    width: '90%',
  },
  skeletonRow1: {
    width: '100%',
  },
  skeletonRow2: {
    width: '100%',
  },
  skeletonRow3: {
    width: '20%',
    marginTop: 20,
  },
}));

export { useStyles };
