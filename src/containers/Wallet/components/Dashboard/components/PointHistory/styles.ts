import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '13px 20px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 7,
  },
  img: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
  },
  calenderIcon: {
    width: '42px',
    height: '42px',
  },
  giftIcon: {
    width: '48px',
    height: '48px',
    color: '#a163ba',
  },
  icon: {
    marginRight: 10,
  },
  mr0: {
    margin: 0,
  },
  time: {
    fontSize: 15,
    color: '#999999',
  },
  name: {
    fontSize: 16,
  },
  point: {
    minWidth: 100,
    textAlign: 'end',
    color: theme.palette.primary.main,
  },
  drawerWidth: {
    '& > .MuiDrawer-paper': {
      width: 375,
    },
  },
  content: {
    height: '100%',
    overflowY: 'scroll',
  },
}));

export { useStyles };
