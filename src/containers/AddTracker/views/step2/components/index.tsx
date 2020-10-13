import React from 'react';

import { Header, Icon, Title, SubTitle, Container, Footer } from './styles';

interface Props {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
  children?: JSX.Element;
  footerProps?: JSX.Element | string;
}
export default function LayoutConfirm(props: Props) {
  const { icon, title, subtitle, children, footerProps } = props;
  return (
    <>
      <Header>
        <Icon>{icon}</Icon>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </Header>
      <Container>{children}</Container>
      <Footer>{footerProps}</Footer>
    </>
  );
}
