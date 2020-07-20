import React from 'react';
import Map from '@Components/Maps';

import { Container, MapView } from './styles';
import MapToolBarMobile from '@Components/Maps/components/MapToolBarMobile/TopToolbar';
import MapToolBarMobile2 from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';

export default function ViewHomeMobile(props: any) {
  const { trackers, trackerIds } = props;
  return (
    <Container>
      <MapView>
        <MapToolBarMobile />
        <Map
          fullWidth={true}
          mapType="mapbox"
          trackers={trackers}
          trackerIds={trackerIds}
        />
        <MapToolBarMobile2 />
      </MapView>
    </Container>
  );
}
