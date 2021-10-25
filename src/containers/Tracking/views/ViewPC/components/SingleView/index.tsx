import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import TrackerDetailCard from '@Components/DetailTrackerCard';
import TrackerCard from '@Components/TrackerCard';
import { SkeletonTracker } from '@Components/Skeletons';
import { LEAFLET_PADDING_OPTIONS } from '@Components/Maps/constant';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  settings: object;
  trackingIds: number[];
  isMobile: boolean;
  currentTab: number;
  changeTrackersTracking(ids: number[]): void;
  refreshLocation(data: object): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function SingleView(props: Props) {
  const {
    trackers,
    trackingIds,
    isMobile,
    currentTab,
    t,
    settings,
    changeTrackersTracking,
    refreshLocation,
  } = props;
  const classes = useStyles();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

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

  useEffect(() => {
    setIsFirstLoading(true);
  }, [setIsFirstLoading, currentTab]);

  const onSelectTracker = (id: number) => {
    // tracker && window.mapEvents.removeMarker(tracker.device_id);
    changeTrackersTracking([id]);
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
      <p className={classes.text}>{t('tracker:select_device')}</p>
      <div className={classes.list}>
        {trackerIds.map(id => (
          <div key={id} className={classes.trackeItem}>
            {selectedTrackerId?.toString() === id && (
              <div className={classes.selectedTracker} />
            )}
            <TrackerCard
              t={t}
              isChecked={selectedTrackerId?.toString() === id}
              tracker={trackers[id]}
              isTracking={true}
              onClickTracker={onSelectTracker}
            />
          </div>
        ))}
        {trackerIds.length === 0 &&
          [1, 2, 3, 4].map((item: number) => (
            <div className={classes.skeContainer} key={item.toString()}>
              <SkeletonTracker />
            </div>
          ))}
      </div>
    </div>
  );
}
