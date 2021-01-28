import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { msToTime, getAddress, getAvg } from '@Utils/helper';
import { lineDistance } from '@turf/turf';
import { Skeleton } from '@material-ui/lab';
import { Button, ButtonGroup } from '@material-ui/core';

import PointItem from './PointItem';
import { useStyles } from './styles';

type Point = {
  lat: number;
  lng: number;
  speed: number;
};

interface Props {
  points: Point;
  pointIds: any;
  setPointSelected(point: object): void;
}
function TripCard(props: Props) {
  const { points, pointIds, setPointSelected } = props;
  const classes = useStyles();
  const [isExpand, setExpand] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [pointAlertIds, setPointAlertIds] = useState<number[]>([]);

  const onClickExpand = () => {
    setPointSelected({ points, pointIds });
    setExpand(!isExpand);
  };
  const onShowSpeedAlerts = () => {
    const filterPointer = pointIds.filter(id => points[id].speed > 0);
    setPointAlertIds(filterPointer);
    setCurrentTab(1);
  };
  const onShowAllPoints = () => setCurrentTab(0);

  const [addressFrom, setAddressFrom] = useState('');
  const [addressTo, setAddressTo] = useState('');
  const [loading, setLoading] = useState(true);

  const callApiGetAddress = useCallback(async () => {
    const locationFrom = {
      lat: points[pointIds[0]].lat,
      lng: points[pointIds[0]].lng,
    };
    const locationTo = {
      lat: points[pointIds[pointIds.length - 1]].lat,
      lng: points[pointIds[pointIds.length - 1]].lng,
    };

    const [addressFrom, addressTo] = await Promise.all([
      getAddress(locationFrom),
      getAddress(locationTo),
    ]);
    setAddressFrom(addressFrom);
    setAddressTo(addressTo);
    setLoading(false);
  }, [setAddressFrom, setAddressTo, setLoading, pointIds, points]);

  useEffect(() => {
    callApiGetAddress();
  }, [callApiGetAddress]);

  const countSpeedViolation = (arr: number[]) => {
    let count = 0;
    arr.forEach(item => item > 0 && count++);
    return count;
  };

  const handleData = () => {
    const speedItem = pointIds.reduce((speed, item) => {
      speed.push(points[item].speed);
      return speed;
    }, []);
    const lnglats = pointIds.map(id => [points[id].lng, points[id].lat]);
    const opts = { units: 'kilometers' as any };
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: lnglats,
      },
    } as any;

    const distance = lineDistance(feature, opts);
    const firstDuration = points[pointIds[pointIds.length - 1]].time;
    const endDuration = points[pointIds[0]].time;
    const duration = msToTime(firstDuration - endDuration, true);
    const totalSpeedViolations = countSpeedViolation(speedItem);
    return {
      distance,
      duration,
      maxSpeed: Math.max(...speedItem),
      avgSpeed: getAvg(speedItem).toFixed(2),
      totalSpeedViolations,
    };
  };

  const {
    distance = 0,
    duration = 0,
    maxSpeed = 0,
    avgSpeed = 0,
    totalSpeedViolations = 0,
  } = handleData() || {};

  return (
    <div className={classes.container}>
      <div className={classes.flexCol} onClick={onClickExpand}>
        <div
          className={clsx(
            classes.rowBetween,
            classes.textBold,
            classes.textFont13
          )}
        >
          <span>{moment(points[pointIds[0]].time * 1000).format('LL')}</span>
          <span>{distance.toFixed(3)} KM</span>
        </div>
        <div
          className={clsx(
            classes.rowBetween,
            classes.textBold,
            classes.textFont13
          )}
        >
          <div className={classes.flexRowCenter}>
            <span className={classes.circleGreen} />
            <span>
              From {moment(points[pointIds[0]].time * 1000).format('hh:mm A')}
            </span>
          </div>
          <span>{duration}</span>
        </div>
        <div className={clsx(classes.textNoWrap, classes.textFont13)}>
          {loading ? (
            <Skeleton
              variant="text"
              animation="wave"
              height={15}
              width={'100%'}
            />
          ) : (
            addressFrom
          )}
        </div>
        <div
          className={clsx(
            classes.flexRowCenter,
            classes.textBold,
            classes.textFont13
          )}
        >
          <span className={classes.circleRed} />
          <span>
            {moment(points[pointIds[pointIds.length - 1]].time).format(
              'hh:mm A'
            )}
          </span>
        </div>
        <div className={clsx(classes.textNoWrap, classes.textFont13)}>
          {loading ? (
            <Skeleton
              variant="text"
              animation="wave"
              height={15}
              width={'100%'}
              className={classes.skeleton}
            />
          ) : (
            addressTo
          )}
        </div>
      </div>
      {isExpand && (
        <div className={classes.containerPoints}>
          <ButtonGroup className={classes.flexRow}>
            <Button
              variant="contained"
              className={clsx(classes.btn, {
                [classes.btnActive]: currentTab === 0,
              })}
              onClick={onShowAllPoints}
            >
              All points
            </Button>
            <Button
              variant="contained"
              className={clsx(classes.btn, {
                [classes.btnActive]: currentTab === 1,
              })}
              onClick={onShowSpeedAlerts}
            >
              Speed Alerts
            </Button>
          </ButtonGroup>
          {currentTab === 0
            ? pointIds &&
              pointIds.map(id => (
                <PointItem
                  lat={points[id].lat}
                  lng={points[id].lng}
                  speed={points[id].speed}
                  time={points[id].time}
                  key={id}
                />
              ))
            : pointAlertIds.length > 0 &&
              pointAlertIds.map((id, key) => (
                <div
                  className={clsx(classes.containerPointAlert, {
                    [classes.textBold]: key === 0,
                  })}
                  key={id}
                >
                  <div className="pr20">{moment().format('hh:mm A')}</div>
                  <div className={classes.flexRowCenter}>
                    <div
                      className={clsx(classes.cicrlGrey, {
                        [classes.circleGreen]: key === 0,
                      })}
                    />
                    <div>Speed Violation ({points[id].speed} kph)</div>
                  </div>
                </div>
              ))}
          <div className={clsx(classes.rowBetween, classes.pt10)}>
            <div className={classes.flexColCenter}>
              <span className={classes.font18}>{maxSpeed} kph</span>
              <p>Max Speed</p>
            </div>
            <div className={classes.flexColCenter}>
              <span className={classes.font18}>{avgSpeed} kph</span>
              <p>Avg Speed</p>
            </div>
            <div className={classes.flexColCenter}>
              <span className={classes.font18}>{totalSpeedViolations}</span>
              <p>Speed Violations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripCard;
