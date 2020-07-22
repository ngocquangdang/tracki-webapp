import React, { useState } from 'react';

import { SideBar } from '@Components/sidebars';
import Map from '@Components/Maps';
import SingleTracker from '@Containers/SingleTracker';
import MapToolBars from '@Components/Maps/components/MapToolBar';
import Tabs from '../Tabs';

import { Container, MapView } from './styles';

export default function TrackersContainer(props: any) {
  const { selectedTrackerId, onResetSelectedTrackerID, ...rest } = props;

  const [isOpenSidebar, setOpenSidebar] = useState(true);

  const handleChangee = () => setOpenSidebar(!isOpenSidebar);

  const handleClickBack = () => {
    onResetSelectedTrackerID();
    const obj = rest.trackers || {};
    const coords = Object.values(obj).filter(
      ({ lat, lng }: any) => !!lat && !!lng
    );
    coords.length > 0 && window.mapEvents.setFitBounds(coords);
  };

  return (
    <Container>
      <SideBar opened={isOpenSidebar} onChange={handleChangee}>
        {selectedTrackerId ? (
          <SingleTracker
            tracker={rest.trackers[selectedTrackerId]}
            onClickBack={handleClickBack}
            t={rest.t}
          />
        ) : (
          <Tabs {...rest} />
        )}
      </SideBar>
      <MapView fullWidth={!isOpenSidebar}>
        <Map mapType="mapbox" fullWidth={!isOpenSidebar} {...rest} />
        <MapToolBars t={rest.t} />
      </MapView>
    </Container>
  );
}
