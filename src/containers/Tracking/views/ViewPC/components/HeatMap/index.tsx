import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import TrackerDetailCard from '@Components/DetailTrackerCard';
import TrackerCard from '@Components/TrackerCard';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import DateTimePicker from '@Components/DateTimePicker';
import { useStyles } from './styles';

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
  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];

  const [selectedDateFrom, setSelectedDateFrom] = useState(moment());
  const [selectedDateTo, setSelectedDateTo] = useState(moment());
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

  const onChangeDateOption = value => {
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
  const onChangeDateFrom = date => {
    const fromDate = moment(date.getTime());
    setSelectedDateFrom(fromDate);
  };

  const onChangeDateTo = date => {
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

  const onChangeSpecificDate = date => {
    setSelectedSpecificDate(date);
    setSelectedSpecificTimeTo(date);
  };

  const onChangeSpecificTimeTo = date => {
    setSelectedSpecificTimeTo(date);
    getHistoryTracker({
      trackerId: trackers[selectedTrackerId]?.device_id,
      fromDate: moment(selectedSpecificDate).unix(),
      toDate: moment(date).unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
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
        <DateTimePicker
          isMobile={false}
          isHistory={true}
          t={t}
          onChangeDateFrom={onChangeDateFrom}
          onChangeDateTo={onChangeDateTo}
          onChangeSpecificDate={onChangeSpecificDate}
          onChangeSpecificTimeTo={onChangeSpecificTimeTo}
          onChangeDateOption={onChangeDateOption}
          valueDateFrom={selectedDateFrom}
          valueDateTo={selectedDateTo}
          valueSpecificDate={selectedSpecificDate}
          valueSpecificTimeTo={selectedSpecificTimeTo}
        />
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
