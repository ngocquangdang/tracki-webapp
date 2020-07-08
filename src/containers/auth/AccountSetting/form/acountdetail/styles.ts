import styled from 'styled-components';
import { withStyles, FormControl } from '@material-ui/core';

const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 959.95px) {
    flex-flow: wrap-reverse;
  }
`;
const Title = styled.p`
  margin-right: 40px;
`;
const Form = styled.div`
  @media (max-width: 959.95px) {
    padding: 7px 15px;
  }
`;

const SelectForm = withStyles(theme => ({
  root: {
    '&.MuiFormControl-root': {
      width: '100% !important',
    },
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #1a1a1a',
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 17px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '50px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(FormControl);
export { SelectGroup, Title, Form, SelectForm };
