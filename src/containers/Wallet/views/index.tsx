import React from 'react';
import { MainLayout } from '@Layouts';

import Container from './walletContainer';
import WalletHeader from '../components/HeaderSP';

interface Props {
  isMobile?: boolean;
  t(key: string, format?: object): string;
  pointHistory: {
    isRequestPointHistory: boolean;
    pointHistories: object;
    pointHistoryIds: number[];
  };
  setHiddenHeader: (type: string) => void;
  setViewPage: (page: string) => void;
  [data: string]: any;
}

export default function Wallet(props: Props) {
  const { isMobile, ...rest } = props;

  return (
    <MainLayout isMobile={isMobile} header={<WalletHeader />} hasFooter={false}>
      <Container {...rest} isMobile={isMobile} />
    </MainLayout>
  );
}
