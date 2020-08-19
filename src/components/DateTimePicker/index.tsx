import React, { useState, Fragment } from 'react';
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

interface Props {
  isMobile?: boolean;
  isHistory?: boolean;
  t?(key: string, format?: object): string;
  onChangeDateOption(value: number | string): void;
  onChangeDateFrom(date): void;
  onChangeDateTo(date): void;
  onChangeSpecificDate(date): void;
  onChangeSpecificTimeTo(date): void;
  valueDateFrom: any;
  valueDateTo: any;
  valueSpecificDate: any;
  valueSpecificTimeTo: any;
}

export default function DateTimePicker(props: Props) {
  const {
    isMobile,
    isHistory,
    onChangeDateOption,
    onChangeDateFrom,
    onChangeDateTo,
    onChangeSpecificDate,
    onChangeSpecificTimeTo,
    valueDateFrom,
    valueDateTo,
    valueSpecificDate,
    valueSpecificTimeTo,
  } = props;
  const classes = useStyles();

  const [dateOptions, setDateOption] = useState<any>('');

  const [isDateRange, showDateRange] = useState(false);
  const [isSpecificDate, showSpecificDate] = useState(false);

  const handleChangeOption = value => {
    setDateOption(value);
    value === 'date_range' ? showDateRange(true) : showDateRange(false);
    value === 'specific_date'
      ? showSpecificDate(true)
      : showSpecificDate(false);
    onChangeDateOption(value);
  };

  return (
    <Fragment>
      <div className={classes.selectOption}>
        <SelectOption
          name="date_option"
          options={DATE_OPTIONS}
          label="Select Date"
          value={dateOptions}
          onChangeOption={handleChangeOption}
        />
      </div>
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
                value={valueDateFrom}
                onChange={onChangeDateFrom}
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
                value={valueDateTo}
                onChange={onChangeDateTo}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                color="primary"
                minDate={valueDateTo}
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
                value={valueSpecificDate}
                margin="normal"
                onChange={onChangeSpecificDate}
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
                  value={valueSpecificDate}
                  margin="normal"
                  onChange={onChangeSpecificDate}
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
                  value={valueSpecificDate}
                  onChange={onChangeSpecificDate}
                  className={classes.timePicker}
                />
                <TimePicker
                  label="Time to"
                  placeholder="08:00 AM"
                  variant="dialog"
                  inputVariant="outlined"
                  mask="__:__ _M"
                  value={valueSpecificTimeTo}
                  onChange={onChangeSpecificTimeTo}
                />
              </div>
            </div>
          </ThemeProvider>
        </PickerProvider>
      )}
      {isHistory ? (
        <div className={classes.descriptionTime}>
          <div className={isMobile ? '' : classes.timeFrom}>
            From:{' '}
            {isDateRange
              ? moment(valueDateFrom.valueOf()).format('LLL')
              : isSpecificDate
              ? moment(valueSpecificDate.valueOf()).format('LLL')
              : moment(dateOptions * 1000).format('LLL')}
          </div>
          <div>
            To:{' '}
            {isDateRange
              ? moment(valueDateTo.valueOf()).format('LLL')
              : isSpecificDate
              ? moment(valueSpecificTimeTo.valueOf()).format('LLL')
              : moment(new Date()).format('LLL')}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
