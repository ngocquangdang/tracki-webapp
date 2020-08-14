import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
  },
  header: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
  },
  headerLeft: {
    display: 'flex',
  },
  iconBack: {
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  icon: {
    position: 'relative',
    left: 3,
    padding: 2,
    color: '#1a1a1a',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 400,
    color: '#1a1a1a',
  },
  headerBtn: {
    color: '#666',
  },
  headerBtnIcon: {
    fontSize: '16px !important',
  },
  footer: {
    height: 45,
  },
  mapView: {
    position: 'relative',
    height: 'calc(100% - 101px)',
    width: '100%',
  },
  tabs: {
    minHeight: '100%',
    height: '100%',
    '& div div': {
      height: '100%',
    },
  },
  indicator: {
    height: 4,
  },
  tabItem: {
    padding: 0,
    width: '25%',
    minWidth: '25%',
    flexDirection: 'row',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: '17px',
    minHeight: '100%',
  },
  trackerCard: {
    opacity: 0.95,
    borderRadius: 4,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 5,
    width: 'calc(100% - 10px)',
    left: 5,
    right: 5,
    zIndex: 400,
  },
}));
