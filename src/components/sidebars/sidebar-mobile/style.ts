import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link } from '@material-ui/core';

const drawerWidth = 300;

const Item = styled.li`
  flex-direction: row;
  display: flex;
  list-style: none;
  text-decoration: none;
`;

const SearchHeader = styled.div`
  display: flex;
  height: 34px;
  padding: 10px;
  justify-content: space-between;
  font-size: 12px;
  color: #1a1a1a;
  border-bottom: 1px solid #e0e0e0;
`;
const DeviceTrackers = styled.div`
  color:'#1a1a1a;
`;
const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
`;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  linkBtn: {
    display: 'flex',
    flexDirection: 'row',
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
}));

const Icon = styled.div`
  margin-right: 9px;
`;

const Label = styled.div``;

const LinkStyle = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '15px',
    color: '#666666',
  },
}))(Link);

export {
  useStyles,
  SearchHeader,
  LinkStyle,
  Item,
  Icon,
  Label,
  DeviceTrackers,
  MenuButton,
};
