import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const FormInfo = styled.div`
  padding: 40px;
  @media (max-width: 995.95px) {
    padding: 0;
  }
`;
const Subcription = styled.div`
  @media (max-width: 995.95px) {
    padding: 26px 15px 0;
  }
`;
const BigTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 995.95px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const TitleContent = styled.p`
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  margin: 0;
  @media (max-width: 995.95px) {
    font-size: 16px;
    order: 1;
  }
`;
const Date = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  margin: 0;
  @media (max-width: 995.95px) {
    font-size: 12px;
    order: 0;
    margin-bottom: 12px;
  }
`;
const Payment = styled.div`
  margin-top: 15px;
  @media (max-width: 995.95px) {
    padding: 0px 15px 11px;
  }
`;
const SubItem = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
`;
const Line = styled.hr`
  width: 300px;
  margin-left: 0;
  @media (max-width: 995.95px) {
    margin: 0;
    width: 100%;
  }
`;
const Header = styled.div`
  text-align: center;
`;
const Icon = styled.div`
  color: #168449;
  margin-bottom: 19px;
  @media (max-width: 995.95px) {
    margin: 52px auto 19px;
  }
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
  @media (max-width: 995.95px) {
    max-width: 349px;
  }
  @media (max-width: 374.95px) {
    max-width: 300px;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  width: 100%;
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
    [theme.breakpoints.down(374.95)]: {
      width: 300,
    },
  },
}));

export {
  FormInfo,
  Subcription,
  BigTitle,
  TitleContent,
  Date,
  Payment,
  SubItem,
  Line,
  Header,
  Icon,
  Title,
  SubTitle,
  Container,
  Footer,
  useStyles,
};
