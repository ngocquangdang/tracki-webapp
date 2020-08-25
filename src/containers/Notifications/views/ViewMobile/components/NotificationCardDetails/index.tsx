import React from 'react';
import moment from 'moment';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { SkeletonTracker } from '@Components/Skeletons';

import { useStyles } from './styles';

function NotificationCardDetail(props) {
  const { notifications } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
                ? `Speed Violation`
                : notifications?.alarm_type === 'GEOZONE'
                ? 'Geo-fence Crossed'
                : notifications?.alarm_type === 'MOVEMENT'
                ? 'Start Moving alert'
                : notifications?.alarm_type === 'BATTERY'
                ? 'Lower Battery'
                : notifications?.alarm_type === 'SOS'
                ? 'SOS Alert'
                : notifications?.alarm_type === 'LEFT'
                ? 'Left Click'
                : 'Right Click'}{' '}
              {moment(notifications?.create).format('LLL')}
            </div>
            <div className={classes.viewMap}>View on Map</div>
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
    </div>
  );
}

export default NotificationCardDetail;
