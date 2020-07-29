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
`;
const ContainerLetter = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  margin: 15px 0;
`;
const HeaderLetter = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const useStyles = makeStyles(theme => ({
  icon: {
    width: 126.5,
    height: 126.5,
  },
  widthBtn: {
    width: 400,
  },
  text: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));

export { FormInfo, useStyles, FooterLetter, ContainerLetter, HeaderLetter };
