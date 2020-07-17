import React from 'react';
import Map from '@Components/Maps';

import { Container, MapView } from './styles';
import MapToolBarMobile from '@Components/Maps/components/MapToolBarMobile';

export default function ViewHomeMobile(props: any) {
  return (
    <Container>
      <MapView>
        <Map fullWidth={true} mapType="mapbox" />
        <MapToolBarMobile />
      </MapView>
    </Container>
  );
}
