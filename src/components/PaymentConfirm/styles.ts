import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const FormInfo = styled.div`
  padding: 40px;
`;
const Subcription = styled.div``;
const BigTitle = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
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
`;
const Payment = styled.div`
  margin-top: 15px;
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
`;
const Line = styled.hr`
  width: 300px;
  margin-left: 0;
`;
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
`;
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
`;
const Container = styled.div`
  max-width: 921px;
  width: 100%;
  margin: 15px auto;
  border-radius: 4px;
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
`;
const useStyles = makeStyles(theme => ({
  icon: {
    width: 126.5,
    height: 126.5,
  },
  widthBtn: {
    width: 400,
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
