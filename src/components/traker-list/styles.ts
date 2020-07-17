import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
const Container = styled.div``;
const Content = styled.div`
  color: #1a1a1a;
  box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.12);
`;
const Title = styled.span`
  font-weight: 500;
  display: ${(props: { isFullWidth: boolean }) =>
    props.isFullWidth ? 'none' : 'flex'};
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  color: #666666;
`;
const SearchInput = styled.input`
  width: ${(props: { isFullWidth: boolean }) =>
    props.isFullWidth ? '98%' : '42px'};
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  background-color: white;
  outline: none;
`;
const SearchBar = styled.div`
  display: flex;
  height: 34px;
  padding: 10px;
  justify-content: space-between;
  font-size: 12px;
  color: #1a1a1a;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
`;
const Search = styled.div`
  display: flex;
`;
const useStyles = makeStyles(theme => ({
  btn: {
    backgroundColor: '#f5f5f5',
    color: '#666666',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  iconSearch: {
    width: '15px',
    height: '15px',
    color: '#9a9a9a',
  },
  iconBack: {
    width: '15px',
    height: '15px',
    color: '#9a9a9a',
  },
}));
export {
  Container,
  Content,
  Footer,
  SearchInput,
  SearchBar,
  Search,
  Title,
  useStyles,
};
