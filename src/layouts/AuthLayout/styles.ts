import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  
`;
const Row = styled.div`
  display: flex;
  height: 100%;
`
const Background = styled.div`
  width: 55%;
  background: url('images/turntable.jpg');
`

const useStyles = makeStyles(theme => ({
  media: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
}))

export {
  Container, Row, Background, useStyles
}
