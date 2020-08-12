import React from 'react';
import { isEmpty } from 'lodash';

import TrackerCard from '@Components/TrackerCard';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  trackingIds: number[];
  isMobile: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function SingleView(props: Props) {
  const { trackers, trackingIds, isMobile, t } = props;
  const classes = useStyles();
  const trackerIds = isEmpty(trackingIds)
    ? Object.keys(trackers).filter((id, index) => index < 4) || []
    : trackingIds;

  return (
    <div className={classes.container}>
      <p className={classes.text}>{t('tracker:device_selected')}</p>
      <div className={classes.list}>
        {trackerIds.map((id: number | string, index: number) => (
          <div key={index} className={classes.trackeItem}>
            <TrackerCard tracker={trackers[id]} isMobile={isMobile} />
          </div>
        ))}
      </div>
    </div>
  );
}