import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  width: ${(props: { opened?: boolean }) => (props.opened ? 400 : 0)};
`;

const Content = styled.div`
  width: 400px;
  height: 100%;
  max-width: 400px;
  top: 0;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  /* background-color: #ffffff; */
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;
const Sidebar = styled.div`
  position: absolute;
  width: 100%;
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
    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.12)',
    background: 'linear-gradient(rgba(0,0,0,0.5) -50%, rgba(0,0,0,0) 8%)',
  },
  heightTab: {
    minHeight: 55,
  },
  relative: {
    position: 'relative',
    top: 0,
  },
  absolute: {
    position: 'absolute !important' as any,
    left: 399,
    top: 0,
    color: 'black',
    zIndex: 1,
  },
  absoluteFirst: {
    position: 'absolute !important' as any,
  },
  btnIcon: {
    color: '#1a1a1a',
    width: 26,
    height: 55,
    background: '#fff',
    borderRadius: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    minWidth: 'auto',
    '&:hover': {
      background: '#ffffff',
    },
  },
}));

export { Container, Content, Sidebar, useStyles };
