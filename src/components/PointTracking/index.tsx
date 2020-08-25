import React, { useState, useEffect, useCallback } from 'react';
import {
  Adjust as AdjustIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Public as PublicIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CgBattery } from 'react-icons/cg';
import moment from 'moment';

import { ITracker } from '@Interfaces';
import { Button } from '@Components/buttons';
import { getAddress } from '@Utils/helper';
import { useStyles } from './styles';
import clsx from 'clsx';

interface Prop {
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

  return (
    <div
      className={clsx(classes.trackingContainer, { [classes.show]: showInfo })}
    >
      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div className={classes.rowInfo}>
        <div className={classes.rowIcon}>
          <AdjustIcon color="primary" />
        </div>
        <div className={classes.rowText}>
          <p className={classes.title}>{tracker.device_name}</p>
          <p className={classes.subtitle}>
            {'Date: ' + moment(tracker.time * 1000).format('lll')}
          </p>
        </div>
      </div>
      <div className={classes.rowInfo}>
        <div className={classes.rowIcon}>
          <LocationIcon />
        </div>
        <div className={classes.rowText}>{address}</div>
      </div>
      <div className={classes.rowInfo}>
        <div className={classes.rowIcon}>
          <PublicIcon />
        </div>
        <div className={classes.rowText}>
          {`Lat: ${location.lat || '-'}, Lng: ${location.lng || '-'}`}
        </div>
      </div>
      <div className={classes.rowInfo}>
        <div className={classes.rowLeft}>
          <div className={classes.block}>
            <AiOutlineDashboard className={classes.dashIcon} />
            <span className={classes.text}>
              {(location.speed || 0) +
                ' ' +
                (location.speed_unit || '').toUpperCase()}
            </span>
          </div>
          <div className={classes.block}>
            <CgBattery className={classes.dashIcon} />
            <span className={classes.text}>{location.battery || '-'}</span>
          </div>
        </div>
        <div className={classes.rowRight}>
          <div>Tracker Connection: {(location.type || '-').toUpperCase()}</div>
          <div>Accuracy within: -</div>
        </div>
      </div>
      <div className={classes.rowInfo}>
        <Button
          text="Prev"
          color="secondary"
          variant="contained"
          fullWidth
          startIcon={<ArrowBackIosIcon />}
          className={classes.prevBtn}
          onClick={onChangePoint(-1)}
          disabled={pointIndex === 0}
        />
        <Button
          text="Next"
          color="secondary"
          variant="contained"
          fullWidth
          disabled={pointIndex === lastIndex - 1}
          endIcon={<ArrowForwardIosIcon />}
          style={{ marginRight: 0 }}
          className={classes.prevBtn}
          onClick={onChangePoint(1)}
        />
      </div>
    </div>
  );
}

export default PointTrackingInfo;
