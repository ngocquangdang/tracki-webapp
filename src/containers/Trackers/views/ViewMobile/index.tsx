import React from 'react';

import Map from '@Components/Maps';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';

import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';
import HistoryTracker from '@Containers/SingleTracker/components/HistoryTracker';
import ShareLocation from '@Containers/SingleTracker/components/ShareLocation';
import TrackerGeofences from './TrackerGeofences';

import { Container, ContentCardDetail, MapView } from './styles';

interface Props {
  getHistoryTracker(data: object): void;
  t(key: string, format?: object): string;
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  const [currentView, setCurrentView] = React.useState('');
  const {
    trackers,
    selectedTrackerId,
    getHistoryTracker,
    refreshLocation,
  } = props;
  const onCloseView = () => setCurrentView('');

  const handleClickViewHistory = () => {
    console.log('___view history');
    onCloseView();
  };

  const tracker = trackers[selectedTrackerId];

  return (
    <Container>
      <MapView>
        <Map fullWidth={true} mapType="leaflet" {...props} />
        {props.selectedTrackerId && (
          <React.Fragment>
            <TopToolBar t={props.t} />
            <BottomToolBar
              t={props.t}
              tracker={tracker}
              isBeep={props.isBeep}
              resetBeep={props.resetBeep}
              onClickSendBeep={props.onClickSendBeep}
              showSnackbar={props.showSnackbar}
              onChangeView={setCurrentView}
            />
            <ContentCardDetail>
              <DetailTrackerCard
                tracker={props.trackers[props.selectedTrackerId]}
                isMobile={true}
                t={props.t}
                settings={props.settings[tracker?.settings_id]}
                refreshLocation={refreshLocation}
              />
            </ContentCardDetail>
            <SettingTracker
              t={props.t}
              show={currentView === 'settingsView'}
              tracker={tracker}
              handleClose={onCloseView}
              isMobile={true}
            />
            <TrackerGeofences
              show={currentView === 'geofenceListView'}
              onClickBack={onCloseView}
              geofences={props.geofences}
              tracker={tracker}
              isMobile={true}
              t={props.t}
            />
            <HistoryTracker
              handleClose={onCloseView}
              t={props.t}
              tracker={tracker}
              show={currentView === 'historyView'}
              isMobile={true}
              getHistoryTracker={getHistoryTracker}
              onClickViewHistory={handleClickViewHistory}
            />
            <ShareLocation
              handleClose={onCloseView}
              t={props.t}
              show={currentView === 'shareLocationView'}
              isMobile={true}
            />
          </React.Fragment>
        )}
      </MapView>
    </Container>
  );
}
