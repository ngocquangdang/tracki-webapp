import React, { useEffect, useState, useCallback, Fragment } from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { UNWIREDLABS_API_KEY } from '@Definitions/app';
import { SkeletonTracker } from '@Components/Skeletons';

import {
  useStyles,
  NotificationInfo,
  NotficationType,
  NotificationTime,
  IconExpand,
  TrackerName,
  TrackerLocation,
  DetailLocation,
  TrackerType,
  StatusType,
  IconAlarmType,
} from './styles';

interface Props {
  deviceName: string;
  lat: number;
  lng: number;
  alarmType: string;
  created: number;
  speed: number;
}

function NotificationCardDetail(props: Props) {
  const classes = useStyles();
  const { deviceName, lat, lng, alarmType, created, speed } = props;
  const [loading, setLoading] = useState(true);
  const [address, updateAddress] = useState<string | null>(null);
  const callApiGetAddress = useCallback(async () => {
    if (!!lat && !!lng) {
      const { data } = await axios.get(
        `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${lat}&lon=${lng}`
      );
      updateAddress(
        data.status === 'ok' ? data.address.display_name : 'Unknow location'
      );
      setLoading(false);
    } else {
      updateAddress('Unknow location');
      setLoading(false);
    }
  }, [updateAddress, lat, lng]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  return (
    <TableCell className={classes.contentBody}>
      {loading || (!lat && !lng) ? (
        <div className={classes.skeContainer}>
          <SkeletonTracker />
        </div>
      ) : (
        <Fragment>
          <NotificationInfo>
            <TrackerName>{deviceName}</TrackerName>
            <TrackerLocation>
              <LocationIcon className={classes.iconLocation} />
              <DetailLocation>{address}</DetailLocation>
            </TrackerLocation>
          </NotificationInfo>
          <NotficationType>
            <TrackerType>
              <IconAlarmType
                alt="near_me"
                src={`/images/${
                  alarmType === 'SPEED'
                    ? 'ic-alert-speed-violation.svg'
                    : 'ic-alert-geofence.svg'
                }`}
              />
            </TrackerType>
            <StatusType>
              {alarmType === 'SPEED'
                ? `Speed Violation (${speed})`
                : 'Geo-fence Crossed (Home)'}
            </StatusType>
          </NotficationType>
          <NotificationTime>{moment(created).format('L, LT')}</NotificationTime>
          <IconExpand>
            <ArrowForwardIosIcon />
          </IconExpand>
        </Fragment>
      )}
    </TableCell>
  );
}

export default NotificationCardDetail;
