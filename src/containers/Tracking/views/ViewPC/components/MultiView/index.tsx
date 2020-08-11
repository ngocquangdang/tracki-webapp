import React from 'react';

import MapCard from '../MapCard';
import { useStyles } from './styles';

interface Props {
  tracker: object;
  isFullWidth: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function MultiView(props: Props) {
  const { tracker, isFullWidth, t } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.item}>
          <MapCard
            mapId="mapPosition"
            mapLabel="Map Position"
            tracker={tracker}
            t={t}
          />
        </div>
        <div className={classes.item}>
          <MapCard
            mapId="mapFollow"
            mapLabel="Map Follow"
            tracker={tracker}
            isFullWidth={isFullWidth}
            t={t}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.item}>
          <MapCard
            mapId="mapStreetView"
            mapLabel="Street Panorama"
            tracker={tracker}
            isFullWidth={isFullWidth}
            t={t}
          />
        </div>
        <div className={classes.item}>
          <MapCard
            mapId="mapSatelliteView"
            mapLabel="Satellite View"
            tracker={tracker}
            isFullWidth={isFullWidth}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
