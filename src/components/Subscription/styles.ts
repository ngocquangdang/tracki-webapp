import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Title = styled.span`
  font-size: 18px;
  font-weight: 300;
  line-height: 22px;
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
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
  width: 457px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const ButtonControl = styled.div`
  margin-top: 30px;
  @media (max-width: 959.95px) {
    margin-top: 20px;
  }
`;
const useStyles = makeStyles(theme => ({
  btn: {
    fontSize: 16,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(380)]: {
      whiteSpace: 'normal',
    },
    '&:first-child': {
      marginBottom: 10,
    },
  },
}));
export { Title, SubTitle, WrapTitle, Content, ButtonControl, useStyles };
