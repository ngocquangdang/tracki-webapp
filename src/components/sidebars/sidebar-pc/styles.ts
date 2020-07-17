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
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')}
    @media (max-width: 959.95px) {
    margin: auto;
  }
`;
const useStyles = makeStyles(theme => ({
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

export { Container, Content, useStyles };
