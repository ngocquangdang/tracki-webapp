import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Settings as SettingsIcon,
  VolumeUp as VolumeUpIcon,
  History as HistoryIcon,
  BorderStyle as BorderStyleIcon,
  Notifications as NotificationsIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from '@Utils/injectSaga';
import saga from './store/sagas';
import { fetchTrackerSettingsRequestedAction } from './store/actions';
import SettingTracker from './components/SettingTracker';
import {
  makeSelectTrackerSettings,
  makeSelectGeofences,
  makeSelectTrackerId,
  makeSelectBeep,
} from '@Containers/Trackers/store/selectors';
import {
  makeSelectHistories,
  makeSelectHistoryIds,
  makeSelectPointTracking,
} from '@Containers/Tracking/store/selectors';
import { makeSelectLoading } from '@Containers/App/store/selectors';
import {
  sendBeepRequest,
  resetBeepAction,
} from '@Containers/SingleTracker/store/actions';
import { changePointTracking } from '@Containers/Tracking/store/actions';
import { changeMapView } from '@Containers/App/store/actions';
import { getHistoryTrackerRequest } from '@Containers/Tracking/store/actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';
import { refreshLocationRequestAction } from '@Containers/Trackers/store/actions';
import {
  Container,
  Header,
  Title,
  Card,
  ContainerControl,
  TitleMenu,
  TrackerMenu,
  TrackerMenuDown,
  TrackerMenuUp,
  Border,
  useStyles,
} from './styles';
import DetailTrackerCard from '@Components/DetailTrackerCard';
import { ITracker } from '@Interfaces';
import HistoryTrackerDetail from '@Components/HistoryTrackerDetailNew';
// import SendBeep from './components/SendBeep';
import ShareLocation from './components/ShareLocation';
import TrackerGeofences from './components/TrackerGeofences';
import { makeSelectUserProfile } from '@Containers/AccountSetting/store/selectors';

interface Props {
  settings: object;
  tracker: ITracker;
  geofences: object;
  histories: object;
  historyIds: object;
  isRequesting: boolean;
  deviceId: number;
  pointTrackingIndex: number;
  isBeep: boolean;
  onClickBack: () => void;
  t(key: string, format?: object): string;
  fetchTrackerSettings(id: number): void;
  changeMapView(view: string): void;
  onClickSendBeep(data: object): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
  getHistoryTracker(data: object): void;
  changePointTracking(pointIndex: number): void;
  refreshLocation(data: object): void;
  resetBeep(): void;
  profile: object;
}

