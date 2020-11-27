import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Router from 'next/router';

//components
import SideBarOutside from '@Components/sidebars/SideBarOutside';
import { TAB_KEYS } from '@Containers/Reports/store/constants';
import OverviewReportMobile from './components/Overview';
import HistoryReportMobile from './components/History';
import ReportStopsMobile from './components/Stops';
import ReportSpeedMobile from './components/Speed';

//styles
import { useStyles } from './styles';
interface Props {
  isMobile: boolean;
  trackers: object;
  trackerIds: number[];
  notificationIds: number[];
  notifications: object;
  viewMode: string;
  changeReportView(mode: string): void;
  fetchNotificationUnread(query: string): void;
  fetchHistoryStop(data: object): void;
  fetchHistoryLogs(data: object): void;
  fetchHistorySpeeds(data: object): void;
  historyStops: object;
  historyStopIds: object;
  profile: any;
  historyLogs: object;
  historyLogIds: object;
  historySpeeds: object;
  historySpeedIds: object;
  isFetchingHistorySpeed: boolean;
  isFetchingHistoryLogs: boolean;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function ReportViewMobile(props: Props) {
  const classes = useStyles();
  const { viewMode, changeReportView } = props;

  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeReportView(TAB_KEYS[newValue]);
  };

  return (
    <SideBarOutside
      title={`Reports - ${viewMode}`}
      show={true}
      direction="right"
      handleClose={Router.back}
      isMobile={true}
      isNotSave={true}
    >
      <div className={classes.container}>
        <div>
          {viewMode === 'overview' && <OverviewReportMobile {...props} />}
          {viewMode === 'history' && <HistoryReportMobile {...props} />}
          {viewMode === 'stop' && <ReportStopsMobile {...props} />}
          {viewMode === 'speed' && <ReportSpeedMobile {...props} />}
        </div>
        <div className={classes.footer}>
          <Tabs
            value={currentTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            TabIndicatorProps={{ className: classes.indicator }}
            className={classes.tabs}
          >
            {TAB_KEYS.map((key: string, index: number) => (
              <Tab
                key={key}
                label={key}
                value={index}
                className={classes.tabItem}
              />
            ))}
          </Tabs>
        </div>
      </div>
    </SideBarOutside>
  );
}

export default ReportViewMobile;
