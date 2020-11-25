import React from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { useStyles } from './styles';

function HistoryInfo(props) {
  const {
    fromDate,
    toDate,
    totalDuration,
    distance,
    maxSpeed,
    avgSpeed,
  } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.sectionInfo, classes.flexCol)}>
      <div className={classes.flexRow}>
        <div className={clsx(classes.paperInfo, classes.flexRowCenter)}>
          <div className={classes.flexCol}>
            <span className={classes.textFont16}>
              {moment(fromDate * 1000).format('hh:mm A')}
            </span>
            <span className={classes.textFont11}>
              {moment(fromDate * 1000).format('LL')}
            </span>
          </div>
          <span className={clsx(classes.pr, classes.pl)}>to</span>
          <div className={classes.flexColEnd}>
            <span className={classes.textFont16}>
              {moment(toDate * 1000).format('hh:mm A')}
            </span>
            <span className={classes.textFont11}>
              {moment(toDate * 1000).format('LL')}
            </span>
          </div>
        </div>
        <div
          className={clsx(classes.paperInfo, classes.flexColCenter, classes.ml)}
        >
          <span className={classes.textFont16}>{totalDuration}</span>
          <span className={classes.textFont11}>Total Duration</span>
        </div>
      </div>
      <div className={clsx(classes.flexRow, classes.mt)}>
        <div className={classes.flexRow}>
          <div className={clsx(classes.paperInfo, classes.flexColCenter)}>
            <span className={classes.textFont16}>
              {parseFloat(distance).toFixed(2)} Miles
            </span>
            <span className={classes.textFont11}>Estimated Distance</span>
          </div>
          <div
            className={clsx(
              classes.paperInfo,
              classes.flexColCenter,
              classes.ml
            )}
          >
            <span className={clsx(classes.textFont16, classes.noWrap)}>
              {maxSpeed} Mph
            </span>
            <span className={classes.textFont11}>Max Speed</span>
          </div>
        </div>
        <div
          className={clsx(classes.paperInfo, classes.flexColCenter, classes.ml)}
        >
          <span className={classes.textFont16}>
            {parseFloat(avgSpeed).toFixed(2)} Mph
          </span>
          <span className={classes.textFont11}>Average Speed</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryInfo;
