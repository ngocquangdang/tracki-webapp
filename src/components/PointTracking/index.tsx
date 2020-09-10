import React, { useState } from 'react';
import {
  Close as CloseIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Draggable from 'react-draggable';
import DetailTrackerCard from '@Components/DetailTrackerCard';

import { ITracker } from '@Interfaces';
import { useStyles } from './styles';
import clsx from 'clsx';

interface Prop {
  map: any;
  location: {
    lat: number;
    lng: number;
    battery: number;
    speed: number;
    speed_unit: string;
    type: string;
  };
  tracker: ITracker;
  pointIndex: number;
  lastIndex: number;
  t(key: string, format?: object): string;
  changePointTracking(pointIndex: number): void;
}

function PointTrackingInfo(props: Prop) {
  const classes = useStyles();
  const {
    tracker,
    location,
    pointIndex,
    lastIndex,
    map,
    t,
    changePointTracking,
  } = props;
  const [showInfo, setShowInfo] = useState(!!location);

  const onClose = () => setShowInfo(false);
  const onChangePoint = (index: number) => () =>
    changePointTracking(pointIndex + index);

  const handleDrag = () => {
    map.dragging.disable();
  };

  const handleDragEnd = () => {
    map.dragging.enable();
  };

  return (
    <Draggable onDrag={handleDrag} onStop={handleDragEnd}>
      <div
        className={clsx(classes.trackingContainer, {
          [classes.show]: showInfo,
        })}
      >
        <IconButton className={classes.closeBtn} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DetailTrackerCard
          isMobile={false}
          tracker={tracker}
          t={t}
          isHistory={true}
          locationPointTracking={location}
        />
        <div
          className={classes.rowInfoIconControl}
          style={{ justifyContent: 'flex-end' }}
        >
          <IconButton
            color="primary"
            className={classes.prevBtn}
            size="small"
            onClick={onChangePoint(-1)}
            disabled={pointIndex === 0}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={pointIndex === lastIndex - 1}
            style={{ marginRight: 0 }}
            className={classes.prevBtn}
            size="small"
            onClick={onChangePoint(1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </Draggable>
  );
}

export default PointTrackingInfo;
