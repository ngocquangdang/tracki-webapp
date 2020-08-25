import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { Paper, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../TabPanel';
import SingleView from '../SingleView';
import TrackersSelected from '../MultiView/TrackersSelected';
import { useStyles } from './styles';
import HeatMap from '../HeatMap';
import { TAB_KEYS } from '@Containers/Tracking/store/constants';

interface Props {
  isMobile: boolean;
  trackers: object;
  settings: object;
  trackingIds: number[];
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  getHistoryTracker(data: object): void;
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function TabsPC(props: Props) {
  const {
    isMobile,
    trackers,
    trackingIds,
    settings,
    t,
    changeTrackingView,
    changeTrackersTracking,
    getHistoryTracker,
    refreshLocation,
  } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    changeTrackingView(TAB_KEYS[newValue]);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Tabs
          value={currentTab}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          {TAB_KEYS.map((key: string, index: number) => (
            <Tab
              key={key}
              label={t('tracker:' + key)}
              value={index}
              className={classes.tabItem}
            />
          ))}
        </Tabs>
      </Paper>
      {(currentTab === 0 || currentTab === 2) && (
        <SingleView
          t={t}
          settings={settings}
          isMobile={isMobile}
          trackers={trackers}
          trackingIds={trackingIds}
          currentTab={currentTab}
          changeTrackersTracking={changeTrackersTracking}
          refreshLocation={refreshLocation}
        />
      )}
      <TabPanel value={currentTab} index={1} className={classes.tabPanel}>
        <HeatMap
          t={t}
          isMobile={isMobile}
          trackers={trackers}
          trackingIds={trackingIds}
          settings={settings}
          changeTrackersTracking={changeTrackersTracking}
          getHistoryTracker={getHistoryTracker}
          currentTab={currentTab}
          refreshLocation={refreshLocation}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={3} className={classes.tabPanel}>
        <TrackersSelected
          trackers={trackers}
          trackingIds={trackingIds}
          isMobile={isMobile}
          t={t}
        />
      </TabPanel>
    </React.Fragment>
  );
}
