import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
// import { FaAngleLeft } from 'react-icons/fa';

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 650px;
  padding: 32px 0 90px;
  @media (max-width: 955.95px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
`;
const HeaderWeb = styled.header`
  text-align: center;
  @media (max-width: 955.95px) {
    display: none;
  }
`;
const HeaderMobile = styled.header`
  display: none;
  text-align: center;
  @media (max-width: 955.95px) {
    display: flex;
    justify-content: space-between;
    padding: 13px 15px;
    backdrop-filter: blur(30px);
    background: #ffffff;
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
  @media (max-width: 955.95px) {
    width: 100%;
  }
`;
const LinkItem = styled.li`
  & > a {
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 300;
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
  & > ${LinkItem}:last-child {
    font-weight: 500;
    & > a {
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
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
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
