import React, { useState } from 'react';
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

import { useInjectSaga } from '@Utils/injectSaga';
import saga from './store/sagas';
import { fetchTrackerSettingsRequestedAction } from './store/actions';
import SettingTracker from './components/SettingTracker';
import { makeSelectTrackerSettings } from '@Containers/Trackers/store/selectors';

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

interface Props {
  settings: object;
  tracker: ITracker;
  onClickBack: () => void;
  t(key: string): string;
  fetchTrackerSettings(id: number): void;
}

function SingleTracker(props: Props) {
  useInjectSaga({ key: 'singleTracker', saga });
  const classes = useStyles();
  const [isSetting, showSetting] = useState(false);
  const { tracker, onClickBack, t, fetchTrackerSettings } = props;

  const handleClose = () => showSetting(false);
  const onClickSetting = () => {
    showSetting(true);
    fetchTrackerSettings(tracker.settings_id);
  };

  return (
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
          <DetailTrackerCard isMobile={false} tracker={tracker} />
          <TrackerMenu>
            <TrackerMenuUp>
              <ContainerControl onClick={onClickSetting}>
                <SettingsIcon />
                <TitleMenu>Settings</TitleMenu>
              </ContainerControl>
              <ContainerControl>
                <HistoryIcon />
                <TitleMenu>History</TitleMenu>
              </ContainerControl>
              <ContainerControl>
                <BorderStyleIcon />
                <TitleMenu>Geo-Fence</TitleMenu>
              </ContainerControl>
            </TrackerMenuUp>
            <TrackerMenuDown>
              <ContainerControl>
                <VolumeUpIcon />
                <TitleMenu>Beep Device</TitleMenu>
              </ContainerControl>
              <ContainerControl>
                <ShareIcon />
                <TitleMenu>Share Location</TitleMenu>
              </ContainerControl>
              <ContainerControl>
                <NotificationsIcon />
                <TitleMenu>Notifications</TitleMenu>
              </ContainerControl>
            </TrackerMenuDown>
            <Border></Border>
          </TrackerMenu>
        </Card>
        {isSetting && (
          <SettingTracker
            handleClose={handleClose}
            t={t}
            tracker={tracker}
            isMobile={false}
          />
        )}
      </Container>
    </Slide>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchTrackerSettings: (id: number) =>
    dispatch(fetchTrackerSettingsRequestedAction(id)),
});

const mapStateToProps = createStructuredSelector({
  settings: makeSelectTrackerSettings(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SingleTracker);
