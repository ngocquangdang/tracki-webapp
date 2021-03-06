import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import TimelineItemComp from './TimelineItem';
import useStyles from './styles';

interface Props {
  histories: object;
  historyIds: number[];
  pointTrackingIndex: number;
  changePointTracking(pointIndex: number): void;
}

export default function TrackerTimeline(props: Props) {
  const { histories, historyIds, pointTrackingIndex, changePointTracking } =
    props;
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const showIds = historyIds.slice(0, 5 * page).filter(id => !!id);
  const onLoadMore = () => setPage(page + 1);

  useEffect(() => {
    const itemsOfPage = page * 5;
    if (pointTrackingIndex >= itemsOfPage) {
      setPage(page + 1);
    }
  }, [pointTrackingIndex, page]);

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
        {showIds.map((id, index) => (
          <TimelineItemComp
            key={index}
            pointIndex={index}
            history={histories[id]}
            isTracking={pointTrackingIndex === index}
            changePointTracking={changePointTracking}
            isShowDate={
              showIds.length > 2 &&
              !moment(histories[showIds[index]]?.time * 1000).isSame(
                histories[showIds[index - 1]]?.time * 1000,
                'day'
              )
            }
          />
        ))}
        {showIds.length < historyIds.length && (
          <TimelineItem className={classes.height40}>
            <TimelineOppositeContent className={classes.empty2} />
            <TimelineSeparator>
              <TimelineDot className={classes.itemLoadMore} />
              <TimelineConnector className={classes.itemLoadMoreConnector} />
            </TimelineSeparator>
            <TimelineContent>
              <span onClick={onLoadMore} className={classes.loadMore}>
                Load more
              </span>
            </TimelineContent>
          </TimelineItem>
        )}
        <TimelineItem className={classes.height40}>
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
