import { makeStyles, IconButton, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: 9,
    top: 9,
    zIndex: 400,
  },
  display: {
    display: 'block',
    top: 88,
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
}))(IconButton);

export { IconButtonStyle, useStyles };
