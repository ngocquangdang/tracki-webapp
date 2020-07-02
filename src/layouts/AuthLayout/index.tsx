import React from 'react';

import { Container, Row, Background, Content, useStyles } from './styles';

export default function AuthLayout(props: any) {
  const classes = useStyles();
  return (
    <Container>
      <Row>
        <Background className={classes.media} />
        <Content>{props.children}</Content>
      </Row>
    </Container>
  );
}
