//dependencies
import React, { useState, useEffect } from 'react';
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
//components
import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { SORT_BY_OPTION, headers } from '@Containers/Reports/store/constants';
import RowTable from './SpeedTable';
//styles
import {
  useStyles,
  PaginationStyle,
  OptionViewDatePicker,
  MessageError,
} from './styles';

interface Props {
  trackers: object;
  trackerIds: any;
  fetchHistorySpeeds(data: object): void;
  historySpeeds: object;
  historySpeedIds: object;
  isFetchingHistorySpeed: boolean;
  viewMode: string;
  t(key: string, format?: object): string;
}

export default function ReportSpeeds(props: Props) {
  const {
    fetchHistorySpeeds,
    historySpeeds,
    historySpeedIds,
    trackerIds,
    trackers,
    t,
    isFetchingHistorySpeed,
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

  const [initialHistoryLogIds, setInitHistoryLogIds] = useState([]);
  const [isClearOption, setClearOption] = useState(false);
  const [textError, setTextError] = useState('');

  // show badge if not select tracker or datetime
  const [isBadge, setBadge] = useState(true);
  useEffect(() => {
    !isEmpty(historySpeedIds) &&
      !isEmpty(historySpeedIds[trackerId]) &&
      setInitHistoryLogIds(historySpeedIds[trackerId]);
  }, [historySpeedIds, trackerId]);
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
    fetchHistorySpeeds({
      trackerId: trackerId,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
  };
  // clear filter
  const onClearFilter = () => {
    setClearOption(true);
    setTrackerId('');
    setDateTime({
      fromDate: moment().unix(),
      toDate: moment().unix(),
    });
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
    if (trackerId !== '') {
      fetchHistorySpeeds({
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
  // handle sort
  const onChangeSortBy = (value: string) => {
    if (!isEmpty(historySpeedIds) && !isEmpty(historySpeedIds[trackerId])) {
      const history = historySpeeds[trackerId];
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
    fetchHistorySpeeds({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
  };

  // export CSV
  const dataCSV = historySpeedIds[trackerId]?.reduce((obj, item) => {
    const histories = historySpeeds[trackerId][item];
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
            onClick={onClearFilter}
          />
          <div className={classes.widthM} />
          <Button
            variant="contained"
            color="primary"
            text="View Report"
            className={`${classes.btn}`}
            onClick={onClickViewPort}
            isLoading={isFetchingHistorySpeed}
          />
        </div>
      </div>
      <div className={classes.containerTable}>
        <div className={classes.cellHead}>
          <div className={classes.textHeader}>Speed Logs</div>
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
        </div>
        <TableContainer>
          <Table className={classes.muiTable}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell} width={'20%'}>
                  Date and Time
                </TableCell>
                <TableCell className={classes.cell} width={'20%'}>
                  Monitored Speed
                </TableCell>
                <TableCell className={classes.cell}>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!isEmpty(historySpeedIds) &&
              !isEmpty(historySpeedIds[trackerId]) &&
              rowsPerPage > 0
                ? initialHistoryLogIds.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : []
              ).map(item => (
                <RowTable
                  historySpeeds={historySpeeds[trackerId][item]}
                  mapId={`map${item}`}
                  t={t}
                  key={item}
                />
              ))}
              {isEmpty(historySpeedIds[trackerId]) && (
                <TableRow>
                  <TableCell className={classes.noContent} colSpan={6}>
                    {t('notifications:no_data')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className={classes.footer}>
              <tr>
                <PaginationStyle
                  rowsPerPageOptions={[10, 20, 30]}
                  count={historySpeedIds[trackerId]?.length || 10}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  className={classes.color}
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
