import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

const TEXT_COLOR = '#1a1a1a';
const ACTIVE_COLOR = '#168449';
const BG_COLOR = '#eeeeee';

interface StyleProps {
  disabled?: boolean;
  active?: boolean;
}

const useStyles = makeStyles(() => ({
  paper: {
    height: 56,
    width: '100%',
    borderRadius: 3,
    border: 'solid 1px rgba(0,0,0,.04)',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  active: {
    borderLeftWidth: 3,
    borderLeftColor: ACTIVE_COLOR,
    borderLeftStyle: 'solid',
  },
  avatar: {
    backgroundColor: BG_COLOR,
  },
  avtActive: {
    backgroundColor: ACTIVE_COLOR,
  },
  text: {
    color: TEXT_COLOR,
    '& span': {
      fontSize: 14,
      lineHeight: '17px',
    },
  },
  textActive: {
    color: ACTIVE_COLOR,
  },
  actions: {
    right: 0,
  },
  iconBtn: {
    width: 36,
    height: 36,
  },
  actionBtn: {
    textAlign: 'center',
    color: '#1a1a1a',
    fontSize: 11,
    lineHeight: '13px',
    fontWeight: 300,
    margin: 0,
    padding: 0,
    minWidth: 56,
    '& span': {
      display: 'block',
      margin: 'auto',
    },
    '& img': {
      width: 20,
      height: 20,
    },
  },

  menuRoot: {
    paddingTop: 0,
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    color: '#1a1a1a',
    fontSize: 17,
    lineHeight: '20px',
    height: 'auto',
    padding: 10,
    display: 'block',
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.14)',
    },
  },
}));

const Image = styled.img`
  width: 20px;
  margin: auto;
`;
const ListItemStyle = withStyles(() => ({
  root: {
    cursor: 'default',
    height: 56,
    marginBottom: 10,
  },
}))(ListItem);

export { Image, useStyles, ListItemStyle };
