import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, withStyles } from '@material-ui/core/styles';
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 21px;
`;

const BackDrop = withStyles(theme => ({
  root: {
    '&.MuiBackdrop-root': {
      backdropFilter: 'blur(2px)',
    },
  },
}))(Backdrop) as any;

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '811px',
    height: '468px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '360px',
      margin: '0 auto',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 4,
    border: '1px solid #707070',
    outline: 'none',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
      margin: '5px',
      width: '360px',
    },
  },
}));

export { Header, Title, BackDrop, useStyles };
