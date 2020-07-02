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
`;
const Background = styled.div`
  width: 40%;
  background: url('images/turntable.jpg');
  position: relative;
`;
const Description = styled.div`
  position: absolute;
  display: block;
  top: 40%;
  padding: 0 10%;
  width: 100%;
  text-align: center;
  color: #ffffff;
`;
const Logo = styled.img``;
const Title = styled.div`
  font-size: 16px;
  margin: 20px;
`;
const SubLogo = styled.div`
  font-size: 20px;
  line-height: 1.245;
`;

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  -webkit-backdrop-filter: blur(50px);
  backdrop-filter: blur(50px);
  background-color: #1d222e;
`;

const useStyles = makeStyles(theme => ({
  media: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export {
  Container,
  Row,
  Background,
  Layout,
  Description,
  Logo,
  Title,
  SubLogo,
  useStyles,
};
