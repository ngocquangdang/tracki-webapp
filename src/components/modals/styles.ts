import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Title = styled.span``;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '-150px !important',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: 3,
      padding: 15,
      margin: 8,
      width: '100%',
    },
  })
);
export { Header, Title, useStyles };
