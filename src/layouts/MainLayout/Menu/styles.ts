import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';


const StyledMenuItem = withStyles(() => ({
  root: {
    color: '#1a1a1a',
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    color: theme.palette.secondary.main,
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12
  },
  menuItemIcon: {
    minWidth: 32,
  },
  menuIcon: {
    fontSize: '1em',
  },
  menuText: {
    '& span': {
      fontSize: '0.8rem',
      fontWeight: 300,
    }
  }
}));

export {
  StyledMenuItem,
  useStyles,
};