import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';

const MuiPhoneNumber = dynamic(() => import('material-ui-phone-number'));
// import MuiPhoneNumber from 'material-ui-phone-number'

const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 2;
    margin: auto;
    margin-right: 10px;
  }
  & > :nth-child(2) {
    flex: 3;
  }
`;

const PhoneNumberInput = withStyles(theme => ({
  root: {
    '.MuiFormControl-root  > .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
  },
}))(MuiPhoneNumber);

const useStyles = makeStyles(theme => ({
  height: {
    '& >  .MuiInputBase-root': {
      height: '50px',
      '& > .MuiMenu-paper': {
        maxHeight: '30%',
      },
    },
  },
}));
export { PhoneNumber, PhoneNumberInput, useStyles };
