import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  containerTrip: {
    display: 'flex',
    position: 'relative',
    height: 'calc(100vh - 70px)',
    width: '100%',
  },
  container: {},
  header: {
    width: '100%',
    maxWidth: '100%',
    height: 55,
    backgroundColor: '#ffffff',
    boxShadow: 'inset 0px 4px 7px 0px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxShadow: {
    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.12)',
    width: 590,
    maxWidth: 590,
  },
  titleHead: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 30,
    color: '#1a1a1a',
  },
  iconReport: {
    color: theme.palette.primary.main,
    fontSize: 30,
  },
  title: {
    fontSize: 27,
    fontWeight: 300,
    lineHeight: 1.22,
  },
  content: {
    padding: 25,
  },
  mapView: {
    position: 'relative',
    height: '100%',
    width: '100%',
    paddingLeft: 0,
  },
}));

export { useStyles };
