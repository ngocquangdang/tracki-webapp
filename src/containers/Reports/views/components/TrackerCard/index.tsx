import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {
  useStyles,
  Image,
} from '@Containers/Reports/views/ViewPC/components/Trip/styles';

function TrackerCard({ data, dateTime }) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.flexRow, classes.mb)}>
      <div className={classes.imageWrapper}>
        {data.icon_url ? (
          <Image background={data.icon_url} />
        ) : (
          <Image background={'/static/images/image-device.png'} />
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
}

export default TrackerCard;
