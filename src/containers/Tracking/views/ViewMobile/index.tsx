import React from 'react';

import Map from '@Components/Maps';
import { Container, MapView } from './styles';

interface Props {
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  return (
    <Container>
      <MapView>
        <Map fullWidth={true} mapType="leaflet" {...props} />
      </MapView>
    </Container>
  );
}
