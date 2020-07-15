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
  border: solid 1px var(--e-0-e-0-e-0-border-color);
  background-color: #ffffff;
  @media (max-width: 959.95px) {
    margin: auto;
  }
`;
const TopButton = styled.button`
  outline: none;
  position: fixed;
  background: #168449;
  top: 85%;
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
}));
const TabStyle = withStyles(theme => ({
  wrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      marginBottom: '0 !important',
      marginRight: '6px',
    },
  },
}))(Tab);
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
