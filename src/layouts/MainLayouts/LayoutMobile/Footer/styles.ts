import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const Item = styled.li`
  list-style: none;
  text-decoration: none;
  padding-top: 3px;
`;

const Content = styled.div`
  position: relative;
  /* height: calc(100vh - 70px); */
  width: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #168449;
  height: 45px;
  width: 100%;
  justify-content: space-around;
`;

const useStyles = makeStyles(theme => ({
  linkBtnMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
    },
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

export { Content, Menu, Item, LinkStyle, useStyles };
