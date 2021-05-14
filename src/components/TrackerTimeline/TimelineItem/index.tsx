import React, { useEffect, useCallback, useState } from 'react';
import {
  Skeleton,
  TimelineOppositeContent,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';
import moment from 'moment';
import clsx from 'clsx';

import { getAddress } from '@Utils/helper';
import useStyles from './styles';

interface Props {
  history: any;
  pointIndex: number;
  isTracking: boolean;
  isShowDate: boolean;
  changePointTracking(pointIndex: number): void;
}

export default function TrackerTimeline(props: Props) {
  const { history, pointIndex, isTracking, changePointTracking, isShowDate } =
    props;
  const [address, setAddress] = useState('');
  const classes = useStyles();

  const callApiGetAddress = useCallback(async () => {
    const add = await getAddress(history);
    setAddress(add);
  }, [setAddress, history]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const onSelect = () => {
    changePointTracking(pointIndex);
  };

  return (
    <div onClick={onSelect}>
      {isShowDate && (
        <div className={classes.containerShowDate}>
          <div className={classes.showDate}>
            {moment(history.time * 1000).format('LL')}
          </div>
        </div>
      )}
      <TimelineItem
        className={clsx(classes.item, { [classes.active]: isTracking })}
      >
        <TimelineOppositeContent className={classes.oppositeText}>
          {address ? (
            moment(history.time * 1000).format('hh:mm A')
          ) : (
            <Skeleton
              width={60}
              height={16}
              variant="text"
              animation="wave"
              classes={{ root: classes.skeleton }}
            />
          )}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            // color={history.moving ? 'secondary' : 'primary'}
            variant="outlined"
            className={clsx(
              classes.dot,
              classes[history.moving ? 'moving' : 'stop']
            )}
          >
            {isTracking && <span className={classes.outter} />}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.text}>
          {address || (
            <Skeleton
              width={'100%'}
              height={16}
              variant="text"
              animation="wave"
              classes={{ root: classes.skeleton }}
            />
          )}
        </TimelineContent>
      </TimelineItem>
    </div>
  );
}
