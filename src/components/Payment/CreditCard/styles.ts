import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div``;
const HeaderCredit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;
const RightHeader = styled.div``;
const ImageCredit = styled.img`
  width: 229px;
  height: 25px;
  object-fit: contain;
  @media (max-width: 959.95px) {
    width: 163px;
    height: 18px;
  }
`;
const Text = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  padding-left: 9px;
  @media (max-width: 959.95px) {
    font-size: 16px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px;
  flex-wrap: wrap;
`;
const TextInputLineUp = styled.div`
  display: flex;
  @media (max-width: 959.95px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const useStyles = makeStyles(theme => ({
  iconCredit: {
    color: '#484d56',
    fontSize: '32px',
  },
  container: {},
  textInput: {
    width: '38%',
    marginRight: '10px',
    maxWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      marginRight: '0px',
    },
  },
  textInputName: {
    width: '38%',
    marginRight: '10px',
    maxWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  textInputDate: {
    width: '38%',
    marginRight: '10px',
    maxWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      width: '48%',
    },
  },
  inputCv2: {
    width: '20%',
    maxWidth: '271px',
    [theme.breakpoints.down('sm')]: {
      width: '48%',
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    margin: '1rem 0',
    width: '36%',
    color: theme.palette.primary.contrastText,
    fontWeight: 'normal',
    fontSize: '18px',
    marginBottom: 16,
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      fontSize: '16px',
    },
  },
  questionIcon: {
    fontSize: '33px',
    color: '#1a1a1a',
  },
}));

export {
  Container,
  HeaderCredit,
  Text,
  LeftHeader,
  RightHeader,
  ImageCredit,
  Form,
  TextInputLineUp,
  useStyles,
};
