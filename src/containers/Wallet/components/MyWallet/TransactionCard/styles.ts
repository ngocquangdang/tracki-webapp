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
  },
  sender: {
    fontSize: 14,
    color: theme.palette.secondary.main,
  },
  status: {},
  pending: {
    fontSize: 14,
    color: '#e99313',
  },
  cashIn: {
    color: theme.palette.primary.main,
    fontSize: 16,
    fontWeight: 500,
  },
  cashOut: {
    color: '#cc2c2c',
    fontSize: 16,
    fontWeight: 500,
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
}))(ListItem);

export { useStyles, ListItemStyle };
