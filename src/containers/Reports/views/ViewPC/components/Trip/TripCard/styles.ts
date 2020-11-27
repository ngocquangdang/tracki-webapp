import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '9px 10px 10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
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
    backgroundColor: theme.palette.primary.main,
  },
  circleRed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: '#e60000',
  },
}));

export { useStyles };
