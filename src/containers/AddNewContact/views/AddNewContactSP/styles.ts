import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Type = styled.div`
  margin: 0 0 15px;
`;
const Container = styled.div`
  margin-top: 56px;
  padding: 20px 15px;
  color: #1a1a1a;
  font-size: 15px;
`;
const Typography = styled.span`
  font-size: 13px;
`;
const useStyles = makeStyles(theme => ({
  fontSize: {
    fontSize: 15,
  },
}));
export { Type, Container, Typography, useStyles };
