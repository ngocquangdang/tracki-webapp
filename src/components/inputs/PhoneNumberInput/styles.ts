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
    '& .MuiPopover-root': {
      '& > .MuiMenu-paper': {
        color: '#1a1a1a',
      },
    },
  },
}))(MuiPhoneNumber);

const useStyles = makeStyles(theme => ({
  color: {
    color: '#1a1a1a',
  }
}))
export { PhoneNumber, PhoneNumberInput, useStyles };
