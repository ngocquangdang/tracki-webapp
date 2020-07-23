import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Title = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const WrapTitle = styled.div`
  padding: 7px;
  @media (max-width: 959.95px) {
    padding: 3px;
  }
`;
const Content = styled.div`
  margin-top: 20px;
`;
const ButtonControl = styled.div`
  margin-top: 30px;
  @media (max-width: 959.95px) {
    margin-top: 10px;
  }
`;
const Cancel = styled.div`
  color: #999999;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  cursor: pointer;
  text-align: center;
  padding: 20px 0 0 5px;
  @media (max-width: 959.95px) {
    padding: 20px 0 16px 3px;
  }
`;
const Container = styled.div`
  width: 457px;
  height: 354px;
`;
const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(380)]: {
      whiteSpace: 'normal',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}));
export {
  Title,
  SubTitle,
  WrapTitle,
  Content,
  ButtonControl,
  Cancel,
  Container,
  useStyles,
};
