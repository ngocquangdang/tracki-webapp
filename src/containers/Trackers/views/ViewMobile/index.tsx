import React from 'react';
import Map from '@Components/Maps';

import { Container, ContentCardDetail, MapView } from './styles';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';

interface Props {
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  const { ...rest } = props;
  return (
    <Container>
      <MapView>
        {rest.selectedTrackerId && <TopToolBar />}

        <Map fullWidth={true} mapType="mapbox" {...rest} />
        {rest.selectedTrackerId && (
          <BottomToolBar
            t={rest.t}
            tracker={rest.trackers[rest.selectedTrackerId]}
          />
        )}
        {rest.selectedTrackerId && (
          <ContentCardDetail>
            <DetailTrackerCard
              tracker={rest.trackers[rest.selectedTrackerId]}
              isMobile={true}
            />
          </ContentCardDetail>
        )}
      </MapView>
    </Container>
  );
}
