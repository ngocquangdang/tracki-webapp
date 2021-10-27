import React, { useState } from 'react';
import moment from 'moment';
import { Slide, IconButton, Typography } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

import TrackerCard from '@Containers/Reports/views/components/TrackerCard';
import TripCard from '@Containers/Reports/views/components/TripCard';
import DateTimePicker from '@Components/DateTimePicker';
import TripCardSkeleton from '@Components/Skeletons/TripCard';
import SelectOption from '@Components/selections';
import useStyles from './styles';

type Trip = {
  points: Object;
  pointIds: number[];
};

interface Props {
  show: boolean;
  trackers: object;
  trackerIds: any;
  onClose(): void;
  fetchHistoryTrips(data: object): void;
  setPointSelected(point: object): void;
  trips: Trip;
  tripIds: number[];
  isFetchingTrips: boolean;
  t(key: string, format?: object): string;
  [data: string]: any;
}

function SelectTracker(props: Props) {
  const {
    show,
    trackers,
    trackerIds,
    onClose,
    fetchHistoryTrips,
    isFetchingTrips,
    trips,
    tripIds,
    setPointSelected,
    t,
  } = props;
  const classes = useStyles();

  const [trackerId, setTrackerId] = useState('');
  const [isBadge, setBadge] = useState(true);
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  const onChangeDateTime = obj => {
    setDateTime(obj);
    fetchHistoryTrips({
      trackerId: trackerId,
      query: `from=${obj.fromDate}&to=${obj.toDate}&limit=2000&page=1&type=2`,
    });
  };

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  const onChangeTracker = value => {
    fetchHistoryTrips({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
    setBadge(false);
  };

  return (
    <Slide in={show} direction="left" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={classes.blur} />
        <div className={classes.content}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <FaMapMarkerAlt className={classes.locationIcon} />
              <Typography className={classes.headerTitle}>
                {t('tracker:select_date_and_device')}
              </Typography>
            </div>
            <IconButton onClick={onClose} className={classes.closeBtn}>
              <IoIosClose />
            </IconButton>
          </div>
          <div className={classes.list}>
            <div className={classes.formSelect}>
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
            <div className={classes.formSelect}>
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
        </div>
      </div>
    </Slide>
  );
}

export default SelectTracker;
