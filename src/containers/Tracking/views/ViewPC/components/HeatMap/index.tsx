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
  settings: object;
  getHistoryTracker(data: object): void;
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function HeatMap(props: Props) {
  const {
    trackers,
    trackingIds,
    isMobile,
    t,
    settings,
    changeTrackersTracking,
    currentTab,
    getHistoryTracker,
    refreshLocation,
  } = props;
  const classes = useStyles();

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];

  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

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

  const onChangeDateTime = obj => {
    setDateTime(obj);
    getHistory(obj);
  };

  const getHistory = obj => {
    const { fromDate, toDate } = obj || dateTime;
    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: fromDate,
      toDate: toDate,
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
        settings={settings[tracker?.settings_id]}
        refreshLocation={refreshLocation}
      />
      <div className={classes.formSelect}>
        <DateTimePicker
          isMobile={false}
          dateTime={dateTime}
          onChange={onChangeDateTime}
          isHistory={true}
          showDescriptionTime={true}
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
