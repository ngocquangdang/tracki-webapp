import React from 'react';

import { ViewPC, ViewMobile } from './views';
import { MainLayout } from '@Layouts';

interface Props {
  isMobile: boolean;
  trackers: object;
  trackerIds: number[];
  notificationIds: number[];
  notifications: object;
  viewMode: string;
  changeReportView(mode: string): void;
  profile: any;
  fetchNotificationUnread(query: string): void;
  fetchHistoryStop(data: object): void;
  fetchHistoryLogs(data: object): void;
  historyStops: object;
  historyStopIds: object;
  historyLogs: object;
  historyLogIds: object;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function View(props: Props) {
  if (props.isMobile) {
    return <ViewMobile {...props} />;
  }
  return (
    <MainLayout isMobile={props.isMobile}>
      <ViewPC {...props} />
    </MainLayout>
  );
}

export default View;
