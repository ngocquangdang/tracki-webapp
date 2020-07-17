import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';

const StyledMenuItem = withStyles(() => ({
  root: {
    color: '#1a1a1a',
  },
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  btnRoot: {
    color: theme.palette.secondary.main,
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12,
  },
  menuRightIcon: {
    fontSize: '2.8em',
    color: '#999',
  },
  menuRightLabel: {
    fontSize: 10.5,
    fontWeight: 300,
    color: '#999',
  },
  menuItemIcon: {
    minWidth: 32,
  },
  menuIcon: {
    fontSize: '1em',
  },
  menuText: {
    '& span': {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 17,
      color: '#666',
    },
  },
}));

export { StyledMenuItem, useStyles };
