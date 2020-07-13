import React from 'react';
import MainWrapper from './MainWrapper';
import Header from './Header';
import { Content } from './style';

export default function MainLayout(props: any) {
  return (
    <MainWrapper>
      <Header />
      <Content>{props.children}</Content>
    </MainWrapper>
  );
}
