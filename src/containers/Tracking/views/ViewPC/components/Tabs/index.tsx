import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { Paper, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../TabPanel';
import SingleView from '../SingleView';
import TrackersSelected from '../MultiView/TrackersSelected';
import { useStyles } from './styles';
import HeatMap from '../HeatMap';

interface Props {
  isMobile: boolean;
  trackers: object;
  trackingIds: number[];
  changeTrackingView(mode: string): void;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  [data: string]: any;
  getHistoryTracker(data: object): void;
}

const TAB_KEYS = ['single_view', 'heat_map', 'multi_view', 'multi_screen'];

export default function TabsPC(props: Props) {
  const {
    isMobile,
    trackers,
    trackingIds,
    t,
    changeTrackingView,
    changeTrackersTracking,
    getHistoryTracker,
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
          isMobile={isMobile}
          trackers={trackers}
          trackingIds={trackingIds}
          currentTab={currentTab}
          changeTrackersTracking={changeTrackersTracking}
        />
      )}
      <TabPanel value={currentTab} index={1} className={classes.tabPanel}>
        <HeatMap
          t={t}
          isMobile={isMobile}
          trackers={trackers}
          trackingIds={trackingIds}
          changeTrackersTracking={changeTrackersTracking}
          getHistoryTracker={getHistoryTracker}
          currentTab={currentTab}
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
