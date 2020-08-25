import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineContent,
} from '@material-ui/lab';
import { DirectionsCar, Adjust } from '@material-ui/icons';
import TimelineItemComp from './TimelineItem';
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
        <TimelineItem>
          <TimelineOppositeContent className={classes.empty} />
          <TimelineSeparator>
            <TimelineDot color="primary">
              <DirectionsCar />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>
        {historyIds.map((id, index) => (
          <TimelineItemComp key={index} history={histories[id]} />
        ))}
        <TimelineItem>
          <TimelineOppositeContent className={classes.empty} />
          <TimelineSeparator>
            <TimelineDot className={classes.stop}>
              <Adjust />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent />
        </TimelineItem>
      </Timeline>
    </div>
  );
}
