import React from 'react';

import Map from '@Components/Maps';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';
import { Container, ContentCardDetail, MapView } from './styles';

interface Props {
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  return (
    <Container>
      <MapView>
        {props.selectedTrackerId && <TopToolBar />}

        <Map fullWidth={true} mapType="leaflet" {...props} />
        {props.selectedTrackerId && (
          <BottomToolBar
            t={props.t}
            tracker={props.trackers[props.selectedTrackerId]}
            isBeep={props.isBeep}
            resetBeep={props.resetBeep}
            onClickSendBeep={props.onClickSendBeep}
            showSnackbar={props.showSnackbar}
          />
        )}
        {props.selectedTrackerId && (
          <ContentCardDetail>
            <DetailTrackerCard
              tracker={props.trackers[props.selectedTrackerId]}
              isMobile={true}
              t={props.t}
            />
          </ContentCardDetail>
        )}
      </MapView>
    </Container>
  );
}
