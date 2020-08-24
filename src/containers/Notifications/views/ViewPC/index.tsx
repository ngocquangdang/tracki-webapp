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
  notifications: Notifications;
  notificationsIds: number[];
}

export default function Notification(props: Props) {
  const {
    fetchNotificationRequest,
    notifications,
    notificationsIds,
    trackerIds,
    trackers,
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

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );
  const [isDateRange, setDateRange] = useState(false);
  const [dataFilter, setDataFilter] = useState(true);

  const [trackerName, setTrackerName] = useState('');

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
    console.log('export csv');
  };

  const onClickViewPort = () => {
    fetchNotificationRequest({
      alarm_types: 'all',
      limit: 500,
      page: 1,
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDateOption = value => {
    value === 'date_range' || value === 'specific_date'
      ? setDateRange(true)
      : setDateRange(false);
    if (value !== 'date_range' && value !== 'specific_date') {
      const filterDate = notificationsIds.filter(
        item => notifications[item]?.created >= value * 1000
      );
      setInitialNotificationsIds(filterDate);
    }
  };

  const onChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    const filterDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= selectedDateTo.valueOf() &&
        notifications[item]?.created >= fromDate.valueOf()
    );
    setInitialNotificationsIds(filterDate);
    setSelectedDateFrom(fromDate);
  };

  const onChangeDateTo = date => {
    const toDate = moment(date.getTime());
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= toDate.valueOf() &&
        notifications[item]?.created >= setSelectedDateFrom.valueOf()
    );
    setInitialNotificationsIds(filterNotificationsByDate);
    setSelectedDateTo(toDate);
  };

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    const filterNotificationsByDate = notificationsIds.filter(
      item =>
        notifications[item]?.created <= moment(date.getTime()).valueOf() &&
        notifications[item]?.created >= moment(selectedSpecificDate).valueOf()
    );
    setInitialNotificationsIds(filterNotificationsByDate);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSortBy = (value: string) => {
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

  const onChangeAlarmType = (value: string) => {
    setAlarmType(value);
    const filterType = notificationsIds.filter(item =>
      notifications[item]?.alarm_type.includes(value)
    );
    filterType.length === 0 ? setDataFilter(false) : setDataFilter(true);
    value === 'all'
      ? setInitialNotificationsIds(notificationsIds)
      : setInitialNotificationsIds(filterType);
  };

  const onChangeTracker = value => {
    const filterTracker = notificationsIds.filter(
      item => notifications[item]?.device_id === value
    );
    filterTracker.length === 0 ? setDataFilter(false) : setDataFilter(true);
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
            <Title>Notifications</Title>
          </LogoNotification>
          <ListOptionView>
            <OptionView>
              <SelectOption
                name="select_tracker"
                options={TRACKER_NAME}
                label="Select Tracker"
                value={trackerName}
                onChangeOption={onChangeTracker}
              />
            </OptionView>
            <OptionView>
              <SelectOption
                name="alarm_type"
                options={ALARM_TYPES}
                label="Select Type"
                value={alarmType}
                onChangeOption={onChangeAlarmType}
              />
            </OptionView>
            <OptionViewDatePicker isDateRange={isDateRange}>
              <DateTimePicker
                isMobile={false}
                onChangeDateFrom={onChangeDateFrom}
                onChangeDateTo={onChangeDateTo}
                onChangeSpecificDate={onChangeSpecificDate}
                onChangeSpecificTimeTo={onChangeSpecificTimeTo}
                onChangeDateOption={onChangeDateOption}
                valueDateFrom={selectedDateFrom}
                valueDateTo={selectedDateTo}
                valueSpecificDate={selectedSpecificDate}
                valueSpecificTimeTo={selectedSpecificTimeTo}
              />
            </OptionViewDatePicker>
            <Button
              variant="contained"
              color="primary"
              text="View Report"
              className={`${classes.btn}`}
              onClick={onClickViewPort}
            />
          </ListOptionView>
        </HeaderNotification>
        <NotificationContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.header}>
                    <div className={classes.textHeader}>Notfications</div>
                    <div className={classes.rightItemHead}>
                      <SortOption>
                        <SelectOption
                          name="sort_by"
                          options={SORT_BY_OPTION}
                          label="Sort By"
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
                          text="Export CSV"
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
                      />
                    </Fragment>
                  );
                })}
                {dataFilter ? null : (
                  <TableRow>
                    <TableCell className={classes.dataFilter}>
                      No data filter
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
                    labelRowsPerPage="Items per page:"
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
