import React, { useState } from 'react';
import moment from 'moment';
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
interface Props {
  trackers: object;
  fetchNotificationRequest(data: object): void;
  notifications: any;
}

export default function Notification(props: Props) {
  console.log('Notification => props', props);
  const { fetchNotificationRequest, notifications } = props;
  const classes = useStyles();
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
                {(notifications && rowsPerPage > 0
                  ? notifications.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : notifications
                ).map(item => {
                  return (
                    <TableRow key={item.id}>
                      <NotificationCardDetail
                        speed={item.speed}
                        deviceName={item.device_name}
                        lat={item?.lat}
                        lng={item?.lng}
                        alarmType={item?.alarm_type}
                        created={item?.created}
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter className={classes.footer}>
                <tr>
                  <PaginationStyle
                    rowsPerPageOptions={[10, 20, 30]}
                    count={notifications?.length}
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
