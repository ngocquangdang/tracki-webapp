import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 56,
  },
  content: {
    width: '100%',
    height: '100%',
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
  footer: {
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid #ddd',
    width: '100%',
    height: 45,
    zIndex: 1000,
    backgroundColor: '#fff',
    boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0.12)',
  },
  tabItem: {
    padding: 0,
    width: '20%',
    minWidth: '20%',
    flexDirection: 'row',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 17,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  headerBtnIcon: {
    fontSize: '16px !important',
  },
  headerBtn: {
    color: '#666',
    fontSize: 15,
    lineHeight: '18px',
    fontWeight: 300,
    alignSelf: 'center',
  },
}));

export { useStyles };
