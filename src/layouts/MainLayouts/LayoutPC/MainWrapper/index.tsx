import React from 'react';

import { Container } from './styles';

export default function MainWrapper(props: any) {
  return <Container>{props.children}</Container>;
}
