import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 70,
  },
  searchContainer: {
    backgroundColor: '#f7f7f7',
    padding: '11px 15px 10px',
  },
  content: {
    backgroundColor: 'white',
  },
  listDevice: {},
  title: {
    padding: '25px 15px 0',
    fontSize: 18,
    lineHeight: '22px',
  },
  listItem: {
    paddingTop: 12,
    paddingBottom: 12,
    cursor: 'default',
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      borderBottomWidth: 0,
    },
  },
  avatar: {
    backgroundColor: '#168449',
    width: 50,
    height: 50,
  },
  text: {
    '& span': {
      fontWeight: 300,
      fontSize: 16,
      lineHeight: '19px',
      color: '#1a1a1a',
    },
  },
  unlinkBtn: {
    textAlign: 'center',
    color: '#1a1a1a',
    fontSize: 12,
    lineHeight: '14px',
    fontWeight: 300,
    '& span': {
      display: 'block',
      margin: 'auto',
    },
  },
  saveBtnWrap: {
    padding: 15,
  },
}));

export { useStyles };
