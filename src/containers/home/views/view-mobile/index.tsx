import React from 'react';
import Map from '@Components/Maps';

import { Container, MapView } from './styles';

export default function ViewHomeMobile(props: any) {
  return (
    <Container>
      <MapView>
        <Map fullWidth={true} mapType="mapbox" />
      </MapView>
    </Container>
  );
}
