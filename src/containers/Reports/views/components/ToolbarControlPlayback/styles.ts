import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 100,
    width: 'calc(100% - 400px)',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    borderRadius: 4,
    opacity: 0.95,
    zIndex: 400,
    transition: 'width .2s',
  },
  containerMobile: {
    width: '97% !important',
    margin: 5,
  },
  openSidebar: {
    width: '100% !important',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    margin: '0 auto',
    width: 700,
    maxWidth: 700,
  },
  contentMobile: {
    width: '100% !important',
    padding: 5,
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconBtn: {
    cursor: 'pointer',
    border: '2px solid #168449',
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    '& > span': {
      color: theme.palette.primary.main,
    },
  },
  iconBtnRefresh: {
    cursor: 'pointer',
    border: '2px solid #168449',
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    '& > span': {
      color: theme.palette.primary.main,
    },
  },
  iconBtnMobile: {
    cursor: 'pointer',
    border: '2px solid #168449',
    borderRadius: '50%',
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    '& > span > svg': {
      color: theme.palette.primary.main,
      fontSize: 18,
    },
  },
  iconRefreshBtnMobile: {
    cursor: 'pointer',
    border: '2px solid #168449',
    borderRadius: '50%',
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    '& > span > svg': {
      color: theme.palette.primary.main,
      fontSize: 18,
    },
  },
  slider: {},
  btn: {
    backgroundColor: '#999999',
    color: '#fff',
    width: '100%',
    height: 26,
    fontWeight: 'normal',
    fontSize: 12,
    textTransform: 'none',
    boxShadow: 'none',
    padding: 10,
    '&:hover': {
      backgroundColor: '#999999',
    },
  },
  btnActive: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.primary.main,
  },
}));

export { useStyles };
