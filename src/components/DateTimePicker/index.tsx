import React, { useState } from 'react';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import clsx from 'clsx';
import {
  MuiPickersUtilsProvider as PickerProvider,
  KeyboardDatePicker as DatePicker,
  KeyboardTimePicker as TimePicker,
} from '@material-ui/pickers';

import SelectOption from '@Components/selections';

import { DATE_OPTIONS } from './constants';
import { useStyles, themePickerDate, themePickerDateBlackView } from './styles';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

interface DateTime {
  fromDate: number;
  toDate: number;
}

interface Props {
  isMobile?: boolean;
  isHistory?: boolean;
  t(key: string, format?: object): string;
  dateTime: DateTime;
  onChange(dateTime: DateTime): void;
  showDescriptionTime?: boolean;
  onSelectOption?: any;
  isGetOnSelectOption?: boolean;
  isBlackView?: boolean;
  isClear?: boolean;
  onClear?(isClear: boolean): void;
}

export default function DateTimePicker(props: Props) {
  const {
    isMobile,
    isHistory,
    isGetOnSelectOption,
    isBlackView,
    dateTime,
    showDescriptionTime,
    onChange,
    onSelectOption,
    t,
    isClear,
    onClear,
  } = props;
  const classes = useStyles();

  const [dateOptions, setDateOption] = useState<any>('');
  const [isDateRange, showDateRange] = useState(false);
  const [isSpecificDate, showSpecificDate] = useState(false);
  const [textError, setTextError] = useState('');
  const [fromDateError, setFromDateError] = useState('');
  const [toDateError, setToDateError] = useState('');

  const handleChangeOption = value => {
    if (onClear) {
      onClear(false);
    }
    setTextError('');
    setDateOption(value);
    showDateRange(value === 'date_range');
    showSpecificDate(value === 'specific_date');
    if (
      isGetOnSelectOption &&
      (value === 'date_range' ||
        value === 'specific_date' ||
        isDateRange ||
        isSpecificDate)
    ) {
      onSelectOption(value);
    }

    if (['date_range', 'specific_date'].includes(value)) {
      onChange({
        fromDate: moment().unix(),
        toDate: moment().unix(),
      });
    } else {
      onChange({
        fromDate: value,
        toDate: moment().unix(),
      });
    }
  };

  const onChangeDateFrom = date => {
    if (dateTime.toDate < moment(date).unix()) {
      onChange({
        fromDate: moment(date).unix(),
        toDate: dateTime.toDate,
      });
      return setFromDateError('From date should be less than To date');
    } else {
      setFromDateError('');
      return onChange({
        fromDate: moment(date).unix(),
        toDate: dateTime.toDate,
      });
    }
  };

  const onChangeDateTo = date => {
    if (dateTime.fromDate > moment(date).unix()) {
      return setToDateError('From date should be less than To date');
    } else {
      setToDateError('');
      return onChange({
        fromDate: dateTime.fromDate,
        toDate: moment(date).unix(),
      });
    }
  };

  const onChangeSpecificDate = date => {
    setTextError('');
    onChange({
      fromDate: moment(date).unix(),
      toDate: moment(date).unix(),
    });
  };

  const onChangeHourFrom = date => {
    if (dateTime.toDate < moment(date).unix()) {
      setTextError('Time from should be less than Time to');
    } else {
      setTextError('');
      onChange({
        fromDate: moment(date).unix(),
        toDate: dateTime.toDate,
      });
    }
  };

  const onChangeHourTo = date => {
    if (dateTime.fromDate > moment(date).unix()) {
      setTextError('Time from should be less than Time to');
    } else {
      setTextError('');
      onChange({
        fromDate: dateTime.fromDate,
        toDate: moment(date).unix(),
      });
    }
  };

  // useEffect(() => {
  //   if (isClear) {
  //     setDateOption('');
  //   }
  // }, [isClear]);

  return (
    <div className={isHistory ? '' : classes.inLine}>
      <div
        className={
          isHistory ? classes.selectOption : classes.selectOptionReport
        }
      >
        <SelectOption
          t={t}
          name="date_option"
          options={DATE_OPTIONS}
          label="Select Date"
          value={dateOptions}
          onChangeOption={handleChangeOption}
          isBlackView={isBlackView}
        />
      </div>
      {isDateRange && !isClear && (
        <PickerProvider libInstance={moment} utils={DateUtils}>
          <div
            className={clsx(classes.datePickerControl, {
              [classes.datePickerControlHistory]: isHistory,
            })}
          >
            <ThemeProvider
              theme={isBlackView ? themePickerDateBlackView : themePickerDate}
            >
              <DatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label="From"
                format="dd/MM/yyyy"
                value={dateTime.fromDate * 1000}
                onChange={onChangeDateFrom}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                maxDate={moment()}
                className={classes.dateFrom}
                error={!!fromDateError}
                helperText={fromDateError}
              />
            </ThemeProvider>
            <ThemeProvider
              theme={isBlackView ? themePickerDateBlackView : themePickerDate}
            >
              <DatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                label="To"
                format="dd/MM/yyyy"
                value={dateTime.toDate * 1000}
                onChange={onChangeDateTo}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                color="primary"
                minDate={dateTime.fromDate * 1000}
                maxDate={moment(new Date())}
                error={!!toDateError}
                helperText={toDateError}
              />
            </ThemeProvider>
          </div>
        </PickerProvider>
      )}

      {isSpecificDate && !isClear && (
        <>
          <PickerProvider libInstance={moment} utils={DateUtils}>
            <ThemeProvider
              theme={isBlackView ? themePickerDateBlackView : themePickerDate}
            >
              <div
                className={
                  isHistory
                    ? classes.containerSpecificTimeHistory
                    : classes.containerSpecificTime
                }
              >
                <DatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  label="Specific Date and Hours"
                  format="dd/MM/yyyy"
                  value={dateTime.fromDate * 1000}
                  onChange={onChangeSpecificDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  maxDate={moment(new Date())}
                  className={isHistory ? '' : classes.marginRight}
                />
                <div
                  className={
                    isHistory
                      ? classes.controlTimePickerHistory
                      : classes.controlTimePicker
                  }
                >
                  <div className={classes.displayFlex}>
                    <TimePicker
                      label="Time from"
                      placeholder="08:00 AM"
                      // variant="inline"
                      variant="dialog"
                      mask="__:__ _M"
                      inputVariant="outlined"
                      value={dateTime.fromDate * 1000}
                      onChange={onChangeHourFrom}
                      className={classes.timePicker}
                    />
                    <TimePicker
                      label="Time to"
                      placeholder="08:00 AM"
                      variant="dialog"
                      inputVariant="outlined"
                      mask="__:__ _M"
                      value={dateTime.toDate * 1000}
                      onChange={onChangeHourTo}
                    />
                  </div>
                  <div className={classes.textError}>{textError}</div>
                </div>
              </div>
            </ThemeProvider>
          </PickerProvider>
        </>
      )}
      {isHistory ? (
        <div
          className={
            showDescriptionTime
              ? classes.descriptionTime
              : classes.hiddeDescription
          }
        >
          <div className={isMobile ? '' : classes.timeFrom}>
            From:{' '}
            {isDateRange || isSpecificDate
              ? moment(dateTime.fromDate * 1000).format('LLL')
              : moment(dateOptions * 1000).format('LLL')}
          </div>
          <div>
            To:{' '}
            {isDateRange || isSpecificDate
              ? moment(dateTime.toDate * 1000).format('LLL')
              : moment(new Date()).format('LLL')}
          </div>
        </div>
      ) : null}
    </div>
  );
}
