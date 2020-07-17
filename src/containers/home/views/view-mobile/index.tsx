import React from 'react';
import Map from '@Components/Maps';

import { Container, MapView } from './styles';

export default function ViewHomeMobile(props: any) {
  const { trackers, trackerIds } = props;
  return (
    <Container>
      <MapView>
        <Map
          fullWidth={true}
          mapType="mapbox"
          trackers={trackers}
          trackerIds={trackerIds}
        />
      </MapView>
    </Container>
  );
}
