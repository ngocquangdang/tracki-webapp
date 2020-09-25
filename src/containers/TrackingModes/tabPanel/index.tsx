import React from 'react';

import { Container, Content } from './styles';

export default function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Content>{children}</Content>
        </Container>
      )}
    </div>
  );
}
