import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#363640',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 404,
  },
  header: {
    height: 60,
  },
  content: {
    height: 'calc(100% - 140px)',
    position: 'relative',
  },
  saveBtn: {
    height: 50,
  },
  addNewBtn: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    color: '#4b4f56',
    fontSize: 15,
    lineHeight: '19px',
    fontWeight: 400,
    borderColor: '#ccd0d5',
    backgroundColor: '#fff',
    borderRadius: 30,
    '& > span > span': {
      marginRight: 0,
      '& svg': {
        fontSize: '30px !important',
      },
    },
  },
  footer: {
    height: 80,
    padding: 15,
  },
}));

export { useStyles };
