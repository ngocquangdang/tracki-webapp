import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';

import { Notifications as NotificationsIcon } from '@material-ui/icons';

import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { MainLayout } from '@Layouts';
import { ALARM_TYPES, SORT_BY_OPTION } from '../../store/constants';

import NotificationCardDetail from './components/NotificationCardDetail';
import { firebaseLogEventRequest } from '@Utils/firebase';
import {
  useStyles,
  NotificationContainer,
  PaginationStyle,
  IconNotification,
  LogoNotification,
  ListOptionView,
  HeaderNotification,
  Title,
  SortOption,
  OptionView,
  OptionViewDatePicker,
  MessageError,
} from './styles';

interface Notifications {
  id: number;
  deviceName: string;
  lat: number;
  lng: number;
  alarmType: string;
  created: number;
  speed: number;
}
interface Tracker {
  device_name: string;
}
interface Props {
  trackers: Tracker;
  trackerIds: any;
  fetchNotificationRequest(data: object): void;
  t(key: string, format?: object): string;
  notifications: Notifications;
  notificationsIds: number[];
  isLoading?: boolean;
}

export default function Notification(props: Props) {
  const {
    fetchNotificationRequest,
    notifications,
    notificationsIds,
    trackerIds,
    trackers,
    t,
    isLoading,
  } = props;
  const classes = useStyles();

  const [initialNotifications, setInitialNotifications] = useState({});
  const [initialNotificationsIds, setInitialNotificationsIds] = useState<
    number[]
  >([]);

  const [alarmType, setAlarmType] = useState(ALARM_TYPES[0].value);
  const [sortBy, setSortBy] = useState(SORT_BY_OPTION[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const [isDateRange, setDateRange] = useState(false);
  const [isDataFilter, setIsDataFilter] = useState(true);
  const [textError, setTextError] = useState('');
  const [trackerName, setTrackerName] = useState('');
  const [isClearOption, setClearOption] = useState(false);

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({ value: item, content: trackers[item].device_name });
    return result;
  }, []);

  useEffect(() => {
    setInitialNotificationsIds(notificationsIds);
    setInitialNotifications(notifications);
  }, [notificationsIds, notifications]);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const onClickExportCsv = () => {
    firebaseLogEventRequest('notification_page', 'export_csv_notifcation');
    console.log('export csv');
  };

  const onClickViewPort = () => {
    if (!trackerName) {
      setTextError('tracker_is_invalid');
      return;
    }
    fetchNotificationRequest({
      alarm_types: 'all',
      limit: 500,
      page: 1,
    });
    setIsDataFilter(true);
    firebaseLogEventRequest('notification_page', 'filter_report_notification');
  };

  // clear filter
  const onClearFilter = () => {
    setClearOption(true);
    setTrackerName('');
    setAlarmType(ALARM_TYPES[0].value);
    setDateTime({
      fromDate: moment().unix(),
      toDate: moment().unix(),
    });
    setDataFilter(true);
    setDateRange(false);
  };

  const hanhleClearOption = () => {
    setClearOption(false);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDateTime = obj => {
    firebaseLogEventRequest(
      'notification_page',
      'select_date_range_notification'
    );
    const { fromDate, toDate } = obj || dateTime;
    setDateTime(obj);
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        moment(notifications[item]?.created).unix() <= toDate.valueOf() &&
        moment(notifications[item]?.created).unix() >= fromDate.valueOf()
    );
    filterNotificationsByDate.length === 0
      ? setIsDataFilter(false)
      : setIsDataFilter(true);

    setInitialNotificationsIds(filterNotificationsByDate);
  };

  const onSelectOption = value => {
    value === 'date_range' || value === 'specific_date'
      ? setDateRange(true)
      : setDateRange(false);
  };

  const onChangeSortBy = (value: string) => {
    firebaseLogEventRequest(
      'notification_page',
      `sort_notification_by_${value}`
    );
    if (value === 'old' || value === 'new') {
      const sortedNotificationsByDate = notificationsIds
        .slice()
        .sort((a, b) =>
          value === 'old'
            ? notifications[a]?.created - notifications[b]?.created
            : notifications[b]?.created - notifications[a]?.created
        );
      setInitialNotificationsIds(sortedNotificationsByDate);
    } else {
      const filterIsRead = notificationsIds.filter(item =>
        value === 'read'
          ? notifications[item]?.read === true
          : notifications[item]?.read === false
      );
      setInitialNotificationsIds(filterIsRead);
    }
    setSortBy(value);
  };

  const sendFirebaseNotificationType = (type: string) => {
    switch (type) {
      case 'MOVEMENT':
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_start_moing_type'
        );
        break;
      case 'SPEED':
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_speed_violation_type'
        );
        break;
      case 'GEOZONE':
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_geofence_crossed_type'
        );
        break;
      case 'BATTERY':
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_low_battery_alert_type'
        );
        break;
      case 'SOS':
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_sos_type'
        );
        break;
      default:
        firebaseLogEventRequest(
          'select_alarm_type_notification',
          'alarm_notification_all_type'
        );
        break;
    }
  };
  const onChangeAlarmType = (value: string) => {
    sendFirebaseNotificationType(value);
    firebaseLogEventRequest(
      'notification_page',
      'select_alarm_type_notification'
    );
    setAlarmType(value);
    const filterType = notificationsIds.filter(item =>
      notifications[item]?.alarm_type.includes(value)
    );
    filterType.length === 0 ? setIsDataFilter(false) : setIsDataFilter(true);
    value === 'all'
      ? setInitialNotificationsIds(notificationsIds)
      : setInitialNotificationsIds(filterType);
  };

  const onChangeTracker = value => {
    setTextError('');
    const filterTracker = notificationsIds.filter(
      item => notifications[item]?.device_id === value
    );
    filterTracker.length === 0 ? setIsDataFilter(false) : setIsDataFilter(true);
    setInitialNotificationsIds(filterTracker);
    setTrackerName(value);
  };

  const headers = [
    { label: 'DATE', key: 'date' },
    { label: 'TIME', key: 'time' },
    { label: 'DEVICE NAME', key: 'deviceName' },
    { label: 'ALERT TYPE', key: 'alertType' },
    { label: 'EVENT MESSAGE', key: 'eventMessage' },
    { label: 'SPEED', key: 'speed' },
  ];
  const dataCSV = [] as any;
  notificationsIds.map(
    item =>
      dataCSV.push({
        date: moment(notifications[item]?.created).format('DD-MM-YYYY'),
        time: moment(notifications[item]?.created).format('hh:mm:ss'),
        deviceName: notifications[item]?.device_name,
        alertType: notifications[item]?.alarm_type,
        eventMessage: notifications[item]?.message,
        speed: notifications[item]?.speed,
      }),
    []
  );

  return (
    <MainLayout hasFooter={false}>
      <div>
        <HeaderNotification>
          <LogoNotification>
            <IconNotification>
              <NotificationsIcon className={classes.iconHeader} />
            </IconNotification>
            <Title>{t('notifications:notification')}</Title>
          </LogoNotification>
          <ListOptionView>
            <OptionView>
              <SelectOption
                t={t}
                name="select_tracker"
                options={TRACKER_NAME}
                label={t('notifications:select_tracker')}
                value={trackerName}
                onChangeOption={onChangeTracker}
              />
              {!!textError && (
                <MessageError className={classes.errorText}>
                  {t(`notifications:${textError}`)}
                </MessageError>
              )}
            </OptionView>
            <OptionView>
              <SelectOption
                t={t}
                name="alarm_type"
                options={ALARM_TYPES}
                label={t('notifications:select_type')}
                value={alarmType}
                onChangeOption={onChangeAlarmType}
              />
            </OptionView>
            <OptionViewDatePicker isDateRange={isDateRange}>
              <DateTimePicker
                t={t}
                isMobile={false}
                dateTime={dateTime}
                onChange={onChangeDateTime}
                isHistory={false}
                onSelectOption={onSelectOption}
                isGetOnSelectOption={true}
                isClear={isClearOption}
                onClear={hanhleClearOption}
              />
            </OptionViewDatePicker>
            <Button
              variant="contained"
              color="primary"
              text={t('notifications:clear')}
              className={`${classes.btn}`}
              onClick={onClearFilter}
            />
            <div className={classes.widthM} />
            <Button
              variant="contained"
              color="primary"
              text={t('notifications:view_report')}
              className={`${classes.btn}`}
              onClick={onClickViewPort}
              isLoading={isLoading}
            />
          </ListOptionView>
        </HeaderNotification>
        <NotificationContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.header}>
                    <div className={classes.textHeader}>Notifications</div>
                    <div className={classes.rightItemHead}>
                      <SortOption>
                        <SelectOption
                          t={t}
                          name="sort_by"
                          options={SORT_BY_OPTION}
                          label={t('notifications:sort_by')}
                          value={sortBy}
                          onChangeOption={onChangeSortBy}
                        />
                      </SortOption>
                      <CSVLink
                        data={dataCSV}
                        headers={headers}
                        className={classes.csvLink}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          text={t('notifications:export_csv')}
                          className={`${classes.btnCsv}`}
                          onClick={onClickExportCsv}
                        />
                      </CSVLink>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(initialNotificationsIds && rowsPerPage > 0
                  ? initialNotificationsIds.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : initialNotificationsIds
                ).map(item => {
                  return (
                    <Fragment key={item}>
                      <NotificationCardDetail
                        notifications={initialNotifications[item]}
                        mapId={`map${item}`}
                        t={t}
                      />
                    </Fragment>
                  );
                })}
                {!isDataFilter && (
                  <TableRow>
                    <TableCell className={classes.dataFilter}>
                      {t('notifications:no_data')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className={classes.footer}>
                <tr>
                  <PaginationStyle
                    rowsPerPageOptions={[10, 20, 30]}
                    count={initialNotificationsIds.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    className={`${classes.color} ${classes.flexWrap}`}
                    labelRowsPerPage={t('notifications:item_per_page')}
                  />
                </tr>
              </TableFooter>
            </Table>
          </TableContainer>
        </NotificationContainer>
      </div>
    </MainLayout>
  );
}
