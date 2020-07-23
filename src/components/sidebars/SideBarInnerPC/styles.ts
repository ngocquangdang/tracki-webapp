import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const SideBarContainer = styled.div`
  position: absolute;
  height: 100%;
  z-index: 1;
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
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 0,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    minWidth: 'auto',
    left: 399,
    top: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

export { SideBarContainer, Content, useStyles };
