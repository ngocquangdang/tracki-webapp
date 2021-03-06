import React from 'react';
import { isEmpty } from 'lodash';

import MapCard from '../MapCard';
import MapBoxCard from '../MapBoxCard';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  settings: object;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  trackingIds: number[];
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  [data: string]: any;
}

export default function MultiView(props: Props) {
  const { isMultiScreen, trackers, trackingIds } = props;
  const classes = useStyles();

  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.item}>
          <MapCard
            mapId="mapPosition"
            mapLabel={props.t('tracker:map_follow')}
            isTracking={true}
            selectedTrackerId={
              isMultiScreen
                ? trackingIds[0] || selectedTrackerId
                : selectedTrackerId
            }
            {...props}
          />
        </div>
        <div className={classes.item}>
          <MapCard
            mapId="mapFollow"
            mapLabel={props.t('tracker:map_realtime_tracking')}
            isTracking={true}
            selectedTrackerId={
              isMultiScreen
                ? trackingIds[1] || selectedTrackerId
                : selectedTrackerId
            }
            {...props}
          />
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.item}>
          {isMultiScreen ? (
            <MapCard
              mapId="mapHelicopterView"
              isTracking={true}
              mapLabel={props.t('tracker:map_helicopter_view')}
              selectedTrackerId={
                isMultiScreen
                  ? trackingIds[2] || selectedTrackerId
                  : selectedTrackerId
              }
              {...props}
            />
          ) : (
            <MapBoxCard
              mapId="mapHelicopterView"
              mapLabel={props.t('tracker:map_helicopter_view')}
              selectedTrackerId={
                isMultiScreen
                  ? trackingIds[2] || selectedTrackerId
                  : selectedTrackerId
              }
              {...props}
            />
          )}
        </div>
        <div className={classes.item}>
          <MapCard
            mapId="mapSatelliteView"
            isTracking={true}
            mapLabel={props.t('tracker:map_satellite')}
            selectedTrackerId={
              isMultiScreen
                ? trackingIds[3] || selectedTrackerId
                : selectedTrackerId
            }
            {...props}
          />
        </div>
      </div>
    </div>
  );
}
