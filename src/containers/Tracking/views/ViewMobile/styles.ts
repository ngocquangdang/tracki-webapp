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
    borderBottom: '1px solid #dedede',
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
    fontSize: 15,
    lineHeight: '18px',
    fontWeight: 300,
    alignSelf: 'center',
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
    overflowY: 'auto',
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
}));
