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
  linkBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      display: 'block',
      alignAtems: 'center',
      textAlign: 'center',
      margin: 'auto',
    },
    '&:not(svg)': {
      fontSize: 13,
    },
  },
  coin: {
    color: '#e9a213',
  },
  wallet: {
    padding: '0 15px',
    color: theme.palette.primary.main,
  },
  cointNumber: {
    borderRight: '1px solid #e0e0e0',
    paddingRight: '10px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  myWallet: {
    color: '#1a1a1a',
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
}));

const Icon = styled.div`
  margin-right: 9px;
  & > svg {
    fill: #666666;
  }
`;

const Label = styled.div``;

const LinkStyle = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '15px',
    color: '#666666',
    width: '100%',
  },
}))(Link);

export { useStyles, LinkStyle, Item, Icon, Label, MenuButton };
