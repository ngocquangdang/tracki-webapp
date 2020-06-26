import React from 'react';

import MainWrapper from './MainWrapper';
import Header from './Header';

export default function MainLayout(props: any) {
  return (
    <MainWrapper>
      <Header />
      {props.children}
    </MainWrapper>
  );
}
