import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { Paper, Tabs, Tab } from '@material-ui/core';

import TabPanel from '../TabPanel';
import SingleView from '../SingleView';
import { useStyles } from './styles';

interface Props {
  isMobile: boolean;
  trackers: object;
  trackingIds: number[];
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

const TAB_KEYS = ['single_view', 'heat_map', 'multi_view', 'multi_screen'];

export default function TabsPC(props: Props) {
  const { isMobile, trackers, trackingIds, t, changeTrackersTracking } = props;

  const classes = useStyles();
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
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
      <TabPanel value={currentTab} index={0} className={classes.tabPanel}>
        <SingleView
          t={t}
          isMobile={isMobile}
          trackers={trackers}
          trackingIds={trackingIds}
          changeTrackersTracking={changeTrackersTracking}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1} className={classes.tabPanel}>
        Comming soon...
      </TabPanel>
      <TabPanel value={currentTab} index={2} className={classes.tabPanel}>
        Comming soon...
      </TabPanel>
      <TabPanel value={currentTab} index={3} className={classes.tabPanel}>
        Comming soon...
      </TabPanel>
    </React.Fragment>
  );
}
