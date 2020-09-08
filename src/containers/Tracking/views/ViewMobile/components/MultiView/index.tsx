import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import clsx from 'clsx';

import DetailTrackerCard from '@Components/DetailTrackerCard';
import MapCard from '@Containers/Tracking/views/ViewPC/components/MapCard';
import { useStyles } from './styles';

interface Props {
  trackers: object;
  isFullWidth: boolean;
  isMultiScreen: boolean;
  trackingIds: number[];
  changeTrackersTracking(ids: number[]): void;
  t(key: string, format?: object): string;
  refreshLocation(data: object): void;
  [data: string]: any;
}

export default function MultiView(props: Props) {
  const {
    isMultiScreen,
    trackers,
    trackingIds,
    settings,
    refreshLocation,
  } = props;
  const [showCard, setShowCard] = useState(true);
  const classes = useStyles();
  const trackerIds = Object.keys(trackers);
  const [selectedTrackerId] = isEmpty(trackingIds) ? trackerIds : trackingIds;
  const tracker = trackers[selectedTrackerId];
  const toggleCard = () => setShowCard(!showCard);

  return (
    <React.Fragment>
      {!isMultiScreen && tracker && (
        <div
          className={clsx(classes.trackerCard, {
            [classes.hideCard]: !showCard,
          })}
        >
          <div className={clsx(classes.toggleContainer)}>
            <div className={classes.toggle} onClick={toggleCard} />
          </div>
          <DetailTrackerCard
            tracker={tracker}
            isMobile={true}
            t={props.t}
            settings={settings[tracker.settings_id]}
            refreshLocation={refreshLocation}
          />
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.item}>
          <MapCard
            isMobile={true}
            mapId="mapPosition"
            mapLabel={props.t('tracker:map_position')}
            isMultiView={true}
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
            isMultiView={true}
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
          <MapCard
            isMobile={true}
            isMultiView={true}
            isHelicopterView={true}
            mapId="mapHelicopterView"
            mapLabel={props.t('tracker:map_helicopter_view')}
            selectedTrackerId={
              isMultiScreen
                ? trackingIds[2] || selectedTrackerId
                : selectedTrackerId
            }
            {...props}
          />
        </div>
        <div className={classes.item}>
          <MapCard
            isMobile={true}
            isMultiView={true}
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
