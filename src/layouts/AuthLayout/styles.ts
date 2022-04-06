import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;
const Row = styled.div`
  display: flex;
  height: 100%;
`;
const Background = styled.div`
  width: 45%;
  background: url('/images/turntable.jpg');
  position: relative;
  box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
const Description = styled.div`
  position: absolute;
  display: block;
  top: 40%;
  width: 100%;
  text-align: center;
  color: #ffffff;
`;
const Logo = styled.img`
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
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
const Content = styled.div`
  width: 55%;
  position: relative;
  height: 100%;
  background: #ffffff;
  overflow-y: auto;
  @media (max-width: 959.59px) {
    width: 100%;
  }
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
  Content,
  useStyles,
};
