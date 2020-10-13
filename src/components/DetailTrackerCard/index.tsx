import React, { Fragment, useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import Router from 'next/router';

import {
  Refresh as RefreshIcon,
  ZoomIn as ZoomInIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons';
import { GoPrimitiveDot } from 'react-icons/go';

import { AiOutlineDashboard } from 'react-icons/ai';
import { SkeletonTracker } from '@Components/Skeletons';
import { ITracker } from '@Interfaces';
import { getAddress } from '@Utils/helper';
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
  ButtonIcon,
  Renew,
  TooltipStyle,
  TimeActiveMobile,
} from './styles';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface Prop {
  isLoading?: boolean;
  className?: string;
  tracker: ITracker;
  isMobile: boolean;
  t(key: string, format?: object): string;
  settings?: any;
  profile?: any;
  refreshLocation?(data: object): void;
  isHistory?: boolean;
  locationPointTracking?: any;
}

function DetailTrackerCard(props: Prop) {
  const classes = useStyles();
  const {
    tracker,
    isMobile,
    className = '',
    profile,
    refreshLocation,
    isHistory,
    locationPointTracking,
  } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState<string | null>(null);
  const [viewMore, setTextViewMore] = useState(false);

  const speed_unit = profile?.preferences?.speed_unit;

  const onZoomClick = () => {
    if (tracker) {
      const { lat, lng } = tracker;
      if (!!lat && !!lng) {
        window.mapEvents.setCenterFlyTo({ lat, lng }, { speed: 1, zoom: 15 });
      }
    }
  };

  const onRefreshClick = () => {
    refreshLocation &&
      refreshLocation({
        devices: [tracker.device_id],
        forceGpsRead: true,
        sendGsmBeforeLock: true,
      });
  };

  const callApiGetAddress = useCallback(async () => {
    const locationAddress = isHistory ? locationPointTracking : tracker;
    const address = await getAddress(locationAddress);
    setDataAddress(address);
    setLoading(false);
  }, [setDataAddress, setLoading, tracker, isHistory, locationPointTracking]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onRenewTrackerPage = e => {
    e.stopPropagation();
    Router.push(`/trackers/${tracker.device_id}/renew`);
  };

  const renderContentPC = () => {
    return (
      <TrackerInfomation isMobile={isMobile} className={className}>
        <Item isMobile={isMobile}>
          <LeftItem>
            <ImageWrapper isHistory={isHistory}>
              {tracker.icon_url ? (
                <Image background={tracker.icon_url} />
              ) : (
                <DefaultImage background={'/images/image-device.png'} />
              )}
            </ImageWrapper>
            <ItemInfo>
              <Name>
                {tracker.device_name !== ''
                  ? tracker.device_name
                  : tracker.device_id}
                {tracker.status !== 'active' && (
                  <Renew onClick={onRenewTrackerPage}>
                    RENEW
                    <TooltipStyle
                      title={
                        'Device subscription cancelled or charges were declined.'
                      }
                      arrow
                      placement="left"
                    >
                      <div>
                        <FaRegQuestionCircle
                          className={`${classes.questionIcon}`}
                        />
                      </div>
                    </TooltipStyle>
                  </Renew>
                )}
              </Name>
              <Time>
                <GoPrimitiveDot
                  className={
                    tracker.status === 'active' ? classes.icon : classes.redIcon
                  }
                />
                <TimeActive>
                  {isHistory ? 'Date' : 'Last Updated'}:{' '}
                  {isHistory && locationPointTracking
                    ? `${moment(locationPointTracking.time * 1000).format(
                        'MMM DD YYYY, hh:mm:ss A'
                      )}`
                    : tracker.time
                    ? `${moment(tracker.time * 1000).fromNow()} at ${moment(
                        tracker.time * 1000
                      ).format('MMM DD, YYYY A')}`
                    : '---'}
                </TimeActive>
              </Time>
            </ItemInfo>
          </LeftItem>
          {!isHistory ? (
            <RightItem>
              <ButtonIcon>
                <RefreshIcon
                  className={classes.rightIcon}
                  onClick={onRefreshClick}
                />
              </ButtonIcon>
              <ButtonIcon>
                <ZoomInIcon
                  className={classes.rightIcon}
                  onClick={onZoomClick}
                />
              </ButtonIcon>
            </RightItem>
          ) : null}
        </Item>
        <Address isMobile={isMobile} isHistory={isHistory}>
          <LocationOnIcon className={classes.iconLocation} />
          <Text>
            <TextName isHistory={isHistory}>{dataAddress}</TextName>
            {isHistory && locationPointTracking ? (
              <LatLong isHistory={true}>
                <LatText>Lat: {locationPointTracking.lat}</LatText>
                <LongText>Lon: {locationPointTracking.lng}</LongText>
              </LatLong>
            ) : (
              tracker.lat &&
              tracker.lng && (
                <LatLong>
                  <LatText>Lat: {tracker.lat}</LatText>
                  <LongText>Lon: {tracker.lng}</LongText>
                </LatLong>
              )
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
                    <TimeActiveMobile>
                      Last Updated:{' '}
                      {tracker?.time
                        ? moment(tracker.time * 1000).fromNow()
                        : 'unknow'}
                    </TimeActiveMobile>
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
      <TrackerStatus isMobile={isMobile} isHistory={isHistory}>
        <BatteryTracker>
          <IconBattery src="/images/icon-battery.png" />
          <span
            className={
              isMobile
                ? classes.textMobile
                : isHistory
                ? classes.textHistory
                : classes.textPC
            }
          >
            {isHistory && locationPointTracking
              ? locationPointTracking.battery
              : tracker?.battery || 0}
            %
          </span>
        </BatteryTracker>
        <StatusTracker>
          <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />
          <span
            className={
              isMobile
                ? classes.textMobile
                : isHistory
                ? classes.textHistory
                : classes.textSpeedPC
            }
          >
            {isHistory && locationPointTracking
              ? locationPointTracking.speed || 0
              : tracker && tracker.speed === 0
              ? 'Stopped'
              : speed_unit === 'mph'
              ? tracker?.speed || 0
              : ((tracker?.speed || 0) * 1.609).toFixed(2)}{' '}
            {isHistory && locationPointTracking
              ? locationPointTracking.speed_unit?.toUpperCase()
              : tracker && tracker.speed !== 0
              ? speed_unit?.toUpperCase()
              : ''}
          </span>
        </StatusTracker>
        <ConnectionTracker>
          <Connection isMobile={isMobile} isHistory={isHistory}>
            Connection:{' '}
            <span className={classes.textBold}>
              {isHistory && locationPointTracking
                ? locationPointTracking.type.toUpperCase()
                : tracker?.location_type || '--'}
            </span>
          </Connection>
          <LocationApprox isMobile={isMobile}>
            {isHistory ? 'Accuracy within: -' : 'Location within approx. 5-20m'}
          </LocationApprox>
        </ConnectionTracker>
      </TrackerStatus>
    </Fragment>
  );
}

export default DetailTrackerCard;
