import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
`;

const MapView = styled.div`
  position: relative;
  height: 100%;
  width: ${(props: { fullWidth?: boolean }) =>
    props.fullWidth ? '100%' : 'calc(100% - 320px)'};
  @media (max-width: 959.95px) {
    width: 100%;
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
  relative: {
    position: 'relative',
    top: 0,
  },
  absolute: {
    position: 'absolute',
    left: 398,
    top: 0,
    color: 'black',
    zIndex: 1,
  },
  absoluteFirst: {
    position: 'absolute',
  },
  btnIcon: {
    color: '#1a1a1a',
    width: 26,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    minWidth: 'auto',
  },
}));

export { Container, MapView, useStyles };
