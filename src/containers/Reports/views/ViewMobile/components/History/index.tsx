import React, { useState, useCallback, Fragment, useEffect } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';
import { CSVLink } from 'react-csv';
import clsx from 'clsx';
import { lineString } from '@turf/turf';
import length from '@turf/length';
import HistoryIcon from '@material-ui/icons/History';
//components
import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { msToTime, getAvg } from '@Utils/helper';
import { SORT_BY_OPTION, headers } from '@Containers/Reports/store/constants';
import HistoryInfo from './HistoryInfo';
import HistoryLogsTable from '../History/HistoryLogsTable';
//styles
import { useStyles, Header } from './styles';
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

function HistoryReportMobile(props: Props) {
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
  const [isDateRange, setDateRange] = useState(false);
  const [trackerId, setTrackerId] = useState('');
  const [initialHistoryLogIds, setInitHistoryLogIds] = useState([]);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(30, 'days').valueOf()
  );
  const [dateTo, setDateTo] = useState(moment(new Date()).valueOf());

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
  //handle sort
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

  const { duration = '0h', distance = 0, maxSpeed = 0, avgSpeed = 0 } =
    callTrip() || {};

  return (
    <div className={classes.container}>
      <div className={classes.flexCol}>
        <Header isDateRange={isDateRange}>
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
          <div
            className={
              isDateRange ? classes.containDateRange : classes.containDatePicker
            }
          >
            <DateTimePicker
              isMobile={true}
              dateTime={dateTime}
              onChange={onChangeDateTime}
              isHistory={true}
              onSelectOption={onSelectOption}
              isGetOnSelectOption={true}
            />
            {isBadge && <div className={classes.badge} />}
          </div>
        </Header>
        {!isEmpty(historyLogIds) &&
          !isEmpty(historyLogIds[trackerId]) &&
          isFetching && (
            <Fragment>
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
            </Fragment>
          )}
        <div className={clsx(classes.flexCol, classes.pd, classes.mt)}>
          <div className={clsx(classes.flexRow, classes.mb)}>
            <HistoryIcon />
            <span className={classes.title}>History Logs</span>
          </div>
          <div className={classes.flexRow}>
            <div className={classes.sort}>
              <SelectOption
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
                disabled={
                  isEmpty(historyLogIds) && isEmpty(historyLogIds[trackerId])
                }
              />
            </CSVLink>
          </div>
        </div>
        <HistoryLogsTable
          datas={historyLogs[trackerId] || {}}
          dataIds={initialHistoryLogIds || []}
          typeCard="history"
          isFetching={isFetchingHistoryLogs}
          t={t}
        />
      </div>
    </div>
  );
}

export default HistoryReportMobile;
