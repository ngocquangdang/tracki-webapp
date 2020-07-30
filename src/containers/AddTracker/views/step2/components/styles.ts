import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Header = styled.div`
  text-align: center;
`;
const Icon = styled.div`
  color: #168449;
  margin-bottom: 19px;
`;
const Title = styled.div`
  font-size: 42px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  @media (max-width: 995.95px) {
    font-size: 32px;
    margin: 9px auto;
    font-weight: normal;
  }
`;
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  @media (max-width: 995.95px) {
    font-size: 16px;
  }
`;
const Container = styled.div`
  max-width: 921px;
  width: 100%;
  margin: 15px auto;
  border-radius: 4px;
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  background-color: #ffffff;
  @media (max-width: 995.95px) {
    max-width: 349px;
  }
`;
const Footer = styled.div`
  margin: 15px auto;
`;
const useStyles = makeStyles(theme => ({
  icon: {
    width: 126.5,
    height: 126.5,
    [theme.breakpoints.down('sm')]: {
      width: 106,
      height: 106,
    },
  },
  widthBtn: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 349,
    },
  },
}));
export { Header, Icon, Title, SubTitle, Container, Footer, useStyles };
