import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const ToolBar = styled.div`
  position: absolute;
  right: 10px;
  bottom: 27px;
  @media (max-width: 959.95px) {
    display: none;
  }
`;
const ZoomIn = styled.button``;
const ZoomOut = styled.button``;
const IconButton = styled.button`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: #666666;
  width: 40px;
  height: 40px;
  border: 0;
  font-size: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  &:focus {
    outline: none;
  }
  &:hover {
    background: #168449;
    color: #ffffff;
  }
`;
const ZoomButton = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: #666666;
  width: 40px;
  border: 0;
  font-size: 20px;
  margin: 10px 0;
  height: 80px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  & > :last-child {
    border-top: 1px solid #cdcdcd;
  }
  &:focus {
    outline: none;
  }
`;

const Text = styled.div``;

const LayerPanel = styled.div`
  display: none;
  background: blue;
  width: 195px;
  height: auto;
  padding: 8px 11px;
  top: 20%;
  right: 45px;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(22, 132, 73, 0.9);
  position: absolute;
`;
const Title = styled.span``;
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
const Item = styled.li`
  list-style: none;
  display: block;
`;
const Image = styled.img`
  display: block;
`;
const Name = styled.span`
  font-size: 12px;
  padding: 5px 0;
`;
const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: '#666666',
    width: 40,
    height: 40,
    border: 0,
    background: '#ffffff',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#ffffff',
    },
  },
  borderRadiusTop: {
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  borderRadiusBottom: {
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  display: {
    display: 'block',
  },
}));
export {
  ToolBar,
  IconButton,
  ZoomButton,
  ZoomIn,
  ZoomOut,
  Text,
  LayerPanel,
  TopPanel,
  LayerItem,
  Title,
  Item,
  Image,
  Name,
  useStyles,
};
