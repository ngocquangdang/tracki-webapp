import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStyles } from './styles';

export default function Hibernate(props) {
  const classes = useStyles();
  const [wakeUpMode, setWakeUpMode] = useState('auto');
  const [showSubNotification, setShowSubNotification] = useState('');

  const handleChangeWakeUpMode = e => {
    setWakeUpMode(e.target.value);
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
        {showSubNotification === 'option' && (
          <>
            <div className={classes.listSubNotifi}>
              <RemoveIcon className={classes.iconNotifi} />
              <p className={classes.notifySubTitleContent}>xxxxx</p>
            </div>
            <div className={classes.listSubNotifi}>
              <RemoveIcon className={classes.iconNotifi} />
              <p className={classes.notifySubTitleContent}>xxxxx</p>
            </div>
          </>
        )}
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
        {showSubNotification === 'update' && (
          <div className={classes.listSubNotifi}>
            <RemoveIcon className={classes.iconNotifi} />
            <p className={classes.notifySubTitleContent}>xxxxx</p>
          </div>
        )}
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
        {showSubNotification === 'hibernation' && (
          <div className={classes.listSubNotifi}>
            <RemoveIcon className={classes.iconNotifi} />
            <p className={classes.notifySubTitleContent}>xxxxx</p>
          </div>
        )}
      </div>
      <div className={classes.hibernateOption}>
        <RadioGroup value={wakeUpMode} onChange={handleChangeWakeUpMode}>
          <div className={classes.radiobutton}>
            <FormControlLabel
              key="auto"
              value="auto"
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
          <div className={classes.radiobutton}>
            <FormControlLabel
              key="120"
              value="120"
              control={<Radio color="primary" />}
              label="Update location every 2 hours"
            />
            <span className={classes.subOption}>
              12 to 15 days battery life
            </span>
          </div>
          <div className={classes.radiobutton}>
            <FormControlLabel
              key="180"
              value="180"
              control={<Radio color="primary" />}
              label="Update location every 3 hours"
            />
            <span className={classes.subOption}>
              12 to 15 days battery life
            </span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
