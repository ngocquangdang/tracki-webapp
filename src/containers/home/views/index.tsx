import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import SideBar from '@Components/sidebars';
import Map from '@Containers/Map';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

import TabPanel from '@Components/sidebars/tabPanel';

import { Container, TabStyle, MapView, useStyles } from './styles';

const ListDevice = dynamic(() => import('../trackers/views'));
const ListGeoFence = dynamic(() => import('../geofence'));

export default function HomeContainer(props: any) {
  const { trackers, trackerIds, isRequesting } = props;
  const classes = useStyles();
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleChangee = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee}>
        <Paper className={classes.border}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.heightTab}
          >
            <TabStyle label="Trackers" key={1} />
            <TabStyle label="Geo-Fence" key={2} />
          </Tabs>
        </Paper>
        <TabPanel
          value={value}
          index={0}
          placeholder="Search devices by name or ID"
        >
          <ListDevice
            isLoading={isRequesting}
            trackers={trackers || []}
            trackerIds={trackerIds || []}
          />
        </TabPanel>
        <TabPanel
          value={value}
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
        <Map fullWidth={!isOpenSidebar} />
      </MapView>
    </Container>
  );
}
