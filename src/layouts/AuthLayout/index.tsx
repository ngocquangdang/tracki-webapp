import React from 'react';

import { Container, Row, Background, useStyles } from './styles';

export default function AuthLayout(props: any) {
  const classes = useStyles();
  return (
    <Container>
      <Row>
        <Background className={classes.media} />
        {props.children}
      </Row>
    </Container>
  );
}
