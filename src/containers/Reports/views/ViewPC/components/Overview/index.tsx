import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { RiForbid2Line } from 'react-icons/ri';
import moment from 'moment';

//components
import SelectOption from '@Components/selections';
import Card from '../LayoutCard';

import { useStyles } from './styles';
import { Skeleton } from '@material-ui/lab';

interface Props {
  trackers: object;
  trackerIds: any;
  notificationIds: number[];
  notifications: object;
  fetchNotificationUnread(query: string): void;
  fetchHistoryStop(data: object): void;
  historyStops: object;
  historyStopIds: object;
  profile: any;
  isFetchingDataNoti: boolean;
  isFetchingDataStop: boolean;
  isFetchingTracker: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function OverviewReport(props: Props) {
  const classes = useStyles();
  const {
    profile,
    fetchNotificationUnread,
    notificationIds,
    notifications,
    trackerIds,
    trackers,
    fetchHistoryStop,
    historyStopIds,
    historyStops,
    isFetchingDataNoti,
    isFetchingDataStop,
    isFetchingTracker,
  } = props;

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  const [trackerName, setTrackerName] = useState('');
  const fromDate = moment(new Date()).subtract(48, 'hours').unix();
  const toDate = moment(new Date()).unix();
  useEffect(() => {
    if (profile && profile.account_id) {
      fetchNotificationUnread(
        `alarm_types=all&limit=5&page=1&read_status=unread`
      );
    }
  }, [fetchNotificationUnread, profile]);

  useEffect(() => {
    if (trackerIds && trackerIds.length > 0 && TRACKER_NAME.length > 0) {
      setTrackerName(TRACKER_NAME[0].value);
      fetchHistoryStop({
        trackerId: TRACKER_NAME[0].value,
        query: `from=${fromDate}&to=${toDate}&limit=2000&page=1&type=2`,
      });
    }
  }, [trackerIds]);

  const onChangeTracker = value => {
    setTrackerName(value);
    fetchHistoryStop({
      trackerId: value,
      query: `from=${fromDate}&to=${toDate}&limit=2000&page=1&type=2`,
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Card
          typeCard="notifications"
          iconHeader={<NotificationsIcon className={classes.icon} />}
          label="Unread Notifications"
          dataIds={notificationIds}
          datas={notifications}
          isFetching={isFetchingDataNoti}
          {...props}
        />
      </div>
      <div className={classes.card}>
        <Card
          typeCard="recent"
          iconHeader={<RiForbid2Line className={classes.icon} />}
          label="Recent Stops(48 hours)"
          dataIds={historyStopIds[trackerName] || []}
          datas={historyStops[trackerName] || {}}
          rightItemHead={
            isFetchingTracker ? (
              <Skeleton
                width={150}
                height={50}
                style={{ backgroundColor: '#f2f2f2' }}
              />
            ) : (
              <div>
                <SelectOption
                  name="select_tracker"
                  options={TRACKER_NAME}
                  label="Select Tracker"
                  value={trackerName}
                  onChangeOption={onChangeTracker}
                />
              </div>
            )
          }
          isFetching={isFetchingDataStop}
          {...props}
        />
      </div>
      <div className={classes.card}>
        <Card
          typeCard="battery"
          iconHeader={
            <img
              className={classes.iconBattery}
              alt=""
              src="/images/icon-battery.png"
            />
          }
          label="Bettery Level"
          dataIds={trackerIds}
          datas={trackers}
          isFetching={isFetchingTracker}
          {...props}
        />
      </div>
    </div>
  );
}

export default OverviewReport;
