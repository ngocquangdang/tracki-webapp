import React, { useEffect, useState, useCallback, Fragment } from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { SkeletonTracker } from '@Components/Skeletons';
import MapCard from '../MapCard';
import { getAddress } from '@Utils/helper';
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
}

function NotificationCardDetail(props: Props) {
  const classes = useStyles();
  const { notifications, mapId } = props;
  const [loading, setLoading] = useState(true);
  const [address, updateAddress] = useState<string | null>(null);
  const [isExpand, setExpand] = useState(false);

  const callApiGetAddress = useCallback(async () => {
    const address = await getAddress(notifications);
    updateAddress(address);
    setLoading(false);
  }, [updateAddress, setLoading, notifications]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onClickExpand = () => {
    setExpand(!isExpand);
  };

  return (
    <TableRow className={classes.rowContainer}>
      <TableCell className={classes.contentBody}>
        {loading || (!notifications?.lat && !notifications?.lng) ? (
          <div className={classes.skeContainer}>
            <SkeletonTracker />
          </div>
        ) : (
          <Fragment>
            <NotificationInfo>
              <TrackerName>{notifications?.device_name}</TrackerName>
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
                    notifications?.alarm_type === 'SPEED'
                      ? 'ic-alert-speed-violation.svg'
                      : notifications?.alarm_type === 'GEOZONE'
                      ? 'ic-alert-geofence.svg'
                      : notifications?.alarm_type === 'MOVEMENT'
                      ? 'ic-alert-start-moving.svg'
                      : notifications?.alarm_type === 'BATTERY'
                      ? 'ic-alert-battery.svg'
                      : notifications?.alarm_type === 'SOS'
                      ? 'ic-alert-SOS.svg'
                      : notifications?.alarm_type === 'LEFT'
                      ? 'ic-alert-left-click.svg'
                      : 'ic-alert-right-click.svg'
                  }`}
                />
              </TrackerType>
              <StatusType>
                {notifications?.alarm_type === 'SPEED'
                  ? `Speed Violation (${notifications?.speed})`
                  : notifications?.alarm_type === 'GEOZONE'
                  ? 'Geo-fence Crossed'
                  : notifications?.alarm_type === 'MOVEMENT'
                  ? 'Start Moving'
                  : notifications?.alarm_type === 'BATTERY'
                  ? 'Lower Battery'
                  : notifications?.alarm_type === 'SOS'
                  ? 'SOS Alert'
                  : notifications?.alarm_type === 'LEFT'
                  ? 'Left Click'
                  : 'Right Click'}
              </StatusType>
            </NotficationType>
            <NotificationTime>
              {moment(notifications?.created).format('L, LT')}
            </NotificationTime>
            <IconExpand
              className={isExpand ? classes.expand : classes.noExpand}
            >
              <ArrowForwardIosIcon onClick={onClickExpand} />
            </IconExpand>
          </Fragment>
        )}
      </TableCell>
      {isExpand && (
        <TableCell className={classes.cellMap}>
          <MapCard
            lat={notifications?.lat}
            lng={notifications?.lng}
            mapId={mapId}
          />
        </TableCell>
      )}
    </TableRow>
  );
}

export default NotificationCardDetail;
