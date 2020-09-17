import { makeStyles, withStyles } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    minHeight: '100%',
  },
  sideBar: {
    width: '400px',
    maxWidth: '400px',
    boxShadow: '1px 0 0 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
  },
  iconTitle: {
    color: '#168449',
    fontSize: 24,
  },
  iconList: {
    color: '#168449',
    fontSize: 40,
  },
  content: {
    padding: '25px 15px 25px 0',
    width: 'calc(100% - 400px)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
  },
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
