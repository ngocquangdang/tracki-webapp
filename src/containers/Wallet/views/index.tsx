import React from 'react';
import { MainLayout } from '@Layouts';

import Container from './walletContainer';

interface Props {
  isMobile?: boolean;
  [data: string]: any;
}

export default function Wallet(props: Props) {
  const { isMobile } = props;

  return (
    <MainLayout isMobile={isMobile} hasFooter={false}>
      <Container />
    </MainLayout>
  );
}
