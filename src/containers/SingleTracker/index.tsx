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
} from '@Containers/Tracking/store/selectors';
import {
  sendBeepRequest,
  resetBeepAction,
} from '@Containers/SingleTracker/store/actions';
import { changeMapView } from '@Containers/App/store/actions';
import { getHistoryTrackerRequest } from '@Containers/Tracking/store/actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

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
import HistoryTracker from './components/HistoryTracker';
import HistoryTrackerDetail from '@Components/HistoryTrackerDetail';
// import SendBeep from './components/SendBeep';
import ShareLocation from './components/ShareLocation';
import TrackerGeofences from './components/TrackerGeofences';

interface Props {
  settings: object;
  tracker: ITracker;
  geofences: object;
  histories: object;
  historyIds: object;
  onClickBack: () => void;
  t(key: string, format?: object): string;
  fetchTrackerSettings(id: number): void;
  changeMapView(view: string): void;
  onClickSendBeep(data: object): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
  getHistoryTracker(data: object): void;
  resetBeep(): void;
  deviceId: number;
  isBeep: boolean;
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
    onClickBack,
    changeMapView,
    getHistoryTracker,
    t,
    resetBeep,
    showSnackbar,
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
    updateChildView('history');
    changeMapView('DEFAULT');
  };

  const onClickViewHistory = () => {
    updateChildView('historyDetail');
    changeMapView('tracker_history');
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
      <HistoryTrackerDetail
        isMobile={false}
        tracker={tracker}
        show={currentChildView === 'historyDetail'}
        onClose={onCloseTrackerHistory}
        t={t}
        histories={histories[tracker.device_id] || {}}
        historyIds={historyIds[tracker.device_id] || []}
      />
      <SettingTracker
        handleClose={onCloseChildView}
        t={t}
        show={currentChildView === 'settings'}
        tracker={tracker}
        isMobile={false}
      />
      <HistoryTracker
        handleClose={onCloseChildView}
        t={t}
        show={currentChildView === 'history'}
        isMobile={false}
        tracker={tracker}
        getHistoryTracker={getHistoryTracker}
        onClickViewHistory={onClickViewHistory}
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
});

const mapStateToProps = createStructuredSelector({
  settings: makeSelectTrackerSettings(),
  geofences: makeSelectGeofences(),
  deviceId: makeSelectTrackerId(),
  isBeep: makeSelectBeep(),
  histories: makeSelectHistories(),
  historyIds: makeSelectHistoryIds(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTracker);
