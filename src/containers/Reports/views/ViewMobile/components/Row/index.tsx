import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';
import dynamic from 'next/dynamic';
import { getAddress } from '@Utils/helper';
import { msToTime } from '@Utils/helper';

import {
  objKeyTranslate,
  objKeyGetImage,
} from '@Containers/Reports/store/constants';

import { useStyles, Image } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/components/MapCard'),
  { ssr: false }
);

const Row = props => {
  const classes = useStyles();
  const { typeCard, data, t, mapId, isStopTab } = props;

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

  const onViewMap = () => {
    setExpand(!isExpand);
  };
  const deviceName = data?.device_name || data?.device_id;
  return (
    <div
      className={clsx(classes.container, {
        [classes.pb]: typeCard === 'battery',
      })}
    >
      {typeCard !== 'battery' ? (
        <>
          {' '}
          <div className={classes.content}>
            <div className={classes.rowTop}>
              <div className={classes.flexRowBetween}>
                <div className={classes.flexRow}>
                  {typeCard === 'notifications' && (
                    <div className={classes.containerIcon}>
                      <img
                        alt=""
                        src={`/images/${objKeyGetImage[data?.alarm_type]}`}
                        className={classes.iconAlarm}
                      />
                    </div>
                  )}
                  {typeCard === 'stop' && !isStopTab && (
                    <div className={classes.imageWrapperSmall}>
                      <Image
                        background={
                          data?.icon_url || '/images/image-device.png'
                        }
                        isSmall={true}
                      />
                    </div>
                  )}
                  {typeCard !== 'history' && !isStopTab && (
                    <span
                      className={clsx(
                        classes.textBold,
                        classes.textFont14,
                        classes.textNoWrap
                      )}
                    >
                      {typeCard === 'notifications'
                        ? t(objKeyTranslate[data?.alarm_type])
                        : deviceName}
                    </span>
                  )}
                  {typeCard === 'history' && (
                    <div className={clsx(classes.textBold, classes.textFont14)}>
                      {`${data?.speed === 0 ? 'Not moving' : 'Moving'} - ${
                        data?.speed
                      } ${data?.speed_unit}`}
                    </div>
                  )}
                </div>
                {(typeCard === 'notifications' || typeCard === 'history') && (
                  <div
                    className={clsx(classes.textFont12, classes.textWeight300)}
                  >
                    {moment(
                      typeCard === 'notifications'
                        ? data?.created
                        : data?.time * 1000
                    ).format('LLL')}
                  </div>
                )}
              </div>
            </div>
            {typeCard === 'notifications' && (
              <div className={clsx(classes.textBold, classes.textFont14)}>
                {deviceName}
              </div>
            )}
            <div
              className={clsx(
                classes.textFont12,
                classes.mr,
                classes.textWeight300
              )}
            >
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
            {typeCard === 'speed' && (
              <div className={classes.textFont12}>
                <div>
                  <span className={classes.textBold}>Monitored Speed:</span>
                  <span>{data.speed}</span>
                  <span className={classes.textTransform}>
                    {data.speed_unit}
                  </span>
                  <span className={classes.speedChange}>
                    {data?.speedChange > 0
                      ? `+ ${data.speedChange}`
                      : data?.speedChange}
                  </span>
                </div>
                <div className={classes.textWeight300}>
                  {moment(data?.time * 1000).format('DD/MM/YYYY, hh:mm A')}
                </div>
              </div>
            )}
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
                    classes.textWeight300,
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
            <div className={classes.mapView}>
              <MapCard
                mapId={mapId}
                tracker={data}
                mapType="leaflet"
                isMobile={true}
                {...props}
              />
            </div>
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
