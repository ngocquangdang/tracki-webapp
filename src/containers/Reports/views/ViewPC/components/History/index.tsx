//dependencies
import React, { useState, useCallback, Fragment, useEffect } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
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
import { msToTime, getAvg } from '@Utils/helper';
//components
import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { SORT_BY_OPTION, headers } from '@Containers/Reports/store/constants';
import RowTable from './RowTable';
import HistoryInfo from './HistoryInfo';
//styles
import {
  useStyles,
  PaginationStyle,
  OptionViewDatePicker,
  MessageError,
} from './styles';
const HistoryPath = dynamic(() => import('./HistoryPath'), { ssr: false });

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
  const [initialHistoryLogIds, setInitHistoryLogIds] = useState([]);
  const [dateTo, setDateTo] = useState(moment(new Date()).valueOf());
  const [textError, setTextError] = useState('');
  const [isClearOption, setClearOption] = useState(false);

  const [isPlaying, setTogglePlaying] = useState(false);
  const [currentPointId, setCurrentPointId] = useState(null);
  // show badge if not select tracker or datetime
  const [isBadge, setBadge] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    !isEmpty(historyLogIds) &&
      !isEmpty(historyLogIds[trackerId]) &&
      setInitHistoryLogIds(historyLogIds[trackerId]);
  }, [historyLogIds, trackerId]);
  // create array select option tracker
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
  // press viewport call API get data history
  const onClickViewPort = () => {
    if (!trackerId) {
      setTextError('tracker_is_invalid');
      return;
    }
    setIsFetching(true);
    fetchHistoryLogs({
      trackerId: trackerId,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
  };
  // clear filter
  const onClickClearFilter = () => {
    setClearOption(true);
    setTrackerId('');
    setDateTime({
      fromDate: moment().unix(),
      toDate: moment().unix(),
    });
    setDateFrom(moment().subtract(30, 'days').valueOf());
    setDateTo(moment(new Date()).valueOf());
    setDateRange(false);
    setBadge(true);
  };

  const hanhleClearOption = () => {
    setClearOption(false);
  };
  // change row per page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //handle change date time
  const onChangeDateTime = obj => {
    setDateTime(obj);
    setDateFrom(obj.fromDate * 1000);
    setDateTo(obj.toDate * 1000);
    if (trackerId !== '') {
      setIsFetching(true);
      fetchHistoryLogs({
        trackerId: trackerId,
        query: `from=${obj.fromDate}&to=${obj.toDate}&limit=2000&page=1&type=2`,
      });
    }
    setBadge(false);
  };

  const onChangeDateFrom = date => {
    const fromDate = moment(date).unix();
    setDateTime({
      ...dateTime,
      fromDate,
    });
    setDateFrom(moment(date).valueOf());
    fetchHistoryLogs({
      trackerId: trackerId,
      query: `from=${fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
  };
  const onChangeDateTo = date => {
    const toDate = moment(date).unix();
    setDateTime({
      ...dateTime,
      toDate,
    });
    setDateTo(moment(date).valueOf());
    fetchHistoryLogs({
      trackerId: trackerId,
      query: `from=${dateTime.fromDate}&to=${toDate}&limit=2000&page=1&type=2`,
    });
  };

  const onSelectOption = value => {
    ['date_range', 'specific_date'].includes(value)
      ? setDateRange(true)
      : setDateRange(false);
  };
  // handle sort
  const onChangeSortBy = (value: string) => {
    if (!isEmpty(historyLogIds) && !isEmpty(historyLogIds[trackerId])) {
      const history = historyLogs[trackerId];
      if (['old', 'new'].includes(value)) {
        const sortHistoryByDate = initialHistoryLogIds
          .slice()
          .sort((a, b) =>
            value === 'old'
              ? history[a].time - history[b].time
              : history[b].time - history[a].time
          );
        setInitHistoryLogIds(sortHistoryByDate);
      }
    }
    setSortBy(value);
  };

  const onChangeTracker = value => {
    setTextError('');
    setBadge(false);
    fetchHistoryLogs({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
  };

  //handle Playback
  const togglePlaying = () => setTogglePlaying(!isPlaying);
  const onClickNext = () => {
    const ids = historyLogIds[trackerId].filter(
      id => !!historyLogs[trackerId][id].lat
    );
    const indexOfId = ids.findIndex(i => i === currentPointId);
    const nextIndex =
      indexOfId === -1 || indexOfId >= ids.length - 1 ? 0 : indexOfId + 1;
    setCurrentPointId(ids[nextIndex]);
  };

  // export CSV
  const dataCSV = historyLogIds[trackerId]?.reduce((obj, item) => {
    const histories = historyLogs[trackerId][item];
    const date = moment(histories.time * 1000);
    return [
      ...obj,
      {
        date: date.format('DD-MM-YYYY'),
        time: date.format('hh:mm:ss A'),
        lat: histories.lat,
        lng: histories.lng,
        speed: histories.speed,
        battery: histories.battery,
      },
    ];
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
  }, [historyLogIds, historyLogs, trackerId]);

  const { 
    duration = '0h', 
    distance = 0, 
    maxSpeed = 0, 
    avgSpeed = 0,
  } = callTrip() || {};

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.flexRow}>
          <div className={classes.containOption}>
            <SelectOption
              t={t}
              name="select_tracker"
              options={TRACKER_NAME}
              label="Select Tracker"
              value={trackerId}
              onChangeOption={onChangeTracker}
            />
            {!!textError && (
              <MessageError className={classes.errorText}>
                {t(`notifications:${textError}`)}
              </MessageError>
            )}
            {isBadge && <div className={classes.badge} />}
          </div>
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
            {isBadge && <div className={classes.badgeDate} />}
          </OptionViewDatePicker>
          <Button
            variant="contained"
            color="primary"
            text="Clear"
            className={`${classes.btn}`}
            onClick={onClickClearFilter}
          />
          <div className={classes.widthM} />
          <Button
            variant="contained"
            color="primary"
            text="View Report"
            className={`${classes.btn}`}
            onClick={onClickViewPort}
            isLoading={isFetchingHistoryLogs}
          />
        </div>
      </div>
      {!isEmpty(historyLogIds) &&
        !isEmpty(historyLogIds[trackerId]) &&
        isFetching && (
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
                historyLogs={historyLogs[trackerId] || {}}
                historyLogIds={historyLogIds[trackerId] || []}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onChangeDateFrom={onChangeDateFrom}
                onChangeDateTo={onChangeDateTo}
                t={t}
                viewMode={viewMode}
                isPlaying={isPlaying}
                togglePlaying={togglePlaying}
                onClickNext={onClickNext}
                isFetching={isFetchingHistoryLogs}
                currentPointId={currentPointId}
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
                        t={t}
                        name="sort_by"
                        options={SORT_BY_OPTION}
                        label="Sort By"
                        value={sortBy}
                        onChangeOption={onChangeSortBy}
                      />
                    </div>
                    <CSVLink
                      data={dataCSV || []}
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
                ? initialHistoryLogIds.slice(
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
