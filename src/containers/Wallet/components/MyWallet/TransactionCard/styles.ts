import { ListItem, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1a1a1a',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  sender: {
    fontSize: 14,
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  status: {
    color: theme.palette.secondary.main,
  },
  pending: {
    fontSize: 14,
    color: '#e99313',
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  cashIn: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  cashOut: {
    color: '#cc2c2c',
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  mr0: {
    margin: 0,
  },
  mb5: {
    marginBottom: 5,
  },
  textEnd: {
    textAlign: 'end',
  },
}));

const ListItemStyle = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #e0e0e0',
    justifyContent: 'space-between',
    alignItem: 'center',
    overFlow: 'hidden',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}))(ListItem) as any;

export { useStyles, ListItemStyle };
