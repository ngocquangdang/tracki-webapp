//dependencies
import React, { useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
//components
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import TripCard from './TripCard';
import TripCardSkeleton from '@Components/Skeletons/TripCard';

//styles
import { useStyles, Image } from './styles';

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
    isFetchingTrips,
  } = props;
  const classes = useStyles();

  const [isBadge, setBadge] = useState(true);
  const [trackerId, setTrackerId] = useState('');
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  //handle change date time
  const onChangeDateTime = obj => {
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
    fetchHistoryTrips({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
    setBadge(false);
  };

  const renderTrackerCard = data => {
    return (
      <div className={clsx(classes.flexRow, classes.mb)}>
        <div className={classes.imageWrapper}>
          {data.icon_url ? (
            <Image background={data.icon_url} />
          ) : (
            <Image background={'/images/image-device.png'} />
          )}
        </div>
        <div className={classes.flexCol}>
          <span className={classes.textFont14}>{data.device_name}</span>
          <span className={clsx(classes.colorGrey, classes.textFont11)}>
            From: {moment(dateTime.fromDate * 1000).format('LLL')}
          </span>
          <span className={clsx(classes.colorGrey, classes.textFont11)}>
            To: {moment(dateTime.toDate * 1000).format('LLL')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.flexCol}>
        <div className={classes.rowLeft}>
          <SelectOption
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
      {trackerIds &&
        trackerIds.length > 0 &&
        trackerId !== '' &&
        renderTrackerCard(trackers[trackerId])}
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
