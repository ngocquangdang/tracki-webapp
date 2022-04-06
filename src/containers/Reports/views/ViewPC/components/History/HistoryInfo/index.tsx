import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

import { useStyles, Image } from './styles';
function HistoryInfo(props) {
  const {
    deviceName,
    fromDate,
    toDate,
    totalDuration,
    distance,
    maxSpeed,
    avgSpeed,
  } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.infoHistory, classes.flexRowCenter)}>
      <div className={clsx(classes.pr, classes.flexRowCenter)}>
        <div className={classes.imageWrapper}>
          <Image background="/images/image-device.png" />
        </div>
        <span className={classes.textFont15}>{deviceName}</span>
      </div>
      <div className={classes.borderPart} />
      <div className={clsx(classes.flexRowCenter, classes.pr, classes.pl)}>
        <div className={classes.flexCol}>
          <span className={classes.textFont12}>From</span>
          <span className={classes.textFont17}>
            {moment(fromDate * 1000).format('hh:mm A')}
          </span>
          <span className={classes.textFont12}>
            {moment(fromDate * 1000).format('L')}
          </span>
        </div>
        <span className={clsx(classes.pr, classes.pl)}>to</span>
        <div className={classes.flexColEnd}>
          <span className={classes.textFont12}>To</span>
          <span className={classes.textFont17}>
            {moment(toDate * 1000).format('hh:mm A')}
          </span>
          <span className={classes.textFont12}>
            {moment(toDate * 1000).format('L')}
          </span>
        </div>
      </div>
      <div className={classes.borderPart} />
      <div className={clsx(classes.flexRowCenter, classes.pr, classes.pl)}>
        <div className={classes.flexColCenter}>
          <span className={classes.textFont17}>{totalDuration}</span>
          <span className={classes.textFont12}>Total Duration</span>
        </div>
      </div>
      <div className={classes.borderPart} />
      <div className={clsx(classes.flexRowCenter, classes.pr, classes.pl)}>
        <div className={classes.flexColCenter}>
          <span className={classes.textFont17}>
            {parseFloat(distance).toFixed(2)} Miles
          </span>
          <span className={classes.textFont12}>Estimated Distance</span>
        </div>
      </div>
      <div className={classes.borderPart} />
      <div className={clsx(classes.flexRowCenter, classes.pr, classes.pl)}>
        <div className={classes.flexColCenter}>
          <span className={classes.textFont17}>{maxSpeed} Mph</span>
          <span className={classes.textFont12}>Max Speed</span>
        </div>
      </div>
      <div className={classes.borderPart} />
      <div className={clsx(classes.flexRowCenter, classes.pr, classes.pl)}>
        <div className={classes.flexColCenter}>
          <span className={classes.textFont17}>
            {parseFloat(avgSpeed).toFixed(2)} Mph
          </span>
          <span className={classes.textFont12}>Average Speed</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryInfo;
