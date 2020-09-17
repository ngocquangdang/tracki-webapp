import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  viewMode: string;
  isMobile: boolean;
  changeStoreView(mode: string): void;
  fetchDataProducts(data: object): void;
  fetchDataCoupons(data: object): void;
  coupons: object;
  couponIds: Array<number | string>;
  products: object;
  productIds: Array<number | string>;
  totalProducts: number;
  isLoading: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function View(props: Props) {
  if (props.isMobile) {
    return <ViewMobile />;
  }
  return (
    <MainLayout isMobile={props.isMobile}>
      <ViewPC {...props} />
    </MainLayout>
  );
}

export default View;
