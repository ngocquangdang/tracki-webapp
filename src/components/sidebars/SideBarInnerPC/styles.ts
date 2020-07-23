import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

type Props = {
  opened?: boolean;
};

const Container = styled.div`
  width: ${(props: Props) => (props.opened ? 400 : 0)};
`;

const Content = styled.div`
  width: 400px;
  height: 100%;
  max-width: 400px;
  top: 0;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  display: ${(props: Props) => (props.opened ? 'block' : 'none')};
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;

const useStyles = makeStyles(theme => ({
  toggleIconBtn: {
    position: 'absolute',
    color: '#1a1a1a',
    width: 26,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
  closeBtn: {
    left: 399,
    top: 0,
    zIndex: 1,
  },
}));

export { Container, Content, useStyles };
