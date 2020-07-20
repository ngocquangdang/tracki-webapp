import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const BreadCrumbContainer = styled.header`
  text-align: center;
  background-color: #fafafa;
  @media (max-width: 959.95px) {
    display: none;
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
const useStyles = makeStyles(theme => ({
  icon: {
    width: '31px',
    height: '31px',
    color: theme.palette.primary.main,
  },
}));
export { BreadCrumbContainer, GroupTitle, Title, LinkItem, NavLink, useStyles };
