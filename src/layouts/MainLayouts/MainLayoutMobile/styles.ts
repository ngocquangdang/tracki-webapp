import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Content = styled.div`
  position: relative;
  /* height: calc(100vh - 70px); */
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  blurHeader: {
    filter: 'brightness(0.5)',
    backgroundColor: '#000000',
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export { Content, useStyles };
