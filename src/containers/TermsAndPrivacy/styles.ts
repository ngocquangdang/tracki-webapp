import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const Container = styled.div`
  background: #fafafa;
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const Header = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
  @media (max-width: 955.59px) {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.12);
  }
`;
const Wrapper = styled.div`
  padding-top: 66px;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;
const TopButton = styled.button`
  outline: none;
  position: fixed;
  background: #168449;
  bottom: 15px;
  right: 15px;
  border: 0;
  display: flex;
  color: #ffffff;
  padding: 16px;
  border-radius: 100px;
  text-decoration: none;
  cursor: pointer;
`;
const Paragraph = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  margin: 0;
  @media (max-width: 959.95px) {
    display: none;
  }
`;
const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56 !important',
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
      padding: 0,
      '& span svg': {
        width: 20,
        height: 20,
      },
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down(375)]: {
      height: 26,
      width: 90,
    },
  },
  arrow: {
    width: 18,
    height: 18,
  },
  border: {
    borderRadius: 0,
  },
  tabs: {
    height: 55,
    [theme.breakpoints.down('sm')]: {
      height: 45,
    },
  },
  tabItem: {
    fontSize: 18,
    lineHeight: '22px',
    height: 55,
    color: '#b7b7b7',
    minHeight: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: 45,
      fontSize: 14,
      lineHeight: '17px',
      color: '#999',
      width: '50%',
      maxWidth: '100%',
    },
  },
}));
const TabStyle = withStyles(theme => ({
  wrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      marginBottom: '0 !important',
      marginRight: '6px',
    },
  },
}))(Tab) as any;
export {
  Container,
  Logo,
  Header,
  Wrapper,
  Content,
  TopButton,
  Paragraph,
  TabStyle,
  useStyles,
};
