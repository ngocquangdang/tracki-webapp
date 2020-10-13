import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 959.95px) {
    padding: 10px;
    width: 90%;
    margin-bottom: 60px;
  }
`;
const Content = styled.div`
  border: ${(props: { isOption1: boolean }) =>
    props.isOption1 ? 'none' : ' 1px solid #e0e0e0'};
  width: 100%;
  height: 100%;
`;
const AnotherWayPay = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  cursor: pointer;
  height: 65px;
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
`;

const Title = styled.span`
  font-size: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '16px' : '18px'};
  font-weight: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'normal' : '500'};
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  margin-bottom: 15px;
`;

const OptionPayment = styled.div`
  padding: 21px 20px 50px 12px;
  @media (max-width: 959.95px) {
    padding: 10px;
  }
`;
const OptionPay = styled.div`
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
`;
const ControlPayment = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 111px;
  height: 32px;
  object-fit: contain;
`;
const SubText = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  @media (max-width: 959.95px) {
    font-size: 16px;
  }
`;
const TextFooter = styled.div`
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  text-align: left;
  margin-top: 14px;
  @media (max-width: 959.95px) {
    font-size: 13px;
  }
`;
const ContentOption1 = styled.div``;
const useStyles = makeStyles(theme => ({
  creditLogo: {
    width: '32.2px',
    height: '25.7px',
    color: '#484d56',
  },
}));

export {
  Container,
  Title,
  Content,
  AnotherWayPay,
  OptionPayment,
  OptionPay,
  ControlPayment,
  Logo,
  SubText,
  TextFooter,
  ContentOption1,
  useStyles,
};
