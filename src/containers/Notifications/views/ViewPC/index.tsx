import React, { useState, useEffect, useCallback, Fragment } from 'react';
import moment from 'moment';
import axios from 'axios';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';

import {
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
} from '@material-ui/icons';
import { UNWIREDLABS_API_KEY } from '@Definitions/app';

import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { MainLayout } from '@Layouts';
import { ALARM_TYPES, SORT_BY_OPTION } from '../../store/constants';

import {
  useStyles,
  NotificationContainer,
  PaginationStyle,
  IconNotification,
  LogoNotification,
  ListOptionView,
  HeaderNotification,
  SortOption,
  Title,
  OptionView,
  OptionViewDatePicker,
  NotificationInfo,
  NotficationType,
  NotificationTime,
  IconExpand,
  TrackerName,
  TrackerLocation,
  DetailLocation,
  TrackerType,
  StatusType,
} from './styles';

interface Props {
  trackers: object;
  fetchNotificationRequest(data: object): void;
  notifications: any;
}

export default function Notification(props: Props) {
  console.log('Notification => props', props);
  const { fetchNotificationRequest, notifications } = props;
  const classes = useStyles();
  const [initialNotification, setInitialNotification] = useState<any>([]);
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

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };
  const getAddress = useCallback(
    async (lat, lng) => {
      const { data } = await axios.get(
        `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${lat}&lon=${lng}`
      );
      const add = notifications.reduce((result, item) => {
        result.push({ ...item, address: data?.address.display_name });
        return result;
      }, []);
      setInitialNotification(add);
      return data;
    },
    [notifications]
  );

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      Promise.all(notifications.map(item => getAddress(item.lat, item.lng)));
    }
  }, [notifications, getAddress]);
  const onClickExportCsv = () => {
    console.log('export csv');
    //comment pass build
    setInitialNotification([]);
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
  };
  const onChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    setSelectedDateFrom(fromDate);
  };

  const onChangeDateTo = date => {
    const toDate = moment(date.getTime());
    setSelectedDateTo(toDate);
  };

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const onChangeAlarmType = (value: string) => {
    setAlarmType(value);
  };

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
                options={ALARM_TYPES}
                label="Select Tracker"
                value={alarmType}
                onChangeOption={value => console.log(value)}
              />
            </OptionView>
            <OptionView>
              <SelectOption
                name="date_format"
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
                      <Button
                        variant="contained"
                        color="primary"
                        text="Export CSV"
                        className={`${classes.btnCsv}`}
                        onClick={onClickExportCsv}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {(rowsPerPage > 0 && initialNotification.length > 0
                    ? initialNotification.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : initialNotification
                  ).map(item => {
                    return (
                      <Fragment key={item?.id}>
                        <TableCell className={classes.contentBody}>
                          <NotificationInfo>
                            <TrackerName>{item?.device_name}</TrackerName>
                            <TrackerLocation>
                              <LocationIcon className={classes.iconLocation} />
                              <DetailLocation>{item?.address}</DetailLocation>
                            </TrackerLocation>
                          </NotificationInfo>
                          <NotficationType>
                            <TrackerType>
                              <img
                                alt="near_me"
                                className={classes.iconNearMe}
                                src="/images/ic-alert-speed-violation.svg"
                              />
                            </TrackerType>
                            <StatusType>{item?.alarm_type}</StatusType>
                          </NotficationType>
                          <NotificationTime>
                            {moment(item?.created)}
                          </NotificationTime>
                          <IconExpand>
                            <ArrowForwardIosIcon />
                          </IconExpand>
                        </TableCell>
                      </Fragment>
                    );
                  })}
                </TableRow>
              </TableBody>
              <TableFooter className={classes.footer}>
                <tr>
                  <PaginationStyle
                    rowsPerPageOptions={[10, 20, 30]}
                    count={initialNotification.length}
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
