import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ToolBar = styled.div`
  position: absolute;
  left: 5px;
  bottom: 140px;
  z-index: 401;
`;
const ListItem = styled.ul`
  width: 50px;
  overflow: hidden;
  padding: 0;
  margin: 5px 0;
  transition: width 1s;
`;
const Text = styled.span``;

const MenuItem = styled.li`
  display: flex;
  background: #ffffff;
  border-radius: 100px;
  margin-bottom: 5px;
  color: rgba(102, 102, 102, 0.9);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  width: 34px;
  height: 34px;
`;

const Icon = styled.div`
  color: rgb(107, 107, 107);
  width: 34px;
  height: 34px;
  min-width: 34px;
  background: #ffffff;
  border-radius: 100px;
`;
const ItemText = styled.div`
  display: flex;
  overflow: hidden;
  font-size: 12px;
`;
const useStyles = makeStyles(theme => ({
  btnRoot: {
    color: theme.palette.secondary.dark,
    width: '34px',
    height: '34px',
    minWidth: 34,
    borderRadius: '100px',
    background: '#ffffff',
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12,
  },
  menuRightIcon: {
    fontSize: '17px',
    color: '#1a1a1a',
  },
  menuRightLabel: {
    fontSize: 9,
    color: '#999',
  },
  menuItemIcon: {
    minWidth: 34,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: '1em',
  },
  menuText: {
    '& span': {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 17,
      color: 'rgba(102, 102, 102, 0.9)',
    },
  },
  isActive: {
    width: '100%',
  },
  fullWidth: {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedWidthChild: {
    width: 121,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    display: 'flex',
    paddingRight: 11,
    textAlign: 'center',
    overflow: 'hidden',
  },
  iconLoading: {
    width: '22px !important',
    height: '22px !important',
  },
}));

export { ToolBar, ListItem, Icon, Text, MenuItem, ItemText, useStyles };
