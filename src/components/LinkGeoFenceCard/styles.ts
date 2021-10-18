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
    height: '100%',
    width: '100%',
  },
  active: {
    borderLeftWidth: 3,
    borderLeftColor: ACTIVE_COLOR,
    borderLeftStyle: 'solid',
  },
  listItemAvt: {
    minWidth: 50,
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
    height: 56,
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
  moreContainer: {
    position: 'absolute',
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #f7f7f7',
    display: 'flex',
    left: 0,
  },
  moreLeft: {
    height: 56,
  },
  moreRight: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    display: 'flex',
  },
  moreRight2: {
    '& span span': {
      marginRight: 0,
    },
  },
  moreActionBtn: {
    color: '#1a1a1a',
    width: '50%',
    maxWidth: '50%',
    height: 56,
    fontSize: 12,
    lineHeight: '14px',
    fontWeight: 300,
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
    width: '70%',
    paddingLeft: 10,
    marginBottom: 10,
  },
  container: {
    height: 56,
    width: '100%',
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #f7f7f7',
    marginBottom: 10,
  },
}))(ListItem);

export { Image, useStyles, ListItemStyle };
