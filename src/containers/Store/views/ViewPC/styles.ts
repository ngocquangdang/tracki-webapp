import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '100%',
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
}));

export { useStyles };
