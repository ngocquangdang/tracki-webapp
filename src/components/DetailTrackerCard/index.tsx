import React, { Fragment, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  Refresh as RefreshIcon,
  ZoomIn as ZoomInIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons';
import { GoPrimitiveDot } from 'react-icons/go';
import { AiOutlineDashboard } from 'react-icons/ai';

import { SkeletonTracker } from '@Components/Skeletons';
import { UNWIREDLABS_API_KEY } from '@Definitions/app';
import { ITracker } from '@Interfaces';
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
  TextNameViewMore,
  useStyles,
  DefaultImage,
} from './styles';

interface Prop {
  isLoading?: boolean;
  className?: string;
  tracker: ITracker;
  isMobile: boolean;
  t(key: string, format?: object): string;
  settings: any;
  speedUnit?: string;
  profile?: any;
}

function DetailTrackerCard(props: Prop) {
  const classes = useStyles();
  const { tracker, isMobile, className = '', speedUnit, profile } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState<string | null>(null);
  const [viewMore, setTextViewMore] = useState(false);
  const speed_unit = speedUnit || profile?.preferences?.speed_unit;

  const onZoomClick = () => {
    if (tracker) {
      const { lat, lng } = tracker;
      if (!!lat && !!lng) {
        window.mapEvents.setCenterFlyTo({ lat, lng }, { speed: 1, zoom: 15 });
      }
    }
  };

  const onRefreshClick = () => {
    callApiGetAddress();
  };

  const callApiGetAddress = useCallback(async () => {
    if (tracker && !!tracker.lat && !!tracker.lng) {
      const { data } = await axios.get(
        `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${tracker.lat}&lon=${tracker.lng}`
      );
      setDataAddress(
        data.status === 'ok' ? data.address.display_name : 'Unknow location'
      );
      setLoading(false);
    } else {
      setDataAddress('Unknow location');
      setLoading(false);
    }
  }, [setDataAddress, setLoading, tracker]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const renderContentPC = () => {
    return (
      <TrackerInfomation isMobile={isMobile} className={className}>
        <Item isMobile={isMobile}>
          <LeftItem>
            <ImageWrapper>
              {tracker.icon_url ? (
                <Image background={tracker.icon_url} />
              ) : (
                <DefaultImage background={'/images/image-device.png'} />
              )}
            </ImageWrapper>
            <ItemInfo>
              <Name>{tracker.device_name}</Name>
              <Time>
                <GoPrimitiveDot className={classes.icon} />
                <TimeActive>
                  Last Updated:{' '}
                  {tracker.time ? moment(tracker.time * 1000).fromNow() : '---'}
                </TimeActive>
              </Time>
            </ItemInfo>
          </LeftItem>

          <RightItem>
            <RefreshIcon
              className={classes.rightIcon}
              onClick={onRefreshClick}
            />
            <ZoomInIcon className={classes.rightIcon} onClick={onZoomClick} />
          </RightItem>
        </Item>
        <Address isMobile={isMobile}>
          <LocationOnIcon className={classes.iconLocation} />
          <Text>
            <TextName>{dataAddress}</TextName>
            {tracker.lat && tracker.lng && (
              <LatLong>
                <LatText>Lat: {tracker.lat}</LatText>
                <LongText>Lon: {tracker.lng}</LongText>
              </LatLong>
            )}
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
                  {dataAddress && dataAddress.length >= 80 ? (
                    viewMore ? (
                      <TextName>
                        {dataAddress}{' '}
                        <div
                          className={classes.viewMore}
                          onClick={() => setTextViewMore(false)}
                        >
                          View less
                        </div>
                      </TextName>
                    ) : (
                      <TextNameViewMore>
                        {dataAddress.slice(0, 75)}...
                        <div
                          className={classes.viewMore}
                          onClick={() => setTextViewMore(true)}
                        >
                          View more
                        </div>
                      </TextNameViewMore>
                    )
                  ) : (
                    <TextName>{dataAddress}</TextName>
                  )}
                  <Time>
                    <GoPrimitiveDot className={classes.icon} />
                    <TimeActive>
                      Last Updated:{' '}
                      {tracker?.time
                        ? moment(tracker.time * 1000).fromNow()
                        : 'unknow'}
                    </TimeActive>
                  </Time>
                </Text>
              </Address>
            </LeftItem>
            <RightItem>
              <RefreshIcon
                className={classes.iconRefresh}
                onClick={onRefreshClick}
              />
              <IconZoom src="/images/icon-zoom.svg" onClick={onZoomClick} />
            </RightItem>
          </Item>
        </TrackerInfomation>
      </Card>
    );
  };

  return (
    <Fragment>
      {loading || !tracker ? (
        <div className={classes.skeContainer}>
          <SkeletonTracker />
        </div>
      ) : isMobile ? (
        renderContentMobile()
      ) : (
        renderContentPC()
      )}
      <TrackerStatus isMobile={isMobile}>
        <BatteryTracker>
          <IconBattery src="/images/icon-battery.png" />
          <span className={classes.textSpace}>{tracker?.battery || 0}%</span>
        </BatteryTracker>
        <StatusTracker>
          <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />
          <span className={`${classes.textBold} ${classes.textSpace}`}>
            {tracker && tracker.speed === 0
              ? 'Stopped'
              : speed_unit === 'kph'
              ? tracker?.speed || 0
              : ((tracker?.speed || 0) / 1.609).toFixed(2)}{' '}
            {tracker && tracker.speed !== 0 ? speed_unit : ''}
          </span>
        </StatusTracker>
        <ConnectionTracker>
          <Connection>
            Connection:{' '}
            <span className={classes.textBold}>
              {tracker?.location_type || '--'}
            </span>
          </Connection>
          <LocationApprox>Location within approx. 5-20m</LocationApprox>
        </ConnectionTracker>
      </TrackerStatus>
    </Fragment>
  );
}

export default DetailTrackerCard;
