import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import { TextInput } from '../index';

const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 2;
    margin: auto;
    @media (max-width: 959.95px) {
      flex: 1;
    }
    & > .form-control {
      height: 40px;
    }
  }
  & > :nth-child(2) {
    flex: 3;
    height: 40px;
    @media (max-width: 959.95px) {
      flex: 5;
    }
  }
`;

const TextInputStyle = withStyles(theme => ({
  root: {
    height: 40,
    width: 242,
    marginRight: 10,
    '& .MuiInputBase-root': {
      height: '40px',
      color: '#1a1a1a',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 10px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '34px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
  },
}))(TextInput);
export { PhoneNumber, TextInputStyle };
