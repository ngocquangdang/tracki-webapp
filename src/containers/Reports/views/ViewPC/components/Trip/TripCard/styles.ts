import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '9px 10px 10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
    cursor: 'pointer',
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6,
    flex: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > p': {
      fontSize: 12,
      margin: 0,
    },
  },
  textBold: {
    fontWeight: 500,
  },
  textFont13: {
    fontSize: 13,
  },
  textFont14: {
    fontSize: 14,
  },
  textFont11: {
    fontSize: 11,
  },
  colorGrey: {
    color: '#999999',
  },
  textColorMain: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  imageWrapper: {
    width: 50,
    borderRadius: 25,
    height: 50,
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    marginRight: 16,
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  textWeight300: {
    fontWeight: 300,
  },
  circleGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  cicrlGrey: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: '#666666',
  },
  circleRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: '#e60000',
  },
  containerPoints: {
    transition: 'height 1s ease-in-out',
  },
  btn: {
    backgroundColor: '#999999',
    color: '#fff',
    width: '100%',
    height: 26,
    fontWeight: 'normal',
    fontSize: 12,
    textTransform: 'none',
    boxShadow: 'none',
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
  containerPoint: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    lineHeight: 2.3,
    flex: 1,
    whiteSpace: 'nowrap',
    '& :first-child': {
      paddingRight: 10,
    },
  },
  containerPointAlert: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 2.3,
    flex: 1,
    whiteSpace: 'nowrap',
    '& .pr20': {
      paddingRight: 20,
    },
  },
  red: {
    color: '#cc2c2c !important',
  },
  orange: {
    color: '#e97500',
    paddingRight: 10,
  },
  font18: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.3,
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  pt10: {
    paddingTop: 10,
  },
}));

export { useStyles };
