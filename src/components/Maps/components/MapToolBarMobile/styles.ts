import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import styled from 'styled-components';

const ToolBar = styled.div`
  position: absolute;
  right: 10px;
  top: 27px;
`;
const Text = styled.div``;

const StyledMenuItem = withStyles(() => ({
  root: {
    background: '#ffffff',
    borderRadius: 100,
    marginBottom: 5,
    color: '#1a1a1a',
    width: 'fit-content',
  },
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  btnRoot: {
    color: theme.palette.secondary.main,
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12,
  },
  menuRightIcon: {
    fontSize: '2.8em',
    color: '#ffffff',
  },
  menuRightLabel: {
    fontSize: 9,
    color: '#999',
  },
  menuItemIcon: {
    minWidth: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
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
      color: '#666',
    },
  },
}));

export { ToolBar, Text, StyledMenuItem, useStyles };
