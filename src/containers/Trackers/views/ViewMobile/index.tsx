import React from 'react';
import Map from '@Components/Maps';

import { Container, MapView } from './styles';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';

export default function ViewHomeMobile(props: any) {
  const { selectedTrackerId, ...rest } = props;
  return (
    <Container>
      <MapView>
        {selectedTrackerId && <TopToolBar />}
        <Map fullWidth={true} mapType="mapbox" {...rest} />
        {selectedTrackerId && <BottomToolBar />}
      </MapView>
    </Container>
  );
}
