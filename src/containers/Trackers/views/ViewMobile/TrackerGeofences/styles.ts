import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 404,
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
    lineHeight: '19px',
  },
  headerLeft: {
    display: 'flex',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: '19px',
    alignSelf: 'center',
  },
  addBtn: {
    fontWeight: 300,
    '& > span > span': {
      marginRight: 0,
    },
  },
  iconBtn: {
    width: 31,
    padding: 0,
    color: '#1a1a1a',
  },
  imgWrap: {
    position: 'relative',
    top: -5,
    marginRight: 8,
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: '8px',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  iconBack: {
    width: 20,
    height: 20,
    position: 'relative',
    left: 3,
  },
  iconAdd: {
    fontSize: '24px !important',
  },
  content: {
    height: 'calc(100% - 110px)',
    position: 'relative',
  },
  tabs: {
    height: 55,
    boxShadow: '0 -2px 8px 0 rgba(0, 0, 0, 0.12)',
    '& div div': {
      height: '100%',
      boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  tabPanel: {
    height: '100%',
    overflowY: 'auto',
    padding: 10,
  },
  tabItem: {
    width: '50%',
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 400,
    color: '#b7b7b7',
    maxWidth: '50%',
  },
  indicator: {
    height: 4,
  },
  title: {
    fontSize: 14,
    lineHeight: '17px',
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
