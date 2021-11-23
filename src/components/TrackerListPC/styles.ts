import styled from 'styled-components';
import { TextField, withStyles, makeStyles } from '@material-ui/core';

const Container = styled.div``;
const Content = styled.div``;
const Footer = styled.div`
  display: flex;
  align-items: center;
  color: #666666;
`;
const SearchInput = styled.div``;
const ListItem = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid #f5f5f5;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  padding: 6px;
  background: #168449;
  border-radius: 100px;
  object-fit: contain;
  margin-right: 16px;
`;
const ItemInfo = styled.div``;
const Name = styled.p`
  margin: 4px 0;
  font-size: 14px;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b7b7b7;
`;
const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 8px 0;
  font-size: 16px;
  border-bottom: 1px solid #e0e0e0;
  color: #666666;
  font-weight: 400;
  line-height: 19px;
`;
const CardDetail = styled.div``;
const TimeActive = styled.span`
  font-size: 12px;
  color: #b7b7b7;
`;
const useStyles = makeStyles(theme => ({
  input: {
    '&::placeholder': {
      textAlign: 'center',
    },
  },
  btn: {
    backgroundColor: '#f5f5f5',
    margin: '1rem 0',
    color: '#666666',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));
const TextInput = withStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(TextField);
export {
  Container,
  Content,
  Footer,
  SearchInput,
  TextInput,
  ListItem,
  Card,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  CardDetail,
  TimeActive,
  useStyles,
  Message,
};
