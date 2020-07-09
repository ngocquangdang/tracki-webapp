import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 650px;
  padding: 32px 0 90px;
  @media (max-width: 959.95px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
`;
const HeaderWeb = styled.header`
  text-align: center;
  @media (max-width: 959.95px) {
    display: none;
  }
`;
const HeaderMobile = styled.header`
  display: none;
  text-align: center;
  @media (max-width: 959.95px) {
    display: flex;
    justify-content: space-between;
    padding: 13px 15px;
    backdrop-filter: blur(30px);
    background: #ffffff;
  }
  @media (max-width: 375px) {
    height: 56px;
    padding: 0 15px;
  }
`;
const GroupTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  margin-left: 9px;
`;
const Content = styled.div`
  @media (max-width: 959.95px) {
    width: 100%;
  }
`;
const LinkItem = styled.li`
  & > a {
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 300;
    cursor: pointer;
  }
  &::after {
    content: '>';
    margin: 0 15px;
  }
`;
const NavLink = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 15px 0;
  cursor: pointer;
  & > ${LinkItem}:last-child {
    font-weight: 500;
    & > span {
      font-weight: 500;
    }
    &::after {
      content: none;
    }
  }
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const useStyles = makeStyles(theme => ({
  icon: {
    width: '31px',
    height: '31px',
    color: theme.palette.primary.main,
  },
  backBtn: {
    color: '#4b4f56',
    width: 'fit-content !important',
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
      margin: 'auto 0',
      padding: 0,
      '& span svg': {
        width: 20,
        height: 20,
      },
    },
  },
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down(375)]: {
      height: 26,
      width: 90,
    },
  },
}));
export {
  Container,
  HeaderWeb,
  GroupTitle,
  Title,
  Content,
  LinkItem,
  NavLink,
  Logo,
  HeaderMobile,
  useStyles,
};
