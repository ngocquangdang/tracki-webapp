import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  [data: string]: any;
}

function View(props: Props) {
  return (
    <MainLayout isMobile={props.isMobile}>
      {props.isMobile ? <ViewMobile {...props} /> : <ViewPC {...props} />}
    </MainLayout>
  );
}

export default View;
