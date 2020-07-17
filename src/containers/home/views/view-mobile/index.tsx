import React from 'react';
import Map from '@Containers/Map';

import { Container, MapView } from './styles';

export default function ViewHomeMobile(props: any) {
  return (
    <Container>
      <MapView>
        <Map fullWidth={true} />
      </MapView>
    </Container>
  );
}
