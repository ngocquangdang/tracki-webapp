import React, { useState } from 'react';
import moment from 'moment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
// import { TiLocationArrowOutline } from 'react-icons/ti';
import { AiOutlineDashboard } from 'react-icons/ai';

import {
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';

import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { MainLayout } from '@Layouts';
import { ALARM_TYPES, SORT_BY_OPTION } from '../store/constants';
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
}

export default function Notification(props) {
  console.log('Notification => props', props);
  const classes = useStyles();
  const [initialNotification, setInitialNotification] = useState<number[]>([]);
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

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };
  const onClickExportCsv = () => {
    console.log('export csv');
    //comment pass build
    setInitialNotification([]);
  };
  const onClickViewPort = () => {
    console.log('view report');
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDateOption = value => {
    console.log(value);
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
                name="date_format"
                options={ALARM_TYPES}
                label="Select Type"
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
            <OptionView>
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
            </OptionView>
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
                  <TableCell className={classes.contentBody}>
                    <NotificationInfo>
                      <TrackerName>Amanda Smith Yacht Rental 1</TrackerName>
                      <TrackerLocation>
                        <LocationIcon className={classes.iconLocation} />
                        <DetailLocation>
                          Polaris High School, Lookout Mountain, Phoenix,
                          Maricopa County, Arizona, 85032, USA{' '}
                        </DetailLocation>
                      </TrackerLocation>
                    </NotificationInfo>
                    <NotficationType>
                      <TrackerType>
                        <AiOutlineDashboard className={classes.iconNearMe} />
                        <WarningIcon className={classes.iconWarning} />
                      </TrackerType>
                      <StatusType>Speed Violation (117 MPH)</StatusType>
                    </NotficationType>
                    <NotificationTime>08/04/2020 07:47 AM</NotificationTime>
                    <IconExpand>
                      <ArrowForwardIosIcon />
                    </IconExpand>
                  </TableCell>
                  <TableCell className={classes.contentBody}>
                    <NotificationInfo>
                      <TrackerName>Amanda Smith Yacht Rental 1</TrackerName>
                      <TrackerLocation>
                        <LocationIcon className={classes.iconLocation} />
                        <DetailLocation>
                          Polaris High School, Lookout Mountain, Phoenix,
                          Maricopa County, Arizona, 85032, USA{' '}
                        </DetailLocation>
                      </TrackerLocation>
                    </NotificationInfo>
                    <NotficationType>
                      <TrackerType>
                        <AiOutlineDashboard className={classes.iconNearMe} />
                        <WarningIcon className={classes.iconWarning} />
                      </TrackerType>
                      <StatusType>Speed Violation (117 MPH)</StatusType>
                    </NotficationType>
                    <NotificationTime>08/04/2020 07:47 AM</NotificationTime>
                    <IconExpand>
                      <ArrowForwardIosIcon />
                    </IconExpand>
                  </TableCell>
                  <TableCell className={classes.contentBody}>
                    <NotificationInfo>
                      <TrackerName>Amanda Smith Yacht Rental 1</TrackerName>
                      <TrackerLocation>
                        <LocationIcon className={classes.iconLocation} />
                        <DetailLocation>
                          Polaris High School, Lookout Mountain, Phoenix,
                          Maricopa County, Arizona, 85032, USA{' '}
                        </DetailLocation>
                      </TrackerLocation>
                    </NotificationInfo>
                    <NotficationType>
                      <TrackerType>
                        <AiOutlineDashboard className={classes.iconNearMe} />
                        <WarningIcon className={classes.iconWarning} />
                      </TrackerType>
                      <StatusType>Speed Violation (117 MPH)</StatusType>
                    </NotficationType>
                    <NotificationTime>08/04/2020 07:47 AM</NotificationTime>
                    <IconExpand>
                      <ArrowForwardIosIcon />
                    </IconExpand>
                  </TableCell>
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
