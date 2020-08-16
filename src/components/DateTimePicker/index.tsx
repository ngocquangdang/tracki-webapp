import React, { useState } from 'react';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import {
  MuiPickersUtilsProvider as PickerProvider,
  KeyboardDatePicker as DatePicker,
  KeyboardTimePicker as TimePicker,
} from '@material-ui/pickers';

import SelectOption from '@Components/selections';

import { DATE_OPTIONS } from './constants';
import { useStyles, themePickerDate } from './styles';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

interface Tracker {
  device_id: number;
}

interface Props {
  tracker: Tracker;
  isMobile: boolean;
  t(key: string, format?: object): string;
  getHistoryTracker(data: object): void;
}

export default function DateTimePicker(props: Props) {
  const { tracker, isMobile, getHistoryTracker } = props;
  const classes = useStyles();

  const [dateOptions, setDateOption] = useState<any>('');

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [isDateRange, showDateRange] = useState(false);

  const [isSpecificDate, showSpecificDate] = useState(false);
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );

  const handleChangeOption = value => {
    setDateOption(value);
    value === 'date_range' ? showDateRange(true) : showDateRange(false);
    value === 'specific_date'
      ? showSpecificDate(true)
      : showSpecificDate(false);
    if (value !== 'date_range' && value !== 'specific_date') {
      getHistoryTracker({
        trackerId: tracker?.device_id,
        fromDate: value,
        toDate: moment().unix(),
        limit: 2000,
        page: 1,
        type: 2,
      });
    }
  };

  const handleDateChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    setSelectedDateFrom(fromDate);
  };

  const handleDateChangeTo = date => {
    const toDate = moment(date.getTime());
    setSelectedDateTo(toDate);

    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: selectedDateFrom.unix(),
      toDate: toDate.unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  const handleChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const handleChangeSpecificTimeTo = date => {
    setSelectedSpecificTimeTo(date);
    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: moment(selectedSpecificDate).unix(),
      toDate: moment(date).unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
  };

  return (
    <div className={classes.formSelect}>
      <SelectOption
        name="date_option"
        options={DATE_OPTIONS}
        label="Select Date"
        value={dateOptions}
        onChangeOption={handleChangeOption}
      />
      {isDateRange && (
        <PickerProvider libInstance={moment} utils={DateUtils}>
          <div className={classes.datePickerControl}>
            <ThemeProvider theme={themePickerDate}>
              <DatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label="From"
                format="dd/MM/yyyy"
                value={selectedDateFrom}
                onChange={handleDateChangeDateFrom}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                maxDate={moment()}
                className={classes.dateFrom}
              />
            </ThemeProvider>
            <ThemeProvider theme={themePickerDate}>
              <DatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label="To"
                format="dd/MM/yyyy"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                color="primary"
                minDate={selectedDateFrom}
                maxDate={moment(new Date())}
              />
            </ThemeProvider>
          </div>
        </PickerProvider>
      )}

      {isSpecificDate && (
        <PickerProvider libInstance={moment} utils={DateUtils}>
          <ThemeProvider theme={themePickerDate}>
            <div className={classes.containerSpecificTime}>
              <DatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label="Specific Date and Hours"
                format="dd/MM/yyyy"
                value={selectedSpecificDate}
                margin="normal"
                onChange={handleChangeSpecificDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <div style={{ display: 'none' }}>
                <DatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  label="Specific Date and Hours"
                  format="dd/MM/yyyy"
                  value={selectedSpecificDate}
                  margin="normal"
                  onChange={handleChangeSpecificDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
              <div className={classes.controlTimePicker}>
                <TimePicker
                  label="Time from"
                  placeholder="08:00 AM"
                  variant="inline"
                  mask="__:__ _M"
                  inputVariant="outlined"
                  value={selectedSpecificDate}
                  onChange={handleChangeSpecificDate}
                  className={classes.timePicker}
                />
                <TimePicker
                  label="Time to"
                  placeholder="08:00 AM"
                  variant="dialog"
                  inputVariant="outlined"
                  mask="__:__ _M"
                  value={selectedSpecificTimeTo}
                  onChange={handleChangeSpecificTimeTo}
                />
              </div>
            </div>
          </ThemeProvider>
        </PickerProvider>
      )}

      <div className={classes.descriptionTime}>
        <div className={isMobile ? '' : classes.timeFrom}>
          From:{' '}
          {isDateRange
            ? moment(selectedDateFrom.valueOf()).format('LLL')
            : isSpecificDate
            ? moment(selectedSpecificDate.valueOf()).format('LLL')
            : moment(dateOptions * 1000).format('LLL')}
        </div>
        <div>
          To:{' '}
          {isDateRange
            ? moment(selectedDateTo.valueOf()).format('LLL')
            : isSpecificDate
            ? moment(selectedSpecificTimeTo.valueOf()).format('LLL')
            : moment(new Date()).format('LLL')}
        </div>
      </div>
    </div>
  );
}
