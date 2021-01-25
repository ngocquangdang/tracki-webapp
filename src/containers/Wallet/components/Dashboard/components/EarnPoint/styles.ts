import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '13px 20px',
  },
  btnBackground: {
    height: 36,
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    color: '#1a1a1a',
  },
  coin: {
    margin: '0 5px',
    fontSize: 16,
    fontWeight: 500,
    color: '#e99313',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  cointLine: {
    margin: 0,
    color: '#e99313',
  },
  drawerWidth: {
    '& > .MuiDrawer-paper': {
      width: 375,
    },
  },
  footer: {
    padding: '9px 15px',
  },
  drawerTitle: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 13,
  },
  subTitle: {
    fontSize: 15,
  },
  normalBtn: {
    padding: '15px 0',
    width: '100%',
    textAlign: 'center',
    color: '#1a1a1a',
    backgroundColor: '#f5f5f5',
    margin: '1rem 0',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  content: {
    height: 'calc(100vh - 300px)',
    overflowY: 'scroll',
  },
}));

export { useStyles };
