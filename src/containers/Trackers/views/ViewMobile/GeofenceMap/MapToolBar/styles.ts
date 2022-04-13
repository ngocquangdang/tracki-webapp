import { makeStyles, IconButton, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: 9,
    top: 9,
    zIndex: 405,
  },
  display: {
    display: 'block',
    top: 88,
  },
  searchLocationWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '50px 10px 0 10px',
    zIndex: 450,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(2px)',
    backgroundColor: 'rgba(0,0,0,.6)',
    '& fieldset': {
      border: 'none !important',
    },
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    '& > div': {
      borderRadius: 30,
      height: '36px !important',
      '& input': {
        padding: '0 !important',
        paddingLeft: '6px !important',
      },
    },
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 20,
    top: 68,
    zIndex: 2,
    fontSize: 20,
    backgroundColor: '#fff',
  },
}));

const IconButtonStyle = withStyles(theme => ({
  root: {
    width: 32,
    height: 32,
    fontSize: 20,
    padding: 8,
    backgroundColor: '#ffffff',
    margin: '0 0 5px',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#ffffff',
    },
  },
}))(IconButton) as any;

export { IconButtonStyle, useStyles };
