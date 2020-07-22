import React, { useState } from 'react';
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
import moment from 'moment';
import { GoPrimitiveDot } from 'react-icons/go';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RefreshIcon from '@material-ui/icons/Refresh';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Battery60Icon from '@material-ui/icons/Battery60';
import { AiOutlineDashboard } from 'react-icons/ai';
import Skeleton from '@material-ui/lab/Skeleton';
import SettingsIcon from '@material-ui/icons/Settings';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import HistoryIcon from '@material-ui/icons/History';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShareIcon from '@material-ui/icons/Share';
import Slide from '@material-ui/core/Slide';
import SettingTracker from '@Containers/Trackers/views/SettingTracker';

function SingleTracker(props: any) {
  const classes = useStyles();
  const [isSetting, showSetting] = useState(false);
  const { isLoading, tracker, onClickBack, t } = props;
  if (isLoading) {
    return (
      <Card>
        <Skeleton
          variant="circle"
          animation="wave"
          width={40}
          height={40}
          style={{ marginRight: 8 }}
          classes={{ root: classes.skeleton }}
        />
        <div>
          <Skeleton
            variant="text"
            width={150}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
          <Skeleton
            variant="text"
            width={250}
            animation="wave"
            classes={{ root: classes.skeleton }}
          />
        </div>
      </Card>
    );
  }
  const handleClose = () => {
    showSetting(false);
  };
  const onClickSetting = () => {
    showSetting(true);
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
                    src={tracker.icon_url || 'images/image-device.png'}
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
        {isSetting ? (
          <SettingTracker handleClose={handleClose} t={t} tracker={tracker} />
        ) : null}
      </Container>
    </Slide>
  );
}

export default SingleTracker;
