import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { SideBar } from '@Components/sidebars';
import Map from '@Components/Maps';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

import TabPanel from '@Components/sidebars/sidebar-pc/tabPanel';

import { Container, TabStyle, MapView, useStyles } from './styles';

const ListDevice = dynamic(() => import('../../trackers'));
const ListGeoFence = dynamic(() => import('../../geofence'));

export default function HomeContainer(props: any) {
  const { trackers, trackerIds, isRequesting } = props;
  const classes = useStyles();
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const [currentTab, setTab] = useState(0);

  const onChangeTab = (event: any, newValue: any) => {
    setTab(newValue);
  };
  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee}>
        <Paper className={classes.border}>
          <Tabs
            value={currentTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.heightTab}
          >
            <TabStyle label="Trackers" key={1} className={classes.tabItem} />
            <TabStyle label="Geo-Fence" key={2} className={classes.tabItem} />
          </Tabs>
        </Paper>
        <TabPanel
          value={currentTab}
          index={0}
          placeholder="Search devices by name or ID"
        >
          <ListDevice trackers={trackers} trackerIds={trackerIds} />
        </TabPanel>
        <TabPanel
          value={currentTab}
          index={1}
          placeholder="Search geo-fences by name"
        >
          <ListGeoFence
            isLoading={isRequesting}
            geo_fence={trackers?.geo_fence || []}
            deviceIds={trackerIds || []}
          />
        </TabPanel>
      </SideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map
          mapType="mapbox"
          fullWidth={!isOpenSidebar}
          trackers={trackers}
          trackerIds={trackerIds}
        />
      </MapView>
    </Container>
  );
}
