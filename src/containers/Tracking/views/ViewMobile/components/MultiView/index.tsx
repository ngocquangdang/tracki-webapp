import React from 'react';
import { isEmpty } from 'lodash';
import clsx from 'clsx';

import DetailTrackerCard from '@Components/DetailTrackerCard';
import MapCard from '@Containers/Tracking/views/ViewPC/components/MapCard';
import MapStreetView from '@Containers/Tracking/views/ViewPC/components/MapStreetView';
import { useStyles } from './styles';

interface Props {
  trackers: object;
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
    <React.Fragment>
      {!isMultiScreen && trackers[selectedTrackerId] && (
        <div className={classes.trackerCard}>
          <DetailTrackerCard
            tracker={trackers[selectedTrackerId]}
            isMobile={true}
            t={props.t}
          />
        </div>
      )}
      <div
        className={clsx(classes.container, {
          [classes.multiView]: !isMultiScreen,
        })}
      >
        <div className={classes.item}>
          <MapCard
            isMobile={true}
            mapId="mapPosition"
            mapLabel={props.t('tracker:map_position')}
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
            isMobile={true}
            mapId="mapFollow"
            mapLabel={props.t('tracker:map_follow')}
            selectedTrackerId={
              isMultiScreen
                ? trackingIds[1] || selectedTrackerId
                : selectedTrackerId
            }
            {...props}
          />
        </div>
        <div className={classes.item}>
          {isMultiScreen ? (
            <MapCard
              isMobile={true}
              mapId="mapStreetView"
              mapLabel={props.t('tracker:map_street_panorama')}
              selectedTrackerId={
                isMultiScreen
                  ? trackingIds[2] || selectedTrackerId
                  : selectedTrackerId
              }
              {...props}
            />
          ) : (
            <MapStreetView
              isMobile={true}
              mapLabel={props.t('tracker:map_street_panorama')}
              tracker={trackers[selectedTrackerId]}
            />
          )}
        </div>
        <div className={classes.item}>
          <MapCard
            isMobile={true}
            mapId="mapSatelliteView"
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
    </React.Fragment>
  );
}
