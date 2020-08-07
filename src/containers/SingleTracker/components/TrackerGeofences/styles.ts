import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  header: {
    display: 'flex',
    height: 55,
    justifyContent: 'space-between',
    color: '#1a1a1a',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '1px 0 0 0 rgba(0, 0, 0, 0.12)',
    padding: '12px 10px 11px 15px',
  },
  headerText: {
    fontSize: 17,
  },
  headBtn: {
    height: 32,
    fontSize: 16,
    lineHeight: '20px',
  },
  backBtn: {
    color: '#1a1a1a',
    fontSize: 17,
    fontWeight: 400,
  },
  iconBack: {
    width: '20px',
    height: '20px',
  },
  content: {
    height: 'calc(100% - 55px)',
    position: 'relative',
  },
  tabs: {
    height: 55,
    '& div div': {
      height: '100%',
      boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  tabPanel: {
    height: 'calc(100% - 55px)',
    overflowY: 'auto',
    padding: 10,
  },
  tabItem: {
    width: '50%',
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 400,
    color: '#b7b7b7',
  },
  title: {
    fontSize: 17,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#1a1a1a',
    marginTop: 5,
    marginBottom: 17,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 400,
    color: '#999',
  },
  helpIcon: {
    position: 'relative',
    top: 3,
    marginLeft: 5,
    fontSize: 18,
  },
  geoList: {
    marginBottom: 14,
    maxHeight: 'calc(100% - 100px)',
    overflowY: 'auto',
    '& li': {
      display: 'block',
    },
  },
}));

export { useStyles };
