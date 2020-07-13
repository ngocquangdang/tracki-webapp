import React from 'react';
import MainWrapper from './MainWrapper';
import HeaderMobile from './Header';
import { Content } from './styles';
import MenuMobile from './MenuMobile';

function MainLayoutMobile(props: any) {
  return (
    <MainWrapper>
      <HeaderMobile />
      <Content>{props.children}</Content>
      <MenuMobile />
    </MainWrapper>
  );
}

export default MainLayoutMobile;
