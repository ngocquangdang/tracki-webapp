import { makeStyles, withStyles } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    minHeight: '100%',
  },
  content: {},
  textTitle: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 0.67,
    marginLeft: 7,
  },
  listCard: {
    marginTop: 30,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  rowPage: {
    display: 'flex',
  },
  skeletonLoad: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 30,
  },
}));
const PaginationStyle = withStyles(theme => ({
  root: {
    paddingRight: 30,
    color: '#1a1a1a',
    '&:last-child': {
      height: '100%',
      border: 0,
    },
  },
  caption: {
    fontSize: 17,
    fontWeight: 300,
  },
  selectRoot: {
    borderBottom: '1px solid',
  },
  select: {
    padding: 0,
    paddingRight: 35,
  },
  selectIcon: {
    right: '-5px',
    color: '#1a1a1a',
  },
}))(TablePagination);

export { useStyles, PaginationStyle };
