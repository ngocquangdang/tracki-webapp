import styled from 'styled-components';
import { makeStyles, withStyles, TextField } from '@material-ui/core';

const ContainerPage = styled.div`
  @media (max-width: 995.95px) {
    margin-top: 56px;
  }
`;

const ContactCard = styled.div`
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #e6e5e9;
`;

const ContactName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Address = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #999999;
`;

const ContactOption = styled.div``;

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

const WrappIcon = styled.div`
  width: 50px;
  margin-right: 10px;
`;

const WrappContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SelectCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e5e9;
`;
const SearchInput = styled.div``;

const useStyles = makeStyles(theme => ({
  iconOption: {
    padding: 0,
  },
  iconAddress: {
    width: 30,
    height: 50,
  },
  colorOption: {
    color: '#666666',
  },
  colorIconEdit: {
    color: '#1a1a1a',
  },
  bgIconEdit: {
    background: '#168449',
  },
  color: {
    color: '#999999',
    width: 16.6,
    height: 16.6,
  },
  input: {
    '&::placeholder': {
      fontSize: 14,
    },
  },
}));

const TextInput = withStyles(theme => ({
  root: {
    width: '100%',
    height: 60,
    borderBottom: '1px solid #e5e6e9',
    '&::placeholder': {
      fontSize: 14,
    },
    '& .MuiInputBase-root': {
      color: '#666666',
      height: '100%',
      padding: '0 15px',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 0',
      fontSize: 15,
    },
    '& .MuiInput-underline:before': {
      border: 0,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 0,
    },
  },
}))(TextField) as any;
export {
  ContainerPage,
  ContactCard,
  Icon,
  ContactName,
  Name,
  Address,
  ContactOption,
  WrappIcon,
  useStyles,
  WrappContent,
  SelectCard,
  TextInput,
  SearchInput,
};
