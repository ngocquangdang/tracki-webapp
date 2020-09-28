import React, { useState } from 'react';
import { Button } from '@Components/buttons';
import moment from 'moment';

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useStyles } from './styles';
export default function Timer(props) {
  const classes = useStyles();
  const [showSubNotification, setShowSubNotification] = useState('');

  const [timer, setTimer] = useState({
    sleep: 0.25,
    awake: 0.25,
  });
  const range = [0, 60];

  const rangeSleep = timer.sleep * (range[1] - range[0]) + range[0];
  const rangeAwake = timer.awake * (range[1] - range[0]) + range[0];

  const onRangeSleep = sleep => setTimer({ ...timer, sleep });
  const onRangeAwake = awake => setTimer({ ...timer, awake });

  const onShowSubNotifi = (typeNotify: string) => () =>
    setShowSubNotification(typeNotify);
  const onHiddenSubNotifi = () => setShowSubNotification('');

  const onStartTimer = () => {
    const timeSleep = moment().unix() * 1000 + rangeSleep * 60;
    const timeWake = timeSleep + rangeAwake * 60;
    console.log('onStartTimer -> timeWake', timeWake);
  };

  return (
    <>
      <div>
        <>
          <p className={classes.title}>Sleep Timer</p>
          <p className={classes.subTitle}>Set countdown timer to turn OFF/ON</p>
        </>
        <div className={classes.notifications}>
          <div className={classes.notifyHeader}>
            <AiOutlineInfoCircle className={classes.iconNotifiHeader} />
            <p className={classes.notifyTitle}>
              Waring - Do not use battery saver for Real-Time tracking
            </p>
          </div>
          <div className={classes.notifySubTitle}>
            {showSubNotification === 'option' ? (
              <RemoveIcon
                className={classes.iconNotifi}
                onClick={onHiddenSubNotifi}
              />
            ) : (
              <AddIcon
                className={classes.iconNotifi}
                onClick={onShowSubNotifi('option')}
              />
            )}
            <p className={classes.notifySubTitleContent}>
              Read more about battery save mode options
            </p>
          </div>
          <div className={classes.listSubNotifi}></div>
          <div className={classes.notifySubTitle}>
            {showSubNotification === 'update' ? (
              <RemoveIcon
                className={classes.iconNotifi}
                onClick={onHiddenSubNotifi}
              />
            ) : (
              <AddIcon
                className={classes.iconNotifi}
                onClick={onShowSubNotifi('update')}
              />
            )}
            <p className={classes.notifySubTitleContent}>
              Read more about automation updates
            </p>
          </div>
          <div className={classes.notifySubTitle}>
            {showSubNotification === 'hibernation' ? (
              <RemoveIcon
                className={classes.iconNotifi}
                onClick={onHiddenSubNotifi}
              />
            ) : (
              <AddIcon
                className={classes.iconNotifi}
                onClick={onShowSubNotifi('hibernation')}
              />
            )}
            <p className={classes.notifySubTitleContent}>
              Read more about hibernation
            </p>
          </div>
        </div>
        <div className={classes.timerGroup}>
          <div className={classes.sleep}>
            <p className={classes.titleRangeTime}>Go to sleep in: </p>
            <CircularInput value={timer.sleep} onChange={onRangeSleep}>
              <CircularTrack stroke="#eeeeee" strokeWidth={5} />
              <CircularProgress stroke="#168449" strokeWidth={5} />
              <CircularThumb
                fill="#168449"
                stroke="#168449"
                strokeWidth="5"
                r={5}
              />
              <text
                className={classes.timeData}
                x={100}
                y={100}
                textAnchor="middle"
                dy="0.3em"
                fontWeight="bold"
              >
                {Math.round(rangeSleep)}:00
              </text>
            </CircularInput>
          </div>
          <div className={classes.awake}>
            <p className={classes.titleRangeTime}>Waker up after: </p>
            <CircularInput value={timer.awake} onChange={onRangeAwake}>
              <CircularTrack stroke="#eeeeee" strokeWidth={5} />
              <CircularProgress stroke="#168449" strokeWidth={5} />
              <CircularThumb
                fill="#168449"
                stroke="#168449"
                strokeWidth="5"
                r={5}
              />
              <text
                className={classes.timeData}
                x={100}
                y={100}
                textAnchor="middle"
                dy="0.3em"
                fontWeight="bold"
              >
                {Math.round(rangeAwake)}:00
              </text>
            </CircularInput>
          </div>
        </div>
        <div className={classes.timeSetting}>
          <Button text="START" onClick={onStartTimer} color="primary"></Button>
          <Button text="SETTINGS" color="primary"></Button>
        </div>
      </div>
    </>
  );
}
