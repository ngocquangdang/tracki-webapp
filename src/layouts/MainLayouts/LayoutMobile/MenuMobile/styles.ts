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
const LayerPanel = styled.div`
  display: none;
  background: blue;
  width: 195px;
  height: auto;
  padding: 8px 11px;
  bottom: 55px;
  right: 10px;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(22, 132, 73, 0.9);
  position: absolute;
`;
const Title = styled.span`
  font-size: 11px;
`;
const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px;
`;
const LayerItem = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;
const ItemLayer = styled.li`
  list-style: none;
  display: block;
`;
const Image = styled.img`
  display: block;
`;
const Name = styled.span`
  font-size: 8px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  },
}));

const LinkStyle = withStyles(theme => ({
  root: {
    display: 'block',
    textAlign: 'center',
  },
}))(Link);

export {
  Content,
  Menu,
  LinkStyle,
  Item,
  LayerPanel,
  TopPanel,
  LayerItem,
  Title,
  ItemLayer,
  Image,
  Name,
  useStyles,
};
