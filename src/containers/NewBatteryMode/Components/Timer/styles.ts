import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 14,
  },
  notifyHeader: {},
  notifyTitle: {},
  notifySubTitle: {},
  notifySubTitleContent: {
    fontSize: 15,
    fontWeight: 300,
  },
  notifications: {
    padding: 15,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
  },
}));

export { useStyles };
