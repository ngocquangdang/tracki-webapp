import React from 'react';

import { Container, Content, Title } from './styles';

export default function TabPanel(props: any) {
  const { children, value, index, title, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Title>{title}</Title>
          <Content>{children}</Content>
        </Container>
      )}
    </div>
  );
}
