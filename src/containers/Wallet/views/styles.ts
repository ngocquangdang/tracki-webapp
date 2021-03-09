import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  layout: {
    margin: 25,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      background: '#ffffff',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
  },
  container: {
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  menuItem: {
    textAlign: 'center',
    padding: '0 10px',
    color: '#666666',
  },
  menuTitle: {
    margin: 0,
  },
  icon: {
    width: '27px',
    height: '25px',
    color: theme.palette.primary.main,
    marginRight: 10,
  },
  caption: {
    fontSize: 36,
    fontWeight: 300,
    color: '#1a1a1a',
    margin: 0,
  },
  tabItemRoot: {
    minWidth: 90,
    padding: '6px 0',
    '& > svg': {
      fill: theme.palette.primary.main,
    },
  },
  tabIcon: {
    fontSize: 12,
    fontWeight: 300,
    '& svg': {
      fontSize: 24,
      fill: '#666666',
    },
  },
  tabRoot: {
    height: 70,
  },
  indicatorStyle: {
    display: 'none',
  },
  isActive: {
    '& > .MuiTab-wrapper > svg': {
      fill: theme.palette.primary.main,
    },
  },
}));

const Menu = styled.div`
  display: flex;
  align-items: center;
  &:before {
    content: '';
    width: 158px;
    height: 1px;
    background: #e0e0e0;
    display: block;
  }
  &:after {
    content: '';
    width: 158px;
    height: 1px;
    background: #e0e0e0;
    display: block;
  }
`;

export { useStyles, Menu };
