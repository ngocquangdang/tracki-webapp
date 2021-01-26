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
  fetchHistorySpeeds(data: object): void;
  fetchHistoryTrips(data: object): void;
  setPointSelected(point: object): void;
  selectedPoints: object;
  selectedPointIds: number[];
  historyStops: object;
  historyStopIds: object;
  historyLogs: object;
  historyLogIds: object;
  historySpeeds: object;
  historySpeedIds: object;
  trips: object;
  tripIds: number[];
  isFetchingHistorySpeed: boolean;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  isFetchingTrips: boolean;
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
