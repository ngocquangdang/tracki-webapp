//dependencies
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import polyUtil from 'polyline-encoded';

//components
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import TripCard from '@Containers/Reports/views/components/TripCard';
import TripCardSkeleton from '@Components/Skeletons/TripCard';
import { loadScript } from '@Utils/helper';
import { GOOGLE_API_KEY } from '@Definitions/app';
import TrackerCard from '@Containers/Reports/views/components/TrackerCard';
//styles
import { useStyles } from './styles';

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
  selectedPoints: object;
  selectedPointIds: number[];
  modeMap: string;
  t(key: string, format?: object): string;
}

export default function ReportTrip(props: Props) {
  const {
    fetchHistoryTrips,
    trackerIds,
    trackers,
    tripIds,
    trips,
    setPointSelected,
    selectedPoints,
    selectedPointIds,
    modeMap,
    setOptimizedTrip,
    isFetchingTrips,
    t,
  } = props;
  const classes = useStyles();

  const [isBadge, setBadge] = useState(true);
  const [trackerId, setTrackerId] = useState('');
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });
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
    if (modeMap === 'optimized' && (window as any).google) {
      const directionsService = new (window as any).google.maps.DirectionsService();
      calculateAndDisplayRoute(directionsService);
    }
  }, [calculateAndDisplayRoute, modeMap]);

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  //handle change date time
  const onChangeDateTime = obj => {
    setPointSelected({});
    setDateTime(obj);
    if (trackerId !== '') {
      fetchHistoryTrips({
        trackerId: trackerId,
        query: `from=${obj.fromDate}&to=${obj.toDate}&limit=2000&page=1&type=2`,
      });
    }
    setBadge(false);
  };

  const onChangeTracker = value => {
    setPointSelected({});
    fetchHistoryTrips({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
    setBadge(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.flexCol}>
        <div className={classes.rowLeft}>
          <SelectOption
            t={t}
            name="select_tracker"
            options={TRACKER_NAME}
            label="Select Tracker"
            value={trackerId}
            onChangeOption={onChangeTracker}
          />
          {isBadge && <div className={classes.badge} />}
        </div>
        <div className={classes.datePicker}>
          <DateTimePicker
            t={t}
            isMobile={false}
            dateTime={dateTime}
            onChange={onChangeDateTime}
            isHistory={true}
          />
          {isBadge && <div className={classes.badge} />}
        </div>
        {isBadge && (
          <div className={classes.colorGrey}>
            Select Tracker and Select Date to show history trip
          </div>
        )}
      </div>
      {trackerIds && trackerIds.length > 0 && trackerId !== '' && (
        <TrackerCard data={trackers[trackerId]} dateTime={dateTime} />
      )}
      {isFetchingTrips
        ? [1, 2, 3, 4].map(index => <TripCardSkeleton key={index} />)
        : tripIds &&
          tripIds.length > 0 &&
          tripIds.map(id => (
            <TripCard
              points={trips[id].points}
              pointIds={trips[id].pointIds}
              setPointSelected={setPointSelected}
              key={id}
            />
          ))}
    </div>
  );
}
