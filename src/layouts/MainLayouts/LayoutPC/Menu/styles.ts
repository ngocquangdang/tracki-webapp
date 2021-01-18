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
    fontSize: 30,
    color: '#999',
  },
  menuRightLabel: {
    fontSize: 13,
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
  coin: {
    color: '#e9a213',
  },
  wallet: {
    padding: '0 15px',
    color: theme.palette.primary.main,
  },
  cointNumber: {
    borderRight: '1px solid #e0e0e0',
    paddingRight: '10px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  myWallet: {
    color: '#1a1a1a',
    fontSize: 14,
    cursor: 'pointer',
  },
  icon: {
    marginRight: 5,
  },
}));

export { StyledMenuItem, useStyles };
