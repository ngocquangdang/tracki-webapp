import React, { useState, useEffect, useCallback } from 'react';
import {
  LocationOn as LocationIcon,
  Close as CloseIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgBattery } from 'react-icons/cg';
import moment from 'moment';
import Draggable from 'react-draggable';

import { ITracker } from '@Interfaces';
import { getAddress } from '@Utils/helper';
import { useStyles, Image, DefaultImage } from './styles';
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
    changePointTracking,
  } = props;
  const [showInfo, setShowInfo] = useState(!!location);
  const [address, setAddress] = useState<string | null>(null);

  const callApiGetAddress = useCallback(async () => {
    const add = await getAddress(location);
    setAddress(add);
  }, [setAddress, location]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  useEffect(() => {
    setShowInfo(true);
  }, [pointIndex, location]);

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
        <div className={classes.rowInfo}>
          <div className={classes.rowIconDevice}>
            <div className={classes.imageWrapper}>
              {tracker.icon_url ? (
                <Image background={tracker.icon_url} />
              ) : (
                <DefaultImage background={'/images/image-device.png'} />
              )}
            </div>
          </div>
          <div className={classes.rowText}>
            <p className={classes.title}>{tracker.device_name}</p>
            <p className={classes.subtitle}>
              {'Date: ' +
                moment(tracker.time * 1000).format('MMM DD YYYY, hh:MM:SS A')}
            </p>
          </div>
        </div>
        <div className={classes.rowInfo}>
          <div className={classes.rowIcon}>
            <LocationIcon className={classes.iconLocation} />
          </div>
          <div className={classes.rowText}>{address}</div>
        </div>
        <div className={classes.rowInfo}>
          <div className={classes.rowIcon}></div>
          <div className={classes.rowText}>
            {`Lat: ${location.lat || '-'}, Lng: ${location.lng || '-'}`}
          </div>
        </div>
        <div className={classes.rowStatusTracker}>
          <div className={classes.rowLeft}>
            <div className={classes.block}>
              <CgBattery className={classes.dashIcon} />
              <span className={classes.text} style={{ marginLeft: 4 }}>
                {location.battery ? location.battery + '%' : '-'}
              </span>
            </div>
          </div>
          <div className={classes.rowLeft}>
            <div className={classes.block}>
              <AiOutlineDashboard className={classes.dashIcon} />
              <span className={classes.text}>
                {(location.speed || 0) +
                  ' ' +
                  (location.speed_unit || '').toUpperCase()}
              </span>
            </div>
          </div>
          <div className={classes.rowRight}>
            <div>
              Tracker Connection: {(location.type || '-').toUpperCase()}
            </div>
            <div>Accuracy within: -</div>
          </div>
        </div>
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
