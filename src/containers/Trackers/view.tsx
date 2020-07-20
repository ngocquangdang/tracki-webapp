import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  isMobile?: boolean;
  [data: string]: any;
}

function View(props: Props) {
  const { isMobile, ...rest } = props;

  return (
    <MainLayout isMobile={isMobile}>
      {isMobile ? <ViewMobile {...rest} /> : <ViewPC {...rest} />}
    </MainLayout>
  );
}

export default View;
