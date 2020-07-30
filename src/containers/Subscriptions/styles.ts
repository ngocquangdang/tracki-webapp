import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
const Container = styled.div`
  background-color: #f4f5f6;
  width: 100%;
  min-height: 100%;
`;
const Content = styled.div`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const WrapTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 959.95px) {
    padding: 10px;
    text-align: center;
  }
`;
const Title = styled.span`
  font-size: 42px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  @media (max-width: 959.95px) {
    font-size: 18px;
    font-weight: 500;
  }
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
`;
const TextSub = styled.span``;
const TextNormal = styled.span`
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  @media (max-width: 959.95px) {
    font-size: 16px;
  }
`;
const TextBold = styled.span`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  @media (max-width: 959.95px) {
    font-size: 16px;
  }
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 921px;
  background-color: #ffffff;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: 1px solid #e0e0e0;
  margin-top: 11px;
  padding: ${(props: { isStep2: boolean }) =>
    props.isStep2 ? '20px' : '0px 260px 40px 260px'};
  @media (max-width: 959.95px) {
    width: 90%;
    padding: 14px;
    margin-bottom: 40px;
  }
`;
const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56',
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  infoIcon: {
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '90.5px',
      height: '26px',
    },
  },
  logo2: {
    display: 'block',
    [theme.breakpoints.down(420)]: {
      width: '90.5px',
      height: '26px',
    },
  },
}));

export {
  Container,
  Header,
  Content,
  Logo,
  WrapTitle,
  Title,
  SubTitle,
  TextSub,
  TextNormal,
  TextBold,
  MainContent,
  useStyles,
};
