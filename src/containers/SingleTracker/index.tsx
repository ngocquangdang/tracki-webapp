import React, { useState } from 'react';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  ArrowBackIos as ArrowBackIosIcon,
  Refresh as RefreshIcon,
  ZoomIn as ZoomInIcon,
  LocationOn as LocationOnIcon,
  Battery60 as Battery60Icon,
  Settings as SettingsIcon,
  VolumeUp as VolumeUpIcon,
  History as HistoryIcon,
  BorderStyle as BorderStyleIcon,
  Notifications as NotificationsIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
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
  ImageWrapper,
  Item,
  Image,
  ItemInfo,
  Name,
  Time,
  TimeActive,
  TrackerInfomation,
  TrackerStatus,
  BatteryTracker,
  StatusTracker,
  ConnectionTracker,
  Connection,
  Address,
  LocationApprox,
  Text,
  TextName,
  LatLong,
  LatText,
  LongText,
  RightItem,
  LeftItem,
  ContainerControl,
  TitleMenu,
  TrackerMenu,
  TrackerMenuDown,
  TrackerMenuUp,
  Border,
  useStyles,
} from './styles';

interface Props {
  settings: object;
  tracker: object;
  onClickBack: () => void;
  t(key: string): string;
  fetchTrackerSettings(id: number): void;
}

function SingleTracker(props: any) {
  useInjectSaga({ key: 'singleTracker', saga });
  const classes = useStyles();
  const [isSetting, showSetting] = useState(false);
  const { tracker, onClickBack, t, fetchTrackerSettings, settings } = props;

  const handleClose = () => showSetting(false);
  const onClickSetting = () => {
    showSetting(true);
    fetchTrackerSettings(tracker.settings_id);
  };

  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Container>
        <Header>
          <ArrowBackIosIcon
            className={classes.iconBack}
            onClick={onClickBack}
          />
          <Title onClick={onClickBack}>Back</Title>
        </Header>
        <Card key={tracker.device_id}>
          <TrackerInfomation>
            <Item>
              <LeftItem>
                <ImageWrapper>
                  <Image
                    src={tracker.icon_url || '/images/image-device.png'}
                    alt=""
                  />
                </ImageWrapper>
                <ItemInfo>
                  <Name>{tracker.device_name}</Name>
                  <Time>
                    <GoPrimitiveDot className={classes.icon} />
                    <TimeActive>
                      Last Updated: {moment(tracker.time * 1000).fromNow()}
                    </TimeActive>
                  </Time>
                </ItemInfo>
              </LeftItem>

              <RightItem>
                <RefreshIcon className={classes.rightIcon} />
                <ZoomInIcon className={classes.rightIcon} />
              </RightItem>
            </Item>
            <Address>
              <LocationOnIcon className={classes.iconLocation} />
              <Text>
                <TextName>
                  5845, Railton St, Moreno Valley, Riverside County, California,
                  92553, USA
                  <LatLong>
                    <LatText>Lat: {tracker.lat}</LatText>
                    <LongText>Lon: {tracker.lng}</LongText>
                  </LatLong>
                </TextName>
              </Text>
            </Address>
          </TrackerInfomation>
          <TrackerStatus>
            <BatteryTracker>
              <Battery60Icon />
              <span className={classes.textSpace}>{tracker.battery}%</span>
            </BatteryTracker>
            <StatusTracker>
              <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />
              <span className={`${classes.textBold} ${classes.textSpace}`}>
                {tracker.speed}
              </span>
            </StatusTracker>
            <ConnectionTracker>
              <Connection>
                Connection:
                <span className={classes.textBold}>
                  {tracker.location_type}
                </span>
              </Connection>
              <LocationApprox>Location within approx. 5-20m</LocationApprox>
            </ConnectionTracker>
          </TrackerStatus>
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
            settings={settings[tracker.settings_id]}
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
