import { ListItem, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  textEnd: {
    textAlign: 'end',
  },
  ma: {
    marginLeft: 'auto',
  },
}));

const ListItemStyle = withStyles(theme => ({
  root: {
    borderTop: '1px solid #e0e0e0',
    // borderBottom: '1px solid #e0e0e0',
    justifyContent: 'space-between',
    alignItem: 'center',
    overFlow: 'hidden',
    '&:last-child': {
      borderTop: 'none',
    },
  },
}))(ListItem);

export { useStyles, ListItemStyle };
