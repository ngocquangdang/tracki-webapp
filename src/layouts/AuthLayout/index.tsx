import React from 'react';

import {
  Container,
  Row,
  Background,
  Layout,
  Description,
  Content,
  Logo,
  Title,
  SubLogo,
  useStyles,
} from './styles';

export default function AuthLayout(props: any) {
  const classes = useStyles();
  return (
    <Container>
      <Row>
        <Background className={classes.media}>
          <Layout></Layout>
          <Description>
            <Logo src="images/logo-white.png" alt="" />
            <Title>3G Real-Time Worldwide GPS Tracker</Title>
            <SubLogo>
              There is no easier way to track people, cars or property in real
              time.
            </SubLogo>
          </Description>
        </Background>
        <Content>{props.children}</Content>
      </Row>
    </Container>
  );
}
