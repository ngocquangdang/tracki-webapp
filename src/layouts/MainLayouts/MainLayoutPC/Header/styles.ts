import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const Item = styled.li`
  list-style: none;
  text-decoration: none;
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
  },
  logoWrapper: {
    width: 378,
    alignSelf: 'center',
  },
  logo: {
    objectFit: 'contain',
    height: 35.4,
  },
  btnRoot: {
    color: theme.palette.secondary.main,
  },
  linkBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: '1.5em',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      marginBottom: 4,
      display: 'block',
      alignAtems: 'center',
      textAlign: 'center',
      margin: 'auto',
    },
    '&:not(svg)': {
      fontSize: 13,
    },
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12,
  },
}));

const LinkStyle = withStyles(theme => ({
  root: {
    display: 'block',
    textAlign: 'center',
  },
}))(Link);
export { useStyles, LinkStyle, Item };
