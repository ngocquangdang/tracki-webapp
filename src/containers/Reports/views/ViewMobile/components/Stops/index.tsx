import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { CSVLink } from 'react-csv';
import clsx from 'clsx';
import { RiForbid2Line } from 'react-icons/ri';
//components
import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { SORT_BY_OPTION, headers } from '@Containers/Reports/store/constants';
import StopsTable from './StopsTable';
//styles
import { useStyles, Header } from './styles';

interface Props {
  trackers: object;
  trackerIds: any;
  fetchHistoryStop(data: object): void;
  historyStops: object;
  historyStopIds: object;
  isFetchingDataStop: boolean;
  viewMode: string;
  t(key: string, format?: object): string;
}

function ReportStopsMobile(props: Props) {
  const {
    fetchHistoryStop,
    historyStops,
    historyStopIds,
    trackerIds,
    trackers,
    isFetchingDataStop,
    t,
  } = props;
  const classes = useStyles();
  const [sortBy, setSortBy] = useState(SORT_BY_OPTION[0].value);
  const [isDateRange, setDateRange] = useState(false);
  const [trackerId, setTrackerId] = useState('');
  const [initStopLogIds, setInitStopLogIds] = useState([]);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  // show badge if not select tracker or datetime
  const [isBadge, setBadge] = useState(true);
  useEffect(() => {
    !isEmpty(historyStopIds) &&
      !isEmpty(historyStopIds[trackerId]) &&
      setInitStopLogIds(historyStopIds[trackerId]);
  }, [historyStopIds, trackerId]);
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
    if (trackerId !== '') {
      fetchHistoryStop({
        trackerId: trackerId,
        query: `from=${obj.fromDate}&to=${obj.toDate}&limit=2000&page=1&type=2`,
      });
    }
    setBadge(false);
  };

  const onSelectOption = value => {
    ['date_range', 'specific_date'].includes(value)
      ? setDateRange(true)
      : setDateRange(false);
  };
  //handle sort
  const onChangeSortBy = (value: string) => {
    if (!isEmpty(historyStopIds) && !isEmpty(historyStopIds[trackerId])) {
      const history = historyStops[trackerId];
      if (['old', 'new'].includes(value)) {
        const sortHistoryByDate = initStopLogIds
          .slice()
          .sort((a, b) =>
            value === 'old'
              ? history[a].time - history[b].time
              : history[b].time - history[a].time
          );
        setInitStopLogIds(sortHistoryByDate);
      }
    }
    setSortBy(value);
  };

  const onChangeTracker = value => {
    setBadge(false);
    fetchHistoryStop({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
  };

  // export CSV
  const dataCSV = historyStopIds[trackerId]?.reduce((obj, item) => {
    const histories = historyStops[trackerId][item];
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

  return (
    <div className={classes.container}>
      <div className={classes.flexCol}>
        <Header isDateRange={isDateRange}>
          <div className={classes.containOption}>
            <SelectOption
              t={t}
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
              t={t}
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
        <div className={clsx(classes.flexCol, classes.pd, classes.mt)}>
          <div className={clsx(classes.flexRow, classes.mb)}>
            <RiForbid2Line className={classes.forbidIcon} />
            <span className={classes.title}>Stops</span>
          </div>
          <div className={classes.flexRow}>
            <div className={classes.sort}>
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
                disabled={
                  isEmpty(historyStopIds) && isEmpty(historyStopIds[trackerId])
                }
              />
            </CSVLink>
          </div>
        </div>
        <StopsTable
          datas={historyStops[trackerId] || {}}
          dataIds={initStopLogIds || []}
          typeCard="stop"
          isFetching={isFetchingDataStop}
          t={t}
        />
      </div>
    </div>
  );
}

export default ReportStopsMobile;
