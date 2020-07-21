import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Paper, Tabs } from '@material-ui/core';

import TabPanel from '@Components/sidebars/sidebar-pc/tabPanel';
import { TabStyle, useStyles } from './styles';

const TrackerList = dynamic(() => import('@Components/TrackerListPC'));
const GeofenceList = dynamic(() => import('@Components/GeofenceListPC'));

export default function TabsPC(props: any) {
  const {
    trackers,
    trackerIds,
    selectTrackerAction,
    searchTrackersRequest,
    geofences,
    geofenceIds,
    selectedGeofenceId,
    selectGeofenceIdAction,
  } = props;
  const classes = useStyles();
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
    const nextLink = window.location.pathname.includes('trackers')
      ? '/geofences'
      : '/trackers';
    window.history.pushState({}, '', nextLink);
  };

  useEffect(() => {
    const nextTab = window.location.pathname.includes('trackers') ? 0 : 1;
    setTab(nextTab);
  }, []);

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
          <TabStyle label="Trackers" key={1} className={classes.tabItem} />
          <TabStyle label="Geo-Fence" key={2} className={classes.tabItem} />
        </Tabs>
      </Paper>
      <TabPanel
        value={currentTab}
        index={0}
        placeholder="Search devices by name or ID"
        searchTrackersRequest={searchTrackersRequest}
      >
        <TrackerList
          trackers={trackers}
          trackerIds={trackerIds}
          onClickTracker={selectTrackerAction}
        />
      </TabPanel>
      <TabPanel
        value={currentTab}
        index={1}
        placeholder="Search geo-fences by name"
        searchTrackersRequest={searchTrackersRequest}
      >
        <GeofenceList
          geofences={geofences}
          geofenceIds={geofenceIds}
          selectedGeofenceId={selectedGeofenceId}
          selectGeofenceIdAction={selectGeofenceIdAction}
        />
      </TabPanel>
    </React.Fragment>
  );
}