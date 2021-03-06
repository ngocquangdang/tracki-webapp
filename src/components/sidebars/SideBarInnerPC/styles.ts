import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const SideBarContainer = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props: { isOpen: boolean }) => (props.isOpen ? 'auto' : '0')};
  z-index: 401;
`;

const Content = styled.div`
  width: 400px;
  height: 100%;
  max-width: 400px;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;

const useStyles = makeStyles(theme => ({
  toggleIconBtn: {
    position: 'absolute',
    width: 26,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 0,
    boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    minWidth: 'auto',
    left: 400,
    top: -1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

export { SideBarContainer, Content, useStyles };
