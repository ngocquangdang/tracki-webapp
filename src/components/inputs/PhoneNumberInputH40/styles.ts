import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import { TextInput } from '../index';

const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    margin: auto;
    width: 143px;
    & > .form-control {
      height: 40px;
    }
    @media (max-width: 959.95px) {
      width: 120px;
      margin: auto 10px;
      & > .form-control {
        height: 45px;
        width: 120px !important;
        padding: 18.5px 14px 18.5px 50px;
      }
      & > .flag-dropdown .selected-flag .arrow {
        left: 80px;
      }
    }
    @media (max-width: 374.95px) {
      width: 223px;
      margin: 10px;
      & > .form-control {
        height: 45px;
        width: 223px !important;
        padding: 18.5px 14px 18.5px 50px;
      }
      & > .flag-dropdown .selected-flag .arrow {
        left: 185px;
      }
      & .country-list {
        left: -75px;
      }
      & > .flag-dropdown .selected-flag {
        width: 223px;
      }
    }
  }
  & > :nth-child(2) {
    height: 40px;
    margin: auto 10px;
    @media (max-width: 959.95px) {
      height: 45px;
      width: 140px;
      margin: 0;
    }
    @media (max-width: 374.95px) {
      margin: 10px;
      height: 45px;
      width: 223px;
    }
  }
  @media (max-width: 995.95px) {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
  @media (max-width: 374.95px) {
    display: flex;
    flex-direction: column;
  }
`;

const TextInputStyle = withStyles(theme => ({
  root: {
    height: 40,
    width: 223,
    '& .MuiInputBase-root': {
      height: '40px',
      color: '#1a1a1a',
      [theme.breakpoints.down('sm')]: {
        height: '45px',
      },
      [theme.breakpoints.down(374.95)]: {
        height: '45px',
      },
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
      [theme.breakpoints.down('sm')]: {
        top: '39px',
      },
      [theme.breakpoints.down(374.95)]: {
        top: '39px',
      },
    },
    '& .MuiOutlinedInput-input': {
      height: 45,
      padding: '10.5px 14px',
    },
    [theme.breakpoints.down(374.95)]: {
      height: 45,
      margin: 'auto 10px',
    },
  },
}))(TextInput) as any;
export { PhoneNumber, TextInputStyle };
