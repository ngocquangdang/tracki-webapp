import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Slide } from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  LocationOn as LocationOnIcon,
  Battery60 as Battery60Icon,
} from '@material-ui/icons';
import { GoPrimitiveDot } from 'react-icons/go';
import { AiOutlineDashboard } from 'react-icons/ai';

import Skeleton from '@Components/Skeletons/Tracker';
import { MAPBOX_API_KEY } from '@Definitions/app';
import { ITracker } from '@Interfaces';
import { Card, Item, TrackerInfomation, Address, useStyles } from './styles';

interface Prop {
  isLoading?: boolean;
  tracker: ITracker;
  isMobile: boolean;
  show: boolean;
  onClose(): void;
  t(key: string, format?: object): string;
}

function HistoryTrackerDetail(props: Prop) {
  const classes = useStyles();
  const { tracker, isMobile, show, onClose } = props;
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState(null);

  const callApiGetAddress = useCallback(async () => {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${tracker.lng},${tracker.lat}.json?types=poi&access_token=${MAPBOX_API_KEY}`
    );
    const address = data.features[0] || { place_name: 'Unknow location' };
    setDataAddress(address.place_name);
    setLoading(false);
  }, [setDataAddress, setLoading, tracker]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const renderContentPC = () => {
    return (
      <TrackerInfomation isMobile={isMobile}>
        <Item isMobile={isMobile}>
          <div className={classes.leftItem}>
            <div className={classes.iconRed} />
            <div className={classes.itemInfo}>
              <p className={classes.name}>{tracker.device_name}</p>
              <div className={classes.time}>
                <GoPrimitiveDot className={classes.icon} />
                <div className={classes.timeActive}>
                  Last Updated: {moment(tracker.time * 1000).fromNow()}
                </div>
              </div>
            </div>
          </div>
        </Item>
        <Address isMobile={isMobile}>
          <LocationOnIcon className={classes.iconLocation} />
          <div className={classes.text}>
            <span>
              {dataAddress}
              <div className={classes.latlng}>
                <span>Lat: {tracker.lat}</span>
                <span>Lon: {tracker.lng}</span>
              </div>
            </span>
          </div>
        </Address>
      </TrackerInfomation>
    );
  };

  const renderContentMobile = () => {
    return (
      <Card key={tracker.device_id}>
        <TrackerInfomation isMobile={isMobile}>
          <Item isMobile={isMobile}>
            <div className={classes.leftItem}>
              <Address isMobile={isMobile}>
                <LocationOnIcon className={classes.iconLocation} />
                <div className={classes.text}>
                  <span>{dataAddress}</span>
                  <div className={classes.time}>
                    <GoPrimitiveDot className={classes.icon} />
                    <span className={classes.timeActive}>
                      Last Updated: {moment(tracker.time * 1000).fromNow()}
                    </span>
                  </div>
                </div>
              </Address>
            </div>
          </Item>
        </TrackerInfomation>
      </Card>
    );
  };

  return (
    <Slide in={show} direction="right" unmountOnExit mountOnEnter>
      <div className={classes.container}>
        <div className={classes.header}>
          <ArrowBackIosIcon className={classes.iconBack} onClick={onClose} />
          <span className={classes.title} onClick={onClose}>
            History Result
          </span>
        </div>
        {loading ? (
          <Skeleton />
        ) : isMobile ? (
          renderContentMobile()
        ) : (
          renderContentPC()
        )}
        <div className={classes.trackerStatus}>
          <div className={classes.battery}>
            <Battery60Icon />
            <span className={classes.textSpace}>{tracker.battery}%</span>
          </div>
          <div className={classes.status}>
            <AiOutlineDashboard style={{ width: '24px', height: '24px' }} />
            <span className={`${classes.textBold} ${classes.textSpace}`}>
              {tracker.speed}
            </span>
          </div>
          <div className={classes.conectionTracker}>
            <div>
              Connection:
              <span className={classes.textBold}>{tracker.location_type}</span>
            </div>
            <span>Location within approx. 5-20m</span>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.speedStatus}>
            <div className={classes.stop}>
              <div className={classes.iconStop}></div>
              <span className={classes.textIcon}>Stop</span>
            </div>
            <div className={classes.stop}>
              <div className={classes.iconSpeed}></div>
              <span className={classes.textIcon}>Speed</span>
            </div>
          </div>
          <div>
            <div className={classes.controlText}>
              <span>Stopped on:</span>
              <span> Jun 25, 2020 06:45: PM</span>
            </div>
            <div className={classes.controlText}>
              <span>Started on:</span>
              <span> Jun 25, 2020 06:52: PM</span>
            </div>
            <div className={classes.controlText}>
              <span>Stoppped Duration:</span>
              <span> 00d 00:09:11</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default HistoryTrackerDetail;
