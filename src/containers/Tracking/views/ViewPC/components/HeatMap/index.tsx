import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import TrackerDetailCard from '@Components/DetailTrackerCard';
import TrackerCard from '@Components/TrackerCard';
import SelectOption from '@Components/selections';

import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { DATE_OPTIONS } from '@Containers/Tracking/store/constants';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  trackingIds: number[];
  isMobile: boolean;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
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
    getHistoryTracker,
  } = props;
  const classes = useStyles();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [dateOptions, setDateOption] = useState<any>('');
  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];

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

  const onSelectTracker = (id: number) => {
    tracker && window.mapEvents.removeMarker(tracker.device_id);
    changeTrackersTracking([id]);
  };

  const handleChangeOption = value => {
    getHistoryTracker({
      trackerId: tracker?.device_id,
      fromDate: value,
      toDate: moment().unix(),
      limit: 2000,
      page: 1,
      type: 2,
    });
    setDateOption(value);
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
        <div className={classes.descriptionTime}>
          From: {moment(dateOptions * 1000).format('LLL')} To:{' '}
          {moment(new Date()).format('LLL')}
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
