import React, { useEffect, useCallback, useState } from 'react';
import {
  TimelineOppositeContent,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';
import moment from 'moment';

import { getAddress } from '@Utils/helper';
import useStyles from './styles';

interface Props {
  history: any;
}

export default function TrackerTimeline(props: Props) {
  const { history } = props;
  const [address, setAddress] = useState('');
  const classes = useStyles();

  const callApiGetAddress = useCallback(async () => {
    const add = await getAddress(history);
    setAddress(add);
  }, [setAddress, history]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  return (
    <TimelineItem className={classes.item}>
      <TimelineOppositeContent className={classes.oppositeText}>
        {moment(history.time * 1000).format('hh:mm A')}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          // color={history.moving ? 'secondary' : 'primary'}
          variant="outlined"
          className={classes[history.moving ? 'moving' : 'stop']}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent className={classes.text}>{address}</TimelineContent>
    </TimelineItem>
  );
}
