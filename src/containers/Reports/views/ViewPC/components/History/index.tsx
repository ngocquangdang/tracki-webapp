import React, { useState } from 'react';
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

import { Button } from '@Components/buttons';
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import { SORT_BY_OPTION } from '@Containers/Reports/store/constants';

import { useStyles, PaginationStyle, OptionViewDatePicker } from './styles';

interface Props {
  trackers: object;
  trackerIds: any;
  historyLogs: object;
  historyLogIds: object;
  isFetchingHistoryLogs: boolean;
  fetchHistoryLogs(data: object): void;
  t(key: string, format?: object): string;
}

export default function Notification(props: Props) {
  const {
    fetchHistoryLogs,
    historyLogs,
    historyLogIds,
    trackerIds,
    trackers,
  } = props;
  const classes = useStyles();

  const [sortBy, setSortBy] = useState(SORT_BY_OPTION[0].value);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDateRange, setDateRange] = useState(false);
  const [trackerName, setTrackerName] = useState('');

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({ value: item, content: trackers[item].device_name });
    return result;
  }, []);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const onClickExportCsv = () => {
    console.log('export csv', historyLogs);
  };

  const onClickViewPort = () => {
    fetchHistoryLogs({
      trackerId: trackerName,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDateTime = obj => {
    setDateTime(obj);
  };

  const onSelectOption = value => {
    value === 'date_range' || value === 'specific_date'
      ? setDateRange(true)
      : setDateRange(false);
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const onChangeTracker = value => {
    setTrackerName(value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.flexCenter}>
          <div className={classes.containOption}>
            <SelectOption
              name="select_tracker"
              options={TRACKER_NAME}
              label="Select Tracker"
              value={trackerName}
              onChangeOption={onChangeTracker}
            />
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
                    <Button
                      variant="contained"
                      color="primary"
                      text="Epxport CSV"
                      className={`${classes.btnCsv}`}
                      onClick={onClickExportCsv}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.dataFilter}>
                  No found records
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className={classes.footer}>
              <tr>
                <PaginationStyle
                  rowsPerPageOptions={[10, 20, 30]}
                  count={historyLogIds[trackerName]?.length || 10}
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
