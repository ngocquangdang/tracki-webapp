import React, { useState, useCallback, Fragment, useEffect } from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import { CSVLink } from 'react-csv';
import clsx from 'clsx';
import { lineString } from '@turf/turf';
import length from '@turf/length';
import { msToTime } from '@Utils/helper';
//components
import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { SORT_BY_OPTION, headers } from '@Containers/Reports/store/constants';
import RowTable from '../RowTable';
import HistoryInfo from './HistoryInfo';
//styles
import { useStyles, PaginationStyle, OptionViewDatePicker } from './styles';
import HistoryPath from './HistoryPath';

interface Props {
  trackers: object;
  trackerIds: any;
  historyLogs: object;
  historyLogIds: object;
  isFetchingHistoryLogs: boolean;
  fetchHistoryLogs(data: object): void;
  viewMode: string;
  t(key: string, format?: object): string;
}

function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

export default function HistoryLogs(props: Props) {
  const {
    fetchHistoryLogs,
    historyLogs,
    historyLogIds,
    trackerIds,
    trackers,
    t,
    viewMode,
    isFetchingHistoryLogs,
  } = props;
  const classes = useStyles();

  const [sortBy, setSortBy] = useState(SORT_BY_OPTION[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDateRange, setDateRange] = useState(false);
  const [trackerId, setTrackerId] = useState('');
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(30, 'days').valueOf()
  );
  const [dateTo, setDateTo] = useState(moment(new Date()).valueOf());

  useEffect(() => {
    setDateFrom(dateTime.fromDate * 1000);
    setDateTo(dateTime.toDate * 1000);
  }, [dateTime]);

  const [isPlaying, setIsPlaying] = useState(false);
  // show badge if not select tracker or datetime
  const [isBadge, setBadge] = useState(true);

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const onClickViewPort = () => {
    fetchHistoryLogs({
      trackerId: trackerId,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDateTime = obj => {
    setDateTime(obj);
    setBadge(false);
  };

  const onChangeDateFrom = date => {
    setDateFrom(moment(date).valueOf());
  };
  const onChangeDateTo = date => {
    setDateTo(moment(date).valueOf());
  };

  const onSelectOption = value => {
    ['date_range', 'specific_date'].includes(value)
      ? setDateRange(true)
      : setDateRange(false);
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const onChangeTracker = value => {
    setBadge(false);
    setTrackerId(value);
  };

  //handle Playback
  const onPlayingClick = () => {
    setIsPlaying(!isPlaying);
  };
  const onClickNext = () => {
    console.log('on Click Next');
  };

  // export CSV
  const dataCSV = [] as any;
  historyLogIds[trackerId]?.map(item => {
    const histories = historyLogs[trackerId][item];
    const date = moment(histories?.time * 1000);
    return dataCSV.push({
      date: date.format('DD-MM-YYYY'),
      time: date.format('hh:mm:ss A'),
      lat: histories?.lat,
      lng: histories?.lng,
      speed: histories?.speed,
      battery: histories?.battery,
    });
  }, []);

  //data info history
  const callTrip = useCallback(() => {
    if (!isEmpty(historyLogIds) && !isEmpty(historyLogIds[trackerId])) {
      const historyIds = historyLogIds[trackerId];
      const histories = historyLogs[trackerId];

      const coord = historyIds.reduce((coord, item) => {
        coord.push([histories[item].lng, histories[item].lat]);
        return coord;
      }, []);
      const speedItem = historyIds.reduce((speed, item) => {
        speed.push(histories[item].speed);
        return speed;
      }, []);
      const coordsPoint = coord.length > 1 ? lineString(coord) : null;
      const distance = coordsPoint
        ? length(coordsPoint, { units: 'miles' }).toFixed(4)
        : 0;
      const firstDuration = moment(
        histories[historyIds[historyIds.length - 1]].time
      );
      const endDuration = moment(histories[historyIds[0]].time);
      const seconds = firstDuration.diff(endDuration, 'seconds');
      const duration = msToTime(seconds, true);
      return {
        distance,
        duration,
        maxSpeed: Math.max(...speedItem),
        avgSpeed: getAvg(speedItem),
      };
    }
  }, [historyLogIds, historyLogs]);
  const { duration = '0h', distance = 0, maxSpeed = 0, avgSpeed = 0 } =
    callTrip() || {};

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.flexRow}>
          <div className={classes.containOption}>
            <SelectOption
              name="select_tracker"
              options={TRACKER_NAME}
              label="Select Tracker"
              value={trackerId}
              onChangeOption={onChangeTracker}
            />
            {isBadge && <div className={classes.badge} />}
          </div>
          <OptionViewDatePicker isDateRange={isDateRange}>
            <DateTimePicker
              isMobile={false}
              dateTime={dateTime}
              onChange={onChangeDateTime}
              isHistory={false}
              onSelectOption={onSelectOption}
              isGetOnSelectOption={true}
            />
            {isBadge && <div className={classes.badgeDate} />}
          </OptionViewDatePicker>
          <Button
            variant="contained"
            color="primary"
            text="View Report"
            className={`${classes.btn}`}
            onClick={onClickViewPort}
          />
        </div>
      </div>
      {!isEmpty(historyLogIds) && !isEmpty(historyLogIds[trackerId]) && (
        <>
          <HistoryInfo
            deviceName={
              trackers[trackerId]?.device_name || 'Unknow name device'
            }
            fromDate={dateTime.fromDate}
            toDate={dateTime.toDate}
            totalDuration={duration}
            distance={distance}
            maxSpeed={maxSpeed}
            avgSpeed={avgSpeed}
          />
          <div className={clsx(classes.containerTable, classes.mb)}>
            <HistoryPath
              historyLogs={historyLogs[trackerId] || []}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onChangeDateFrom={onChangeDateFrom}
              onChangeDateTo={onChangeDateTo}
              t={t}
              viewMode={viewMode}
              isPlaying={isPlaying}
              onPlayingClick={onPlayingClick}
              onClickNext={onClickNext}
              isFetching={isFetchingHistoryLogs}
            />
          </div>
        </>
      )}
      <div className={classes.containerTable}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHead}>
                  <div className={classes.textHeader}>History Logs</div>
                  <div className={classes.rightItemHead}>
                    <div className={classes.sortOtion}>
                      <SelectOption
                        name="sort_by"
                        options={SORT_BY_OPTION}
                        label="Sort By"
                        value={sortBy}
                        onChangeOption={onChangeSortBy}
                      />
                    </div>
                    <CSVLink
                      data={dataCSV}
                      headers={headers}
                      className={classes.csvLink}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        text="Epxport CSV"
                        className={`${classes.btnCsv}`}
                      />
                    </CSVLink>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!isEmpty(historyLogIds) &&
              !isEmpty(historyLogIds[trackerId]) &&
              rowsPerPage > 0
                ? historyLogIds[trackerId].slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : []
              ).map(item => {
                return (
                  <Fragment key={item}>
                    <RowTable
                      historyLogs={historyLogs[trackerId][item]}
                      mapId={`map${item}`}
                      t={t}
                    />
                  </Fragment>
                );
              })}
              {isEmpty(historyLogIds[trackerId]) && (
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
                  count={historyLogIds[trackerId]?.length || 10}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  className={`${classes.color} ${classes.flexWrap}`}
                  labelRowsPerPage="Items per page"
                />
              </tr>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
