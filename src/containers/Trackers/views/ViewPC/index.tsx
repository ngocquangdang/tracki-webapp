import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { SideBar } from '@Components/sidebars';
import Map from '@Components/Maps';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

import TabPanel from '@Components/sidebars/sidebar-pc/tabPanel';

import { Container, TabStyle, MapView, useStyles } from './styles';
import SingleTracker from '@Components/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';

const TrackerList = dynamic(() => import('@Components/TrackerListPC'));
const GeofenceList = dynamic(() => import('@Components/GeofenceListPC'));

export default function HomeContainer(props: any) {
  const {
    t,
    trackers,
    trackerIds,
    isRequesting,
    selectedTrackerId,
    selectTrackerAction,
    onResetSelectedTrackerID,
    searchTrackersRequest,
  } = props;
  const classes = useStyles();
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
  };
  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };
  const handleClickBack = () => {
    onResetSelectedTrackerID();
    const coords = Object.values(trackers).map(({ lat, lng }: any) => ({
      lat,
      lng,
    }));
    window.mapEvents.setFitBounds(coords);
  };
  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee}>
        {selectedTrackerId ? (
          <SingleTracker
            tracker={trackers[selectedTrackerId]}
            onClickBack={handleClickBack}
          />
        ) : (
          <>
            <Paper className={classes.border}>
              <Tabs
                value={currentTab}
                onChange={onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
                className={classes.heightTab}
              >
                <TabStyle
                  label="Trackers"
                  key={1}
                  className={classes.tabItem}
                />
                <TabStyle
                  label="Geo-Fence"
                  key={2}
                  className={classes.tabItem}
                />
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
                isLoading={isRequesting}
                geo_fence={trackers?.geo_fence || []}
                deviceIds={trackerIds || []}
              />
            </TabPanel>{' '}
          </>
        )}
      </SideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map
          mapType="mapbox"
          fullWidth={!isOpenSidebar}
          trackers={trackers}
          trackerIds={trackerIds}
        />
        <MapToolBars t={t} />
      </MapView>
    </Container>
  );
}
