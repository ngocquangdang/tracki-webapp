import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  margin-top: 60px;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  margin-bottom: 15px;
`;
const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 18px;
`;

const Content = styled.form``;

const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    color: '#fff',
    top: 22,
    left: 22,
  },
  fontSize: {
    [theme.breakpoints.down(375)]: {
      fontSize: 15,
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
}));

export { Container, SelectGroup, Content, Title, useStyles };
