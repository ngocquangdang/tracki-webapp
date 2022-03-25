import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { RiForbid2Line } from 'react-icons/ri';
import { Skeleton } from '@material-ui/lab';

//components
import Card from '../LayoutCardOverview';
import SelectOption from '@Components/selections';

//styles
import { useStyles } from './styles';

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

function OverviewReportMobile(props: Props) {
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
    t,
  } = props;

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  const [isFetchHistory, setIsFetchHistory] = useState(false);
  const [trackerName, setTrackerName] = useState('');

  const fromDate = moment(new Date()).subtract(48, 'hours').unix();
  const toDate = moment(new Date()).unix();

  useEffect(() => {
    if (profile && profile.account_id) {
      fetchNotificationUnread(
        'alarm_types=all&limit=5&page=1&read_status=unread'
      );
    }
  }, [fetchNotificationUnread, profile]);

  const onChangeTracker = value => {
    setIsFetchHistory(true);
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
          typeCard="stop"
          iconHeader={<RiForbid2Line className={classes.icon} />}
          label="Recent Stops"
          dataIds={historyStopIds[trackerName] || []}
          datas={historyStops[trackerName] || {}}
          isFetching={isFetchingDataStop}
          rightItemHead={
            isFetchingTracker ? (
              <Skeleton
                width={'100%'}
                height={60}
                style={{ backgroundColor: '#f2f2f2' }}
              />
            ) : (
              <div className={classes.selection}>
                <SelectOption
                  t={t}
                  name="select_tracker"
                  options={TRACKER_NAME}
                  label="Select Tracker"
                  value={trackerName}
                  onChangeOption={onChangeTracker}
                />
                {!isFetchHistory && <span className={classes.badge} />}
              </div>
            )
          }
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
              src="static/images/icon-battery.png"
            />
          }
          label="Battery Level"
          dataIds={trackerIds}
          datas={trackers}
          isFetching={isFetchingTracker}
          {...props}
        />
      </div>
    </div>
  );
}

export default OverviewReportMobile;
