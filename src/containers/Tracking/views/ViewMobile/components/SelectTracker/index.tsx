import React, { useState } from 'react';
import moment from 'moment';
import { Slide, IconButton, Typography } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

import DateTimePicker from '@Components/DateTimePicker';
import TrackerCard from '@Components/TrackerCard';
import useStyles from './styles';

interface Props {
  show: boolean;
  trackers: object;
  selectedTrackerId: number;
  t(key: string): string;
  onClose(): void;
  onChangeTrackers(ids: number[]): void;
  isHeatMap: boolean;
  getHistoryTracker(data): void;
  [data: string]: any;
}

function SelectTracker(props: Props) {
  const {
    show,
    trackers,
    selectedTrackerId = '',
    t,
    onClose,
    onChangeTrackers,
    isHeatMap,
    getHistoryTracker,
  } = props;
  const classes = useStyles();

  const onSelectTracker = (id: number) => {
    onChangeTrackers([id]);
  };

  const trackerIds = Object.keys(trackers);

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const onChangeDateTime = obj => {
    setDateTime(obj);
    getHistory(obj);
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    getHistoryTracker({
      trackerId: trackers[selectedTrackerId]?.device_id,
      fromDate: fromDate,
      toDate: toDate,
      limit: 2000,
      page: 1,
      type: 2,
    });
  };
  return (
    <Slide in={show} direction="left" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.blur} />
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <FaMapMarkerAlt className={classes.locationIcon} />
              <Typography className={classes.headerTitle}>
                {isHeatMap
                  ? t('tracker:select_date_and_device')
                  : t('tracker:select_device')}
              </Typography>
            </div>
            <IconButton onClick={onClose} className={classes.closeBtn}>
              <IoIosClose />
            </IconButton>
          </div>
          <div className={classes.list}>
            {isHeatMap && (
              <div className={classes.formSelect}>
                <DateTimePicker
                  isMobile={false}
                  dateTime={dateTime}
                  onChange={onChangeDateTime}
                  isHistory={true}
                />
              </div>
            )}
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
      </div>
    </Slide>
  );
}

export default SelectTracker;
