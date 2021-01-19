import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {},
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  betweenJustify: {
    justifyContent: 'space-between',
  },
  mr0: {
    margin: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: '#666666',
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  code: {
    fontSize: 36,
    fontWeight: 500,
    color: '#1a1a1a',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  description: {
    maxWidth: 358,
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  codeField: {
    marginBottom: 25,
  },
  copyCompleted: {
    fontSize: 32,
    fontWeight: 500,
    margin: '9px 0',
  },
  copyDescription: {
    fontSize: 18,
    margin: 0,
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
  copyContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
  },
  qrCode: {
    width: 330,
    height: 330,
    padding: 20,
  },
  qrCodeDevcription: {
    fontSize: 20,
    fontWeight: 500,
    margin: '6px 0',
  },
  iconGroup: {
    width: 'calc((100% - 20px)/3)',
    marginBottom: 25,
    textAlign: 'center',
    cursor: 'pointer',
  },
  iconList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  itemTitle: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
  },
  hangoutIcon: {
    width: '42px',
    height: '48px',
    fill: '#0c9d58',
  },
  googlePlus: {
    fill: '#db4437',
    width: '42px',
    height: '48px',
  },
  normalIcon: {
    width: 40,
    height: 40,
  },
}));

export { useStyles };
