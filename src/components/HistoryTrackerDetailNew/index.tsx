import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import {
  Slide,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons';
import { GoPrimitiveDot } from 'react-icons/go';

import DateTimePicker from '@Components/DateTimePicker';
import { Button } from '@Components/buttons';
import Skeleton from '@Components/Skeletons/Tracker';
import TrackerTimeline from '@Components/TrackerTimeline';
import { ITracker } from '@Interfaces';
import { useStyles } from './styles';
import { getAddress } from '@Utils/helper';

interface Prop {
  isLoading?: boolean;
  tracker: ITracker;
  histories: object;
  historyIds: number[];
  show: boolean;
  isRequesting: boolean;
  onClose(): void;
  t(key: string, format?: object): string;
  getHistoryTracker(format: object): void;
}

function HistoryTrackerDetail(props: Prop) {
  const classes = useStyles();
  const { tracker, show, historyIds, isRequesting, histories, onClose } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState(null);
  const [typeOfHistory, setTypeOfHistory] = useState(0);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const callApiGetAddress = useCallback(async () => {
    const address = await getAddress(tracker);
    setDataAddress(address);
    setLoading(false);
  }, [setDataAddress, setLoading, tracker]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onChangeDateTime = obj => {
    setDateTime(obj);
    getHistory(obj);
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    props.getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: typeOfHistory,
    });
  };

  const onClickViewHistory = () => {
    getHistory(null);
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
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
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div className={classes.trackerInfo}>
              <div className={classes.trackerItem}>
                <div className={classes.leftItem}>
                  <div className={classes.iconRed} />
                  <div className={classes.itemInfo}>
                    <p className={classes.name}>{tracker.device_name}</p>
                    <div className={classes.time}>
                      <GoPrimitiveDot className={classes.icon} />
                      <div className={classes.timeActive}>
                        Last Updated: {moment(tracker.time * 1000).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.trackerAddress}>
                <LocationOnIcon className={classes.iconLocation} />
                <div className={classes.text}>
                  <span>
                    {dataAddress}
                    <div className={classes.latlng}>
                      <span>Lat: {tracker.lat}</span>
                      <span>Lon: {tracker.lng}</span>
                    </div>
                  </span>
                </div>
              </div>
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
                <div className={classes.timeline}>
                  <Typography className={classes.timelineTitle}>
                    History detail:
                  </Typography>
                  <TrackerTimeline
                    historyIds={historyIds}
                    histories={histories}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Slide>
  );
}

export default HistoryTrackerDetail;
