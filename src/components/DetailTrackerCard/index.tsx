import React, { Fragment, useState, useEffect, useCallback } from 'react';
import {
  Card,
  Item,
  Time,
  TimeActive,
  TrackerInfomation,
  TrackerStatus,
  BatteryTracker,
  IconBattery,
  StatusTracker,
  ConnectionTracker,
  Connection,
  Address,
  LocationApprox,
  Text,
  TextName,
  RightItem,
  LeftItem,
  ImageWrapper,
  Image,
  ItemInfo,
  Name,
  LatLong,
  LatText,
  LongText,
  IconZoom,
  useStyles,
} from './styles';
import moment from 'moment';
import { GoPrimitiveDot } from 'react-icons/go';
import RefreshIcon from '@material-ui/icons/Refresh';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { AiOutlineDashboard } from 'react-icons/ai';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
interface Prop {
  isLoading?: boolean;
  tracker: Tracker;
  isMobile: boolean;
}
interface Tracker {
  device_id: number;
  time: number;
  battery: number;
  speed: number;
  location_type: string;
  lat: number;
  lng: number;
  icon_url: string;
  device_name: string;
}

function DetailTrackerCard(props: Prop) {
  const classes = useStyles();
  const { tracker, isMobile } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState(null);

  const callApiGetAddress = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${tracker.lng},${tracker.lat}.json?types=poi&access_token=pk.eyJ1IjoibGlrZWd1aXRhciIsImEiOiJjajN6a2ppYTQwMmN3MndxbTkzNGR0cThuIn0.HU8h498IT6jCya-G2_lczQ`
    );
    const address = data.features[0] || { place_name: 'Unknow location' };
    setDataAddress(address.place_name);
    setLoading(false);
  }, [setDataAddress, setLoading, tracker]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const ske = () => (
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

  const renderContentPC = () => {
    return (
      <TrackerInfomation isMobile={isMobile}>
        <Item isMobile={isMobile}>
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
        <Address isMobile={isMobile}>
          <LocationOnIcon className={classes.iconLocation} />
          <Text>
            <TextName>
              {dataAddress}
              <LatLong>
                <LatText>Lat: {tracker.lat}</LatText>
                <LongText>Lon: {tracker.lng}</LongText>
              </LatLong>
            </TextName>
          </Text>
        </Address>
      </TrackerInfomation>
    );
  };

  const renderContentMobile = () => {
    return (
      <Card key={tracker.device_id}>
        <TrackerInfomation isMobile={isMobile}>
          <Item isMobile={isMobile}>
            <LeftItem>
              <Address isMobile={isMobile}>
                <LocationOnIcon className={classes.iconLocationMobile} />
                <Text>
                  <TextName>{dataAddress}</TextName>
                  <Time>
                    <GoPrimitiveDot className={classes.icon} />
                    <TimeActive>
                      Last Updated: {moment(tracker.time * 1000).fromNow()}
                    </TimeActive>
                  </Time>
                </Text>
              </Address>
            </LeftItem>
            <RightItem>
              <RefreshIcon className={classes.iconRefresh} />
              <IconZoom src="/images/icon-zoom.svg" />
            </RightItem>
          </Item>
        </TrackerInfomation>
      </Card>
    );
  };

  return (
    <Fragment>
      {loading ? ske() : isMobile ? renderContentMobile() : renderContentPC()}
      <TrackerStatus isMobile={isMobile}>
        <BatteryTracker>
          <IconBattery src="/images/icon-battery.png" />
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
            Connection:{' '}
            <span className={classes.textBold}>{tracker.location_type}</span>
          </Connection>
          <LocationApprox>Location within approx. 5-20m</LocationApprox>
        </ConnectionTracker>
      </TrackerStatus>
    </Fragment>
  );
}

export default DetailTrackerCard;
