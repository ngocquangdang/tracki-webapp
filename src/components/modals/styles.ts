import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 21px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '457px',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        maxWidth: '360px',
        margin: '0 auto',
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: 4,
      padding: '30px',
      border: '1px solid #707070',
      outline: 'none',
      [theme.breakpoints.down('md')]: {
        padding: '15px',
      },
    },
  })
);
export { Header, Title, useStyles };
