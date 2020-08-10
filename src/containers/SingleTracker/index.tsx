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
import toast from '@Utils/notification';
import {
  makeSelectTrackerSettings,
  makeSelectGeofences,
  makeSelectTrackerId,
  makeSelectBeep,
} from '@Containers/Trackers/store/selectors';
import {
  sendBeepRequest,
  resetBeepAction,
} from '@Containers/SingleTracker/store/actions';

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
import HistoryTrackerCard from '@Components/HistoryTrackerCard';
// import SendBeep from './components/SendBeep';
import ShareLocation from './components/ShareLocation';
import TrackerGeofences from './components/TrackerGeofences';

interface Props {
  settings: object;
  tracker: ITracker;
  geofences: object;
  onClickBack: () => void;
  t(key: string): string;
  fetchTrackerSettings(id: number): void;
  onClickSendBeep(data: object): void;
  resetBeep(): void;
  deviceId: number;
  isBeep: boolean;
}

function SingleTracker(props: Props) {
  useInjectSaga({ key: 'singleTracker', saga });
  console.log('props', props);
  const classes = useStyles();
  const { tracker, onClickBack, t, geofences } = props;

  const [currentChildView, updateChildView] = useState<string | null>(null);
  useEffect(() => {
    if (props.isBeep) {
      const timeOut = setTimeout(() => {
        toast.success('Send beep is success');
        props.resetBeep();
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [props]);
  // const [loadingBeeo];
  const onCloseChildView = () => {
    updateChildView(null);
  };

  const onOpenChildView = (view: string) => () => {
    updateChildView(view);
  };

  const handleClickPreviosHisotry = () => {
    console.log('previos history');
  };

  const handleClickNextHistory = () => {
    console.log('next history');
  };

  const onClickBeepDevice = () => {
    props?.onClickSendBeep({
      beepPeriod: 2,
      beepType: 1,
      devices: [props?.deviceId],
    });
  };

  const handleBack = () => {
    currentChildView === 'historyTracker'
      ? updateChildView('history')
      : onClickBack();
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
              onClick={handleBack}
            />
            <Title onClick={handleBack}>
              {currentChildView === 'historyTracker'
                ? 'History Result'
                : 'Back'}
            </Title>
          </Header>
          {currentChildView === 'historyTracker' ? (
            <HistoryTrackerCard
              isMobile={false}
              tracker={tracker}
              onClickPrevios={handleClickPreviosHisotry}
              onClickNext={handleClickNextHistory}
            />
          ) : (
            <Card key={tracker.device_id}>
              <DetailTrackerCard isMobile={false} tracker={tracker} />
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
                      <VolumeUpIcon onClick={onClickBeepDevice} />
                    ),
                    onOpenChildView('beepDevice')
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
          )}
        </Container>
      </Slide>
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
        onClickViewHistory={onOpenChildView('historyTracker')}
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
});

const mapStateToProps = createStructuredSelector({
  settings: makeSelectTrackerSettings(),
  geofences: makeSelectGeofences(),
  deviceId: makeSelectTrackerId(),
  isBeep: makeSelectBeep(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTracker);
