import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px 0',
  },
  border: {
    borderBottom: '1px solid #e0e0e0',
  },
  itemStyle: {
    padding: '18px 0',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  colorActive: {
    color: theme.palette.primary.main,
  },
}));

export { useStyles };
