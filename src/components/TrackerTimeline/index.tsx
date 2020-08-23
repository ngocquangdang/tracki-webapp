import React from 'react';
import { Timeline } from '@material-ui/lab';
import TimelineItem from './TimelineItem';
import useStyles from './styles';

interface Props {
  histories: object;
  historyIds: number[];
}

export default function TrackerTimeline(props: Props) {
  const { histories, historyIds } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Timeline align="left">
        {historyIds.map((id, index) => (
          <TimelineItem key={index} history={histories[id]} />
        ))}
      </Timeline>
    </div>
  );
}
