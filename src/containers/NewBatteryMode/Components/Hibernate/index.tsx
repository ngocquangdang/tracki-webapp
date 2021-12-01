import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import { HIBERNATE_OPTION } from '@Containers/NewBatteryMode/store/constants';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { firebaseLogEventRequest } from '@Utils/firebase';
import { useStyles } from './styles';
interface Props {
  trackingModeRequest(settingId, setting): void;
  trackerSettings: any;
}

export default function Hibernate(props: Props) {
  const { trackingModeRequest, trackerSettings } = props;
  const classes = useStyles();
  const [wakeUpMode, setWakeUpMode] = useState('');
  const [showSubNotification, setShowSubNotification] = useState('');

  useEffect(() => {
    if (trackerSettings) {
      const { sleep } = trackerSettings.preferences.scheduled_sleep;
      setWakeUpMode(String(sleep));
    }
  }, [trackerSettings]);

  useEffect(() => firebaseLogEventRequest('hibernation_battery_mode', ''), []);

  const getFirebaseEventHibernate = key => {
    switch (key) {
      case '120':
        return 'update_location_2hours_hibernate';
      case '180':
        return 'update_location_3hours_hibernate';
      default:
        return 'full_change_mode_hibernate';
    }
  };
  const handleChangeWakeUpMode = e => {
    firebaseLogEventRequest(
      'hibernation_battery_mode',
      getFirebaseEventHibernate(e.target.value)
    );
    setWakeUpMode(e.target.value);
    const body = {
      ...trackerSettings,
      preferences: {
        ...trackerSettings.preferences,
        scheduled_sleep: {
          ...trackerSettings.preferences.scheduled_sleep,
          sleep: Number(e.target.value),
        },
      },
    };
    trackingModeRequest(trackerSettings.id, body);
  };

  const onShowSubNotifi = (typeNotify: string) => () =>
    setShowSubNotification(typeNotify);
  const onHiddenSubNotifi = () => setShowSubNotification('');

  return (
    <div>
      <>
        <p className={classes.title}>Hibernation Mode</p>
        <p className={classes.subTitle}>
          Maximize battery life, while i hibernamtion mode, tracker will turn ON
          only to track at specifoed intervals
        </p>
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
      <div className={classes.hibernateOption}>
        <RadioGroup value={wakeUpMode} onChange={handleChangeWakeUpMode}>
          <div className={classes.radiobutton}>
            <FormControlLabel
              key="auto"
              value="0"
              control={<Radio color="primary" />}
              label="Full Change Mode"
            />
            <span className={classes.subOption}>
              Restore tracker to receive automatic updates
            </span>
          </div>
          <p className={classes.selection}>
            Select interval to wake up while a hibernation mode:
          </p>
          {HIBERNATE_OPTION.map(({ label, value, key, text }) => {
            return (
              <div className={classes.radiobutton} key={key.toString()}>
                <FormControlLabel
                  key={key}
                  value={value}
                  control={<Radio color="primary" />}
                  label={label}
                />
                <span className={classes.subOption}>{text}</span>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
