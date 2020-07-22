import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  [data: string]: any;
}

function View(props: Props) {
  const { ...rest } = props;

  return (
    <MainLayout isMobile={rest.isMobile}>
      {rest.isMobile ? <ViewMobile {...rest} /> : <ViewPC {...rest} />}
    </MainLayout>
  );
}

export default View;
