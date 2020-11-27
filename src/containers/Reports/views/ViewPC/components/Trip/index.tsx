//dependencies
import React, { useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';
//components
import DateTimePicker from '@Components/DateTimePicker';
import SelectOption from '@Components/selections';
import TripCard from './TripCard';

//styles
import { useStyles, Image } from './styles';

interface Props {
  trackers: object;
  trackerIds: any;
  fetchHistorySpeeds(data: object): void;
  historySpeeds: object;
  historySpeedIds: object;
  isFetchingHistorySpeed: boolean;
  viewMode: string;
  t(key: string, format?: object): string;
}

export default function ReportTrip(props: Props) {
  const { fetchHistorySpeeds, trackerIds, trackers } = props;
  const classes = useStyles();

  const TRACKER_NAME = trackerIds?.reduce((result, item) => {
    result.push({
      value: item,
      content: trackers[item].device_name || trackers[item].device_id,
    });
    return result;
  }, []);

  const [trackerId, setTrackerId] = useState('');
  const [dateTime, setDateTime] = useState({
    fromDate: moment().unix(),
    toDate: moment().unix(),
  });

  //handle change date time
  const onChangeDateTime = obj => {
    setDateTime(obj);
    if (trackerId !== '') {
      fetchHistorySpeeds({
        trackerId: trackerId,
        query: `from=${obj.fromDate}&to=${obj.toDate}&limit=2000&page=1&type=2`,
      });
    }
  };

  const onChangeTracker = value => {
    fetchHistorySpeeds({
      trackerId: value,
      query: `from=${dateTime.fromDate}&to=${dateTime.toDate}&limit=2000&page=1&type=2`,
    });
    setTrackerId(value);
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
        <SelectOption
          name="select_tracker"
          options={TRACKER_NAME}
          label="Select Tracker"
          value={trackerId}
          onChangeOption={onChangeTracker}
        />
        <div className={classes.datePicker}>
          <DateTimePicker
            isMobile={false}
            dateTime={dateTime}
            onChange={onChangeDateTime}
            isHistory={true}
          />
        </div>
      </div>
      {trackerIds.length > 0 &&
        trackerId !== '' &&
        renderTrackerCard(trackers[trackerId])}
      <TripCard />
      <TripCard />
      <TripCard />
    </div>
  );
}
