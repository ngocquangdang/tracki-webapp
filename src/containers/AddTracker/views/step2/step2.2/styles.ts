import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const FormInfo = styled.div`
  padding: 40px;
`;
const FooterLetter = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
`;
const ContainerLetter = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  margin: 15px 0;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
`;
const HeaderLetter = styled.div`
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 995.95px) {
    font-size: 16px;
  }
`;

const useStyles = makeStyles(theme => ({
  icon: {
    width: 126.5,
    height: 126.5,
    [theme.breakpoints.down('sm')]: {
      width: 106,
      height: 106,
    },
  },
  widthBtn: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 349,
    },
  },
  text: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));

export { FormInfo, useStyles, FooterLetter, ContainerLetter, HeaderLetter };
