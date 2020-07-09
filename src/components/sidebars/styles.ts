import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
  border: solid 1px var(--e-0-e-0-e-0-border-color);
  background-color: #ffffff;
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56 !important',
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
      padding: 0,
      '& span svg': {
        width: 20,
        height: 20,
      },
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down(375)]: {
      height: 26,
      width: 90,
    },
  },
  arrow: {
    width: 18,
    height: 18,
  },
  border: {
    borderRadius: 0,
    height: 55,
  },
  heightTab: {
    minHeight: 55,
  },
  relative: {
    position: 'relative',
    top: 0,
  },
  absolute: {
    position: 'absolute',
    right: -25,
    top: 0,
    color: 'black',
  },
  absolutemain: {
    position: 'absolute',
    top: 64,
    height: 'calc(100% - 64px)',
  },
  btnIcon: {
    color: '#1a1a1a',
    width: 26,
    height: 55,
    background: '#ffffff',
    borderRadius: 0,
    boxShadow: '3px 0 4px 0 rgba(0, 0, 0, 0.12)',
    minWidth: 'auto',
    '&:hover': {
      background: '#ffffff',
    },
  },
}));
const TabStyle = withStyles(theme => ({
  wrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      marginBottom: '0 !important',
      marginRight: '6px',
    },
  },
}))(Tab);

export { Content, TabStyle, useStyles };
