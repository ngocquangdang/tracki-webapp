import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackingIds: number[];
  trackers: object;
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  onResetSelectedTrackerID(): void;
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
