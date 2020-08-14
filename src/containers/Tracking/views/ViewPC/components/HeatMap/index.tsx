import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import DateUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';
import {
  MuiPickersUtilsProvider as PickerProvider,
  KeyboardDatePicker as DatePicker,
  KeyboardTimePicker as TimePicker,
} from '@material-ui/pickers';

import TrackerDetailCard from '@Components/DetailTrackerCard';
import TrackerCard from '@Components/TrackerCard';
import SelectOption from '@Components/selections';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { DATE_OPTIONS } from '@Containers/Tracking/store/constants';
import { useStyles, themePickerDate } from './styles';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

interface Props {
  trackers: object;
  trackingIds: number[];
  isMobile: boolean;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  currentTab: number;
  [data: string]: any;
  getHistoryTracker(data: object): void;
}

export default function HeatMap(props: Props) {
  const {
    trackers,
    trackingIds,
    isMobile,
    t,
    changeTrackersTracking,
    currentTab,
    getHistoryTracker,
  } = props;
  const classes = useStyles();

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [dateOptions, setDateOption] = useState<any>('');
  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
  const [isDateRange, showDateRange] = useState(false);

  const [isSpecificDate, showSpecificDate] = useState(false);
  const [selectedSpecificDate, setSelectedSpecificDate] = useState(moment());
  const [selectedSpecificTimeTo, setSelectedSpecificTimeTo] = useState(
    moment(new Date())
  );

  useEffect(() => {
    if (isFirstLoading && tracker && tracker.lat && tracker.lng) {
      const options =
        window.mapType === 'leaflet' ? LEAFLET_PADDING_OPTIONS : {};
      window.mapEvents &&
        window.mapEvents.setFitBounds(
          [tracker],
          window.mapFullWidth ? {} : options
        );
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setIsFirstLoading, tracker]);

  useEffect(() => {
    setIsFirstLoading(true);
  }, [setIsFirstLoading, currentTab]);

  const onSelectTracker = (id: number) => {
    tracker && window.mapEvents.removeMarker(tracker.device_id);
    changeTrackersTracking([id]);
  };

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

  const handleBlur = date => {
    console.log('ssssssssss', date);
  };

  return (
    <div className={classes.container}>
      <TrackerDetailCard
        t={t}
        isMobile={isMobile}
        className={classes.tracker}
        tracker={tracker}
      />
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
                    onAccept={handleBlur}
                  />
                </div>
              </div>
            </ThemeProvider>
          </PickerProvider>
        )}

        <div className={classes.descriptionTime}>
          From:{' '}
          {isDateRange
            ? moment(selectedDateFrom.valueOf()).format('LLL')
            : isSpecificDate
            ? moment(selectedSpecificDate.valueOf()).format('LLL')
            : moment(dateOptions * 1000).format('LLL')}{' '}
          To:{' '}
          {isDateRange
            ? moment(selectedDateTo.valueOf()).format('LLL')
            : isSpecificDate
            ? moment(selectedSpecificTimeTo.valueOf()).format('LLL')
            : moment(new Date()).format('LLL')}
        </div>
      </div>
      <p className={classes.text}>{t('tracker:select_device')}</p>
      <div className={classes.list}>
        {trackerIds.map(id => (
          <div key={id} className={classes.trackeItem}>
            {selectedTrackerId.toString() === id && (
              <div className={classes.selectedTracker} />
            )}
            <TrackerCard
              isChecked={selectedTrackerId.toString() === id}
              tracker={trackers[id]}
              isTracking={true}
              onClickTracker={onSelectTracker}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
