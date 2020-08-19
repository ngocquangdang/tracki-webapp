import React, { useState, useEffect } from 'react';

import Map from '@Components/Maps';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';

import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';
import HistoryTracker from '@Containers/SingleTracker/components/HistoryTracker';
import ShareLocation from '@Containers/SingleTracker/components/ShareLocation';
import TrackerGeofences from '@Containers/Trackers/views/ViewMobile/TrackerGeofences';
import useStyles from './styles';

interface Props {
  isMobile: boolean;
  viewMode: string;
  trackers: object;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function TrackingSingleView(props: Props) {
  const { tracker, viewMode, t, settings } = props;
  const [currentView, setCurrentView] = useState('');
  const classes = useStyles();

  const onCloseView = () => setCurrentView('');

  const handleClickViewHistory = () => {
    console.log('___view history');
    onCloseView();
  };

  useEffect(() => {
    if (tracker && tracker.lat && tracker.lng && window.mapEvents) {
      window.mapEvents.setCenter(tracker);
    }
  }, [tracker, viewMode]);

  return (
    <div className={classes.mapView}>
      <Map fullWidth={true} mapType="leaflet" isTracking={true} {...props} />
      {tracker && (
        <React.Fragment>
          <TopToolBar t={t} />
          <BottomToolBar
            t={t}
            tracker={tracker}
            isBeep={props.isBeep}
            resetBeep={props.resetBeep}
            onClickSendBeep={props.onClickSendBeep}
            showSnackbar={props.showSnackbar}
            onChangeView={setCurrentView}
          />
          <div className={classes.trackerCard}>
            <DetailTrackerCard
              tracker={tracker}
              isMobile={true}
              t={props.t}
              settings={settings[tracker]}
            />
          </div>
          <SettingTracker
            t={t}
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
            t={t}
          />
          <HistoryTracker
            handleClose={onCloseView}
            t={t}
            show={currentView === 'historyView'}
            isMobile={true}
            onClickViewHistory={handleClickViewHistory}
          />
          <ShareLocation
            handleClose={onCloseView}
            t={t}
            show={currentView === 'shareLocationView'}
            isMobile={true}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default TrackingSingleView;
