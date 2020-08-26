import React, { useState } from 'react';
import moment from 'moment';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { SkeletonTracker } from '@Components/Skeletons';

import { useStyles } from './styles';
import MapCard from '../MapCardMobile';

interface Notifications {
  device_name: string;
  lat: number;
  lng: number;
  alarm_type: string;
  created: number;
  speed: number;
}

interface Props {
  notifications: Notifications;
  mapId: string;
  t(key: string, format?: object): string;
}

function NotificationCardDetail(props: Props) {
  const { notifications, t, mapId } = props;

  const [isViewMap, setViewMap] = useState(false);
  const onClickViewMap = () => {
    setViewMap(!isViewMap);
  };
  const classes = useStyles();
  return (
    <div className={isViewMap ? classes.containerViewMap : classes.container}>
      {notifications ? (
        <div className={classes.content}>
          <div className={classes.icon}>
            <IoIosInformationCircleOutline className={classes.iconInfor} />
          </div>
          <div className={classes.detailAlert}>
            <div className={classes.deviceName}>
              {notifications?.device_name}
            </div>
            <div className={classes.typeAlert}>
              {notifications?.alarm_type === 'SPEED'
                ? `${t('notifications:speed_violation')} (${
                    notifications?.speed
                  })`
                : notifications?.alarm_type === 'GEOZONE'
                ? t('notifications:geo_fence_crossed')
                : notifications?.alarm_type === 'MOVEMENT'
                ? t('notifications:start_moving')
                : notifications?.alarm_type === 'BATTERY'
                ? t('notifications:low_battery')
                : notifications?.alarm_type === 'SOS'
                ? t('notifications:sos_alert')
                : notifications?.alarm_type === 'LEFT'
                ? t('notifications:left_click')
                : t('notifications:right_click')}{' '}
              {moment(notifications?.created).format('LLL')}
            </div>
            <div className={classes.viewMap} onClick={onClickViewMap}>
              View on Map
            </div>
          </div>
          <div className={classes.statusSpeed}>
            <AiOutlineDashboard className={classes.iconDashboard} />
            <div className={classes.speed}>{notifications?.speed} Mph</div>
          </div>
        </div>
      ) : (
        <div className={classes.skeContainer}>
          <SkeletonTracker />
        </div>
      )}
      {isViewMap ? (
        <div>
          <MapCard
            lat={notifications?.lat}
            lng={notifications?.lng}
            mapId={mapId}
          />
        </div>
      ) : null}
    </div>
  );
}

export default NotificationCardDetail;
