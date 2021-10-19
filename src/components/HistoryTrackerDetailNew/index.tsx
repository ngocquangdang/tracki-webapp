import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Slide, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';

import DateTimePicker from '@Components/DateTimePicker';
import { Button } from '@Components/buttons';
import TrackerTimeline from '@Components/TrackerTimeline';
import HistoryChart from '@Components/HistoryChart';
import { ITracker } from '@Interfaces';
import { firebaseLogEventRequest } from '@Utils/firebase';
import { useStyles } from './styles';

interface Prop {
  isLoading?: boolean;
  tracker: ITracker;
  histories: object;
  historyIds: number[];
  pointTrackingIndex: number;
  show: boolean;
  isRequesting: boolean;
  onClose(): void;
  t(key: string, format?: object): string;
  getHistoryTracker(format: object): void;
  changePointTracking(pointIndex: number): void;
}

function HistoryTrackerDetail(props: Prop) {
  const classes = useStyles();
  const {
    tracker,
    show,
    historyIds,
    isRequesting,
    histories,
    pointTrackingIndex,
    onClose,
    changePointTracking,
  } = props;
  const [typeOfHistory, setTypeOfHistory] = useState(0);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  useEffect(() => firebaseLogEventRequest('history_device', ''), []);

  const onChangeDateTime = obj => {
    firebaseLogEventRequest('history_device', 'history_device_select_date');
    setDateTime(obj);
    // getHistory(obj);
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    props.getHistoryTracker({
      trackerId: tracker.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: typeOfHistory,
    });
  };

  const onClickViewHistory = () => {
    firebaseLogEventRequest('history_device', 'history_device_wiew_history');
    getHistory(null);
  };

  const getFirebaseLogHistoryType = type => {
    switch (type) {
      case 1:
        return 'history_device_select_wifi_type';
      case 2:
        return 'history_device_select_gps_wifi_type';
      default:
        return 'history_device_select_gps_type';
    }
  };
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    firebaseLogEventRequest('history_device', getFirebaseLogHistoryType(value));
    setTypeOfHistory(+value);
  };

  const renderRadio = (label, value) => (
    <FormControlLabel
      control={<Radio color="primary" />}
      label={label}
      value={value}
    />
  );

  return (
    <Slide in={show} direction="right" unmountOnExit mountOnEnter>
      <div className={classes.container}>
        <div className={classes.header}>
          <ArrowBackIosIcon className={classes.iconBack} onClick={onClose} />
          <span className={classes.title} onClick={onClose}>
            History Result
          </span>
        </div>
        <div className={classes.filterWrapper}>
          <div className={classes.selectOption}>
            <DateTimePicker
              isMobile={false}
              dateTime={dateTime}
              onChange={onChangeDateTime}
              isHistory={true}
            />
          </div>
          <div className={classes.checkGroup}>
            <p>Type of history</p>
            <RadioGroup
              value={typeOfHistory}
              className={classes.radioGroup}
              onChange={onChangeCheckbox}
            >
              {renderRadio('GPS', 0)}
              {renderRadio('Wifi', 1)}
              {renderRadio('GPS & Wifi', 2)}
            </RadioGroup>
          </div>
          <Button
            className={classes.btnView}
            variant="contained"
            color="primary"
            isLoading={isRequesting}
            text="View History"
            fullWidth
            onClick={onClickViewHistory}
          />
          {historyIds.length > 0 && (
            <HistoryChart historyIds={historyIds} histories={histories} />
          )}
          {historyIds.length > 0 && (
            <div className={classes.timeline}>
              <TrackerTimeline
                historyIds={historyIds}
                histories={histories}
                pointTrackingIndex={pointTrackingIndex}
                changePointTracking={changePointTracking}
              />
            </div>
          )}
        </div>
      </div>
    </Slide>
  );
}

export default HistoryTrackerDetail;
