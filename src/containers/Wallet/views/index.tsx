import React from 'react';
import { MainLayout } from '@Layouts';

import Container from './walletContainer';

interface Props {
  isMobile?: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function Wallet(props: Props) {
  const { isMobile, ...rest } = props;

  return (
    <MainLayout isMobile={isMobile} hasFooter={false}>
      <Container {...rest} />
    </MainLayout>
  );
}
