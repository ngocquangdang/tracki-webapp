import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';
import dynamic from 'next/dynamic';
import { getAddress } from '@Utils/helper';
import { msToTime } from '@Utils/helper';

import { useStyles, Image } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/ViewPC/components/MapCard'),
  {
    ssr: false,
  }
);

const Row = props => {
  const classes = useStyles();
  const { typeCard, data, t, mapId } = props;

  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState<string | null>(null);
  const [isExpand, setExpand] = useState(false);

  const callApiGetAddress = useCallback(async () => {
    if (typeCard !== 'battery') {
      const address = await getAddress(data);
      setDataAddress(address);
      setLoading(false);
    }
  }, [setDataAddress, setLoading, data, typeCard]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  function getSrcImg(value) {
    switch (value) {
      case 'SPEED':
        return 'ic-alert-speed-violation.svg';
      case 'GEOZONE':
        return 'ic-alert-geofence.svg';
      case 'MOVEMENT':
        return 'ic-alert-start-moving.svg';
      case 'BATTERY':
        return 'ic-alert-battery.svg';
      case 'SOS':
        return 'ic-alert-SOS.svg';
      case 'LEFT':
        return 'ic-alert-left-click.svg';
      default:
        return 'ic-alert-right-click.svg';
    }
  }
  function getTextlabelNoti(value) {
    let keyTranslate = 'notifications:right_click';
    switch (value) {
      case 'SPEED':
        keyTranslate = 'notifications:speed_violation';
        break;
      case 'GEOZONE':
        keyTranslate = 'notifications:geo_fence_crossed';
        break;
      case 'MOVEMENT':
        keyTranslate = 'notifications:start_moving';
        break;
      case 'BATTERY':
        keyTranslate = 'notifications:low_battery';
        break;
      case 'SOS':
        keyTranslate = 'notifications:sos_alert';
        break;
      case 'LEFT':
        keyTranslate = 'notifications:left_click';
    }
    return t(keyTranslate);
  }
  const onViewMap = () => {
    setExpand(!isExpand);
  };
  const deviceName = data?.device_name || data?.device_id;
  return (
    <div className={classes.container}>
      {typeCard !== 'battery' ? (
        <>
          {' '}
          <div className={classes.content}>
            <div className={classes.rowTop}>
              <div className={classes.flexRowBetween}>
                <div className={classes.flexRow}>
                  {typeCard === 'notifications' ? (
                    <div className={classes.containerIcon}>
                      <img
                        alt=""
                        src={`/images/${getSrcImg(data?.alarm_type)}`}
                        className={classes.iconAlarm}
                      />
                    </div>
                  ) : (
                    <div className={classes.imageWrapperSmall}>
                      <Image
                        background={
                          data?.icon_url || '/images/image-device.png'
                        }
                        isSmall={true}
                      />
                    </div>
                  )}
                  <span
                    className={clsx(
                      classes.textBold,
                      classes.textFont14,
                      classes.textNoWrap
                    )}
                  >
                    {typeCard === 'notifications'
                      ? getTextlabelNoti(data?.alarm_type)
                      : deviceName}
                  </span>
                </div>
                {typeCard === 'notifications' && (
                  <div className={clsx(classes.textFont12)}>
                    {moment(data?.created).format('LLL')}
                  </div>
                )}
              </div>
            </div>
            {typeCard === 'notifications' && (
              <div className={clsx(classes.textBold, classes.textFont14)}>
                {deviceName}
              </div>
            )}
            <div className={clsx(classes.textFont14, classes.mr)}>
              {loading ? (
                <div>
                  <Skeleton
                    width={'90%'}
                    height={14}
                    style={{ margin: '5px', backgroundColor: '#f2f2f2' }}
                  />
                  <Skeleton
                    width={'70%'}
                    height={14}
                    style={{ margin: '5px', backgroundColor: '#f2f2f2' }}
                  />
                </div>
              ) : (
                dataAddress
              )}
            </div>
            {typeCard === 'stop' && (
              <div className={classes.flexRow}>
                <div
                  className={clsx(
                    classes.flexCol,
                    classes.textFont12,
                    classes.textBold
                  )}
                >
                  <span>Stop On:</span>
                  <span>Start On:</span>
                  <span>Stop duration:</span>
                </div>
                <div
                  className={clsx(
                    classes.flexCol,
                    classes.textFont12,
                    classes.textNormal,
                    classes.ml
                  )}
                >
                  <span>{moment(data?.stopOn).format('LLL')}</span>
                  <span>{moment(data?.startOn).format('LLL')}</span>
                  <span>{msToTime(data?.duration)}</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={clsx(
              classes.textColorMain,
              classes.viewMap,
              classes.textFont12
            )}
            onClick={onViewMap}
          >
            {isExpand ? 'Hide map' : 'View on map'}
          </div>
          {isExpand && (
            <MapCard lat={data?.lat} lng={data?.lng} mapId={mapId} />
          )}
        </>
      ) : (
        <div className={classes.flexRow}>
          <div className={classes.imageWrapper}>
            <Image background={data?.icon_url || '/images/image-device.png'} />
          </div>
          <div className={classes.flexCol}>
            <div className={clsx(classes.textBold, classes.textFont14)}>
              {deviceName}
            </div>
            <div className={classes.flexRowCenter}>
              <div className={classes.flexRowCenter}>
                <img
                  className={classes.iconBatteryRote}
                  alt=""
                  src="/images/icon-battery.png"
                />
                <span>{data?.battery || '--'}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
