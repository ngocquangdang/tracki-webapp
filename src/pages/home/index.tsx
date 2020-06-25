import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 40
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <Container>
      <Button color="primary" className={classes.root}>Hello x!!</Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: #f2f2f2;
`;

export default Home;
