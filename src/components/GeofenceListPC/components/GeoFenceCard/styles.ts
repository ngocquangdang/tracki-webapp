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
  menuList: {
    padding: 0,
  },
  menuRoot: {
    paddingTop: 0,
  },
  menuItem: {
    color: TEXT_COLOR,
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
const Status = styled.span`
  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
  color: #999;
`;
const ListItemStyle = withStyles(theme => ({
  root: {
    height: 56,
    marginBottom: 10,
    '&:first-child': {
      marginTop: 16,
    },
  },
}))(ListItem);

export { Status, Image, useStyles, ListItemStyle };