function SingleTracker(props: Props) {
  useInjectSaga({ key: 'singleTracker', saga });
  const classes = useStyles();
  const {
    tracker,
    isBeep,
    geofences,
    settings,
    histories,
    historyIds,
    isRequesting,
    pointTrackingIndex,
    onClickBack,
    changeMapView,
    getHistoryTracker,
    changePointTracking,
    t,
    resetBeep,
    showSnackbar,
    profile,
    refreshLocation,
  } = props;

  const [currentChildView, updateChildView] = useState<string | null>(null);
  useEffect(() => {
    if (isBeep) {
      const timeOut = setTimeout(() => {
        showSnackbar({
          snackType: 'success',
          snackMessage: 'Send beep is success',
        });
        resetBeep();
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [isBeep, resetBeep, showSnackbar]);
  // const [loadingBeeo];
  const onCloseChildView = () => {
    updateChildView(null);
  };

  const onOpenChildView = (view: string) => () => {
    updateChildView(view);
    if (view === 'history') {
      changeMapView('tracker_history');
    }
  };

  const onClickBeepDevice = () => () => {
    onOpenChildView('beepDevice');
    props?.onClickSendBeep({
      beepPeriod: 2,
      beepType: 1,
      devices: [props?.deviceId],
    });
  };

  const onCloseTrackerHistory = () => {
    onCloseChildView();
    changeMapView('DEFAULT');
    changePointTracking(-1);
  };

  const renderBlock = (title: string, icon: JSX.Element, handlClick: any) => (
    <ContainerControl onClick={handlClick}>
      {icon}
      <TitleMenu>{title}</TitleMenu>
    </ContainerControl>
  );

  return (
    <React.Fragment>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Container>
          <Header>
            <ArrowBackIosIcon
              className={classes.iconBack}
              onClick={onClickBack}
            />
            <Title onClick={onClickBack}>Back</Title>
          </Header>
          <Card key={tracker.device_id}>
            <DetailTrackerCard
              isMobile={false}
              tracker={tracker}
              t={t}
              settings={settings[tracker.settings_id]}
              profile={profile}
              refreshLocation={refreshLocation}
            />
            <TrackerMenu>
              <TrackerMenuUp>
                {renderBlock(
                  'Settings',
                  <SettingsIcon />,
                  onOpenChildView('settings')
                )}
                {renderBlock(
                  'History',
                  <HistoryIcon />,
                  onOpenChildView('history')
                )}
                {renderBlock(
                  'Geo-Fence',
                  <BorderStyleIcon />,
                  onOpenChildView('geofences')
                )}
              </TrackerMenuUp>
              <TrackerMenuDown>
                {renderBlock(
                  'Beep Device',
                  props.isBeep ? (
                    <CircularProgress className={classes.iconLoading} />
                  ) : (
                    <VolumeUpIcon />
                  ),
                  onClickBeepDevice()
                )}
                {renderBlock(
                  'Share Location',
                  <ShareIcon />,
                  onOpenChildView('shareLocation')
                )}
                {renderBlock(
                  'Notifications',
                  <NotificationsIcon />,
                  onOpenChildView('notifications')
                )}
              </TrackerMenuDown>
              <Border></Border>
            </TrackerMenu>
          </Card>
        </Container>
      </Slide>
      <SettingTracker
        handleClose={onCloseChildView}
        t={t}
        show={currentChildView === 'settings'}
        tracker={tracker}
        isMobile={false}
      />
      <HistoryTrackerDetail
        tracker={tracker}
        show={currentChildView === 'history'}
        onClose={onCloseTrackerHistory}
        t={t}
        histories={histories[tracker.device_id] || {}}
        historyIds={historyIds[tracker.device_id] || []}
        getHistoryTracker={getHistoryTracker}
        pointTrackingIndex={pointTrackingIndex}
        changePointTracking={changePointTracking}
        isRequesting={isRequesting}
      />
      <TrackerGeofences
        show={currentChildView === 'geofences'}
        onClickBack={onCloseChildView}
        geofences={geofences}
        tracker={tracker}
        t={t}
      />
      <ShareLocation
        handleClose={onCloseChildView}
        t={t}
        show={currentChildView === 'shareLocation'}
        isMobile={false}
      />
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchTrackerSettings: (id: number) =>
    dispatch(fetchTrackerSettingsRequestedAction(id)),
  onClickSendBeep: (data: object) => dispatch(sendBeepRequest(data)),
  resetBeep: () => dispatch(resetBeepAction()),
  showSnackbar: (data: SNACK_PAYLOAD) => dispatch(showSnackbar(data)),
  changeMapView: (mapView: string) => dispatch(changeMapView(mapView)),
  getHistoryTracker: (data: object) => dispatch(getHistoryTrackerRequest(data)),
  changePointTracking: (pointIndex: number) =>
    dispatch(changePointTracking(pointIndex)),
  refreshLocation: (data: object) =>
    dispatch(refreshLocationRequestAction(data)),
});

const mapStateToProps = createStructuredSelector({
  settings: makeSelectTrackerSettings(),
  geofences: makeSelectGeofences(),
  deviceId: makeSelectTrackerId(),
  isBeep: makeSelectBeep(),
  histories: makeSelectHistories(),
  historyIds: makeSelectHistoryIds(),
  profile: makeSelectUserProfile(),
  isRequesting: makeSelectLoading(),
  pointTrackingIndex: makeSelectPointTracking(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTracker);
