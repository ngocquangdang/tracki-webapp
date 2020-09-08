import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  isMobile: boolean;
  viewMode: string;
  changeStoreView(mode: string): void;
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
