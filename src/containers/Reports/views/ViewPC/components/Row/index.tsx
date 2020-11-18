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

const MapCard = dynamic(() => import('../MapCard'), {
  ssr: false,
});

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

  const onViewMap = () => {
    setExpand(!isExpand);
  };

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.rowLeft}>
          {typeCard === 'notifications' ? (
            <div className={clsx(classes.flexColCenter, classes.mr)}>
              <div className={classes.containerIcon}>
                <img
                  alt=""
                  src={`/images/${objKeyGetImage[data?.alarm_type]}`}
                  className={classes.iconAlarm}
                />
              </div>
              <span
                className={clsx(
                  classes.textBold,
                  classes.textFont14,
                  classes.textNoWrap
                )}
              >
                {t(objKeyTranslate[data?.alarm_type])}
              </span>
            </div>
          ) : (
            <div className={classes.imageWrapper}>
              <Image background={data.icon_url || '/images/image-device.png'} />
            </div>
          )}

          <div className={clsx(classes.flexCol, classes.ml)}>
            <div className={clsx(classes.textBold, classes.textFont17)}>
              {data?.device_name || data.device_id}
            </div>
            <span className={classes.textFont16}>
              {typeCard !== 'battery' ? (
                loading ? (
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
                )
              ) : (
                <div className={classes.flexRowCenter}>
                  <img
                    className={classes.iconBatteryRote}
                    alt=""
                    src="/images/icon-battery.png"
                  />
                  <span>{data?.battery || '--'}%</span>
                </div>
              )}
            </span>
            {typeCard !== 'battery' && (
              <span
                className={clsx(classes.textFont16, classes.textColorMain)}
                onClick={onViewMap}
              >
                {isExpand ? 'Hide map' : 'View on map'}
              </span>
            )}
          </div>
        </div>
        {typeCard === 'notifications' && (
          <div className={classes.rowRight}>
            <div className={classes.flexCol}>
              <span className={classes.textFont13}>
                {moment(data?.created).format('DD/MM/YYYY, hh:mm A')}
              </span>
            </div>
          </div>
        )}
        {typeCard === 'recent' && (
          <div className={classes.rowRight}>
            <div className={classes.flexCol}>
              <span className={classes.textFont13}>
                {moment(data?.stopOn).format('DD/MM/YYYY, hh:mm A')}
              </span>
              <span className={classes.textFont13}>
                {moment(data?.startOn).format('DD/MM/YYYY, hh:mm A')}
              </span>
              <span className={classes.textFont13}>
                {msToTime(data?.duration)}
              </span>
            </div>
          </div>
        )}
      </div>
      {isExpand && <MapCard lat={data?.lat} lng={data?.lng} mapId={mapId} />}
    </div>
  );
};

export default Row;
