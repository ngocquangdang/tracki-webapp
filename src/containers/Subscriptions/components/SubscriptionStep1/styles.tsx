import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const TextBold = styled.span`
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  margin-bottom: ${(props: { isChoose: boolean }) =>
    props.isChoose ? '0px' : '10px'};
  margin-top: ${(props: { isChoose: boolean }) =>
    props.isChoose ? '50px' : '20px'};
  @media (max-width: 959.95px) {
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    padding: 0 10px;
  }
`;
const SelectMessage = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const MessageItem = styled.div`
  width: 152px;
  border-radius: 4px;
  background-color: #168449;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin: 5px;
  cursor: pointer;
  @media (max-width: 995.95px) {
    margin: 0;
    margin-bottom: 11px;
  }
`;
const ContentMessageItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 995.95px) {
    justify-content: space-between;
  }
`;
const TypeMessage = styled.span`
  font-size: 23px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;
const Price = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: '#1a1a1a',
  },
  select: {
    color: '#1a1a1a',
  },
  menuItem: {
    color: '#1a1a1a',
  },
  circular: {
    color: '#f2f2f2',
  },
}));

const SelectForm = withStyles(theme => ({
  root: {
    '&.MuiFormControl-root': {
      width: '100%',
      margin: '18px 0',
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

export {
  TextBold,
  SelectForm,
  SelectMessage,
  MessageItem,
  TypeMessage,
  Date,
  Price,
  ContentMessageItem,
  useStyles,
};
