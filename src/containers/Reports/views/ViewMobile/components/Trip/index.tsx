import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import ToolbarControlPlayback from '@Containers/Reports/views/components/ToolbarControlPlayback';
import { useStyles } from './styles';

const MapCard = dynamic(
  () => import('@Containers/Reports/views/components/MapCard'),
  {
    ssr: false,
  }
);

type Trip = {
  points: Object;
  pointIds: number[];
};
interface Props {
  trackers: object;
  trackerIds: any;
  fetchHistoryTrips(data: object): void;
  setPointSelected(point: object): void;
  trips: Trip;
  tripIds: number[];
  isFetchingTrips: boolean;
  viewMode: string;
  setOptimizedTrip(coordinate: any): void;
  changeModeViewMap(modeMap: string): void;
  coordinateOptimized: number[];
  selectedPoints: object;
  selectedPointIds: number[];
  modeMap: string;
  isMobile: boolean;
  t(key: string, format?: object): string;
}

function ReportTripMobile(props: Props) {
  const {
    viewMode,
    trackers,
    trackerIds,
    selectedPoints,
    selectedPointIds,
    coordinateOptimized,
    changeModeViewMap,
    t,
    isMobile,
    ...rest
  } = props;
  const classes = useStyles();

  const [isPlaying, setTogglePlaying] = useState(false);
  const [steps, setSteps] = useState(1000);
  const [counter, setCounter] = useState(0);

  const togglePlaying = () => setTogglePlaying(!isPlaying);
  const onChangeSpeeds = steps => {
    setSteps(steps);
  };
  const onChangeCounter = value => {
    setCounter(value);
  };
  const onChangeModeViewMap = value => {
    changeModeViewMap(value);
  };
  return (
    <div className={classes.mapView}>
      <MapCard
        mapId="mapHistory"
        isFullWidth={true}
        historyLogs={selectedPoints}
        historyLogIds={selectedPointIds}
        isPlaying={isPlaying}
        togglePlaying={togglePlaying}
        mapType="leaflet"
        t={t}
        isMobile={true}
        viewMode={viewMode}
        counter={counter}
        steps={steps}
        onChangeCounter={onChangeCounter}
        coordinateOptimized={coordinateOptimized}
        changeModeViewMap={changeModeViewMap}
        modeMap={rest.modeMap}
      />
      {selectedPointIds.length > 0 && (
        <ToolbarControlPlayback
          togglePlaying={togglePlaying}
          isPlaying={isPlaying}
          onChangeSpeeds={onChangeSpeeds}
          valControl={rest.modeMap}
          counter={counter}
          onChangeCounter={onChangeCounter}
          steps={steps}
          onChangeControl={onChangeModeViewMap}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

export default ReportTripMobile;
