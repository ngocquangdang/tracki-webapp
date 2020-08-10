import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import TrackerDetailCard from '@Components/DetailTrackerCard';
import TrackerCard from '@Components/TrackerCard';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  trackingIds: number[];
  isMobile: boolean;
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function SingleView(props: Props) {
  const { trackers, trackingIds, isMobile, t, changeTrackersTracking } = props;
  const classes = useStyles();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];

  useEffect(() => {
    if (isFirstLoading && tracker && tracker.lat && tracker.lng) {
      window.mapEvents && window.mapEvents.setCenter(tracker);
      setIsFirstLoading(false);
    }
  }, [isFirstLoading, setIsFirstLoading, tracker]);

  const onSelectTracker = (id: number) => {
    tracker && window.mapEvents.removeMarker(tracker.device_id);
    changeTrackersTracking([id]);
  };

  return (
    <div className={classes.container}>
      <TrackerDetailCard
        t={t}
        isMobile={isMobile}
        className={classes.tracker}
        tracker={tracker}
      />
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
