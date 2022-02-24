import { makeStyles, withStyles, TextField } from '@material-ui/core';
import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';

const ContactContainer = styled.div`
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  margin: 28px 26px;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: 50px;
  height: 50px;
  color: #999999;
  background: #e6e5e9;
`;
const HeaderContact = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 28px 26px;
`;
const LogoContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IconContact = styled.div`
  margin-right: 8px;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 300;
  margin: 0;
`;
const ActionContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchInput = styled.div``;
const AddButton = styled.div``;

const PaginationStyle = withStyles(theme => ({
  root: {
    paddingRight: 30,
    '&:last-child': {
      height: '100%',
      border: 0,
    },
  },
  caption: {
    fontSize: 17,
    fontWeight: 300,
  },
  selectRoot: {
    borderBottom: '1px solid',
  },
  select: {
    padding: 0,
    paddingRight: 35,
  },
  selectIcon: {
    right: '-5px',
    color: '#1a1a1a',
  },
}))(TablePagination) as any;

const TextInput = withStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
      textAlign: 'start',
    },
  },
}))(TextField);

const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 17,
    color: '#1a1a1a',
    padding: 8,
  },
  iconHeader: {
    width: 27,
    height: 32,
    color: '#168449',
  },
  flex: {
    display: 'flex',
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  icon: {
    width: 30,
    height: 50,
  },
  iconBtn: {
    width: 16,
    height: 16,
  },
  col1: {
    flex: 0.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2: {
    flex: 0.6,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  col3: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
  },
  col4: {
    flex: 0.35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    display: 'flex',
    alignItem: 'center',
    height: 94,
  },
  colorText: {
    color: '#1a1a1a',
  },
  btn: {
    width: 228,
  },
  search: {
    width: 348,
    marginRight: 10,
  },
  col2Edit: {
    flex: 3.95,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  iconEdit: {
    color: '#ffffff',
    background: '#168449',
  },
  iconSearch: {
    color: '#999999',
  },
}));

export {
  useStyles,
  ContactContainer,
  Icon,
  PaginationStyle,
  TextInput,
  IconContact,
  LogoContact,
  ActionContact,
  HeaderContact,
  Title,
  SearchInput,
  AddButton,
};
