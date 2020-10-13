import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#168449',
    height: 45,
    width: '100%',
    justifyContent: 'space-around',
  },
  navLink: {
    listStyle: 'none',
    textDecoration: 'none',
    paddingTop: 3,
  },
  linkBtnMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#fff',
    '& svg': {
      marginBottom: 4,
      display: 'block',
      alignAtems: 'center',
      textAlign: 'center',
      margin: 'auto',
      width: '20.7px',
      height: '20.7px',
    },
    '&:not(svg)': {
      fontSize: 10,
      color: '#fff',
    },
  },
  display: {
    display: 'block',
    bottom: 55,
    right: 10,
    top: 'unset',
  },
}));

const LinkStyle = withStyles(() => ({
  root: {
    display: 'block',
    textAlign: 'center',
  },
}))(Link);

export { LinkStyle, useStyles };
