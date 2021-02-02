import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import polyUtil from 'polyline-encoded';

import { loadScript } from '@Utils/helper';
import { GOOGLE_API_KEY } from '@Definitions/app';
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
    setOptimizedTrip,
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

  const loaded = React.useRef(false);
  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }
    loaded.current = true;
  }

  const calculateAndDisplayRoute = useCallback(
    directionsService => {
      if (selectedPointIds.length > 0) {
        const firstPointId = selectedPointIds[0];
        const lastPointId = selectedPointIds.length - 1;
        const origin = `${selectedPoints[firstPointId].lat},${selectedPoints[firstPointId].lng}`;
        const destination = `${
          selectedPoints[selectedPointIds[lastPointId]].lat
        },${selectedPoints[selectedPointIds[lastPointId]].lng}`;

        directionsService.route(
          {
            origin,
            destination,
            optimizeWaypoints: true,
            travelMode: 'DRIVING',
          },
          (response, status) => {
            const encoded = response.routes[0].overview_polyline;
            const decoded = polyUtil.decode(encoded);
            const coordinateOptimized =
              decoded &&
              decoded.map(item => ({
                lng: item[1],
                lat: item[0],
              }));
            setOptimizedTrip(coordinateOptimized);
          }
        );
      }
    },
    [setOptimizedTrip, selectedPointIds, selectedPoints]
  );

  useEffect(() => {
    if (rest.modeMap === 'optimized' && (window as any).google) {
      const directionsService = new (window as any).google.maps.DirectionsService();
      calculateAndDisplayRoute(directionsService);
    }
  }, [calculateAndDisplayRoute, rest.modeMap]);

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
