import React, { useState, useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import Map from '@Components/Maps';
import TopToolBar from '@Components/Maps/components/MapToolBarMobile/TopToolBar';
import BottomToolBar from '@Components/Maps/components/MapToolBarMobile/BottomToolBar';
import DetailTrackerCard from '@Components/DetailTrackerCard';

import SettingTracker from '@Containers/SingleTracker/components/SettingTracker';
import HistoryTracker from '@Containers/SingleTracker/components/HistoryTracker';
import ShareLocation from '@Containers/SingleTracker/components/ShareLocation';
import TrackerGeofences from './TrackerGeofences';

import {
  Container,
  ContentCardDetail,
  MapView,
  ContainerAlert,
  ContentAlert,
  ButtonClear,
  IconSos,
} from './styles';

interface Props {
  getHistoryTracker(data: object): void;
  t(key: string, format?: object): string;
  speedUnit?: string;
  profile?: {
    id?: number;
  };
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function ViewHomeMobile(props: Props) {
  const [currentView, setCurrentView] = useState('');
  const [isAlertSos, setAlertSos] = useState(false);
  const {
    trackers,
    selectedTrackerId,
    getHistoryTracker,
    profile,
    refreshLocation,
    getSOSalertTracker,
    alerts,
    alertsIds,
    trackerIds,
  } = props;

  const onCloseView = () => setCurrentView('');

  const handleClickViewHistory = () => {
    console.log('___view history');
    onCloseView();
  };

  useEffect(() => {
    if (profile && profile.id && trackerIds && trackerIds.length > 0) {
      getSOSalertTracker({
        alarm_types: 'SOS',
        device_ids: trackerIds.join(','),
        limit: 500,
        page: 1,
        read_status: '',
        sort_direction: 'DESC',
      });
    }
  }, [profile, trackerIds, getSOSalertTracker]);

  useEffect(() => {
    if (
      alertsIds &&
      alertsIds.length > 0 &&
      alerts[alertsIds[0]]?.alarm_type === 'SOS' &&
      alerts[alertsIds[0]]?.read === false
    ) {
      setAlertSos(true);
    }
  }, [alertsIds, alerts]);

  const trackerAlerts = trackerIds?.filter(
    item => props.trackers[item].alerts?.length > 0
  );

  const trackerAlertSos = trackerAlerts?.filter(
    item => alerts[props.trackers[item]?.alerts[0]]?.read === false
  );

  const renderDetailAlertSos = () => {
    const { trackers, readSOSalert } = props;

    const onClearSosAlert = item => () => {
      readSOSalert({
        alertId: props.trackers[item]?.alerts[0],
        priority: 'NONE',
        read: true,
      });
      setAlertSos(false);
    };
    return (
      trackerAlertSos &&
      trackerAlertSos?.map(item => (
        <Fade in={isAlertSos} unmountOnExit mountOnEnter key={item}>
          <ContainerAlert>
            <IconSos src="/images/ic-alert-SOS.svg" />
            <ContentAlert>
              {`${moment().format('hh:mm:ss')} ${
                trackers[item.device_id]?.device_name
              } SOS button pressed`}{' '}
            </ContentAlert>
            <ButtonClear onClick={onClearSosAlert(item)}>Clear</ButtonClear>
          </ContainerAlert>
        </Fade>
      ))
    );
  };

  const tracker = trackers[selectedTrackerId];

  return (
    <Container>
      <MapView>
        <Map fullWidth={true} mapType="leaflet" {...props} />
        {isAlertSos ? renderDetailAlertSos() : null}
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
                profile={profile}
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
