import { makeStyles, withStyles } from '@material-ui/core';
import { Drawer } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: {
    height: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 19px',
    justifyContent: 'space-between',
    position: 'fixed',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  container: {
    marginTop: 64,
  },
  backIcon: {
    color: '#4b4f56',
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: '#4b4f56',
    margin: 0,
  },
}));

const DrawerStyle = withStyles(() => ({
  paper: {
    color: '#1a1a1a',
  },
}))(Drawer);
export { useStyles, DrawerStyle };
