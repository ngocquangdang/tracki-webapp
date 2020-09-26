import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';

export default function Hibernate(props) {
  const classes = useStyles();
  const [wakeUpMode, setWakeUpMode] = useState('');

  const handleChangeWakeUpMode = e => {
    setWakeUpMode(e.target.value);
  };
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
          <p className={classes.notifyTitle}>
            Waring - Do not use battery saver for Real-Time tracking
          </p>
        </div>
        <div className={classes.notifySubTitle}>
          <p className={classes.notifySubTitleContent}>
            Read more about battery save mode options
          </p>
        </div>
        <div className={classes.notifySubTitle}>
          <p className={classes.notifySubTitleContent}>
            Read more about automation updates
          </p>
        </div>
        <div className={classes.notifySubTitle}>
          <p className={classes.notifySubTitleContent}>
            Read more about hibernation
          </p>
        </div>
      </div>
      <div className={classes.hibernateOption}>
        <FormControlLabel
          checked
          control={<Radio color="primary" />}
          label={
            <>
              <span>Full Change Mode</span>
              <br />
              <span>Restore tracker to receive automatic updates</span>
            </>
          }
        />
        <RadioGroup
          value={wakeUpMode}
          onChange={handleChangeWakeUpMode}
          name="speed_unit"
        >
          <FormControlLabel
            key="120"
            value="120"
            control={<Radio color="primary" />}
            label={
              <>
                <span>Update location every 2 hours</span>
                <br />
                <span>12 to 15 days battery life</span>
              </>
            }
          />
          <FormControlLabel
            key="180"
            value="180"
            control={<Radio color="primary" />}
            label={
              <>
                <span>Update location every 3 hours</span>
                <br />
                <span>12 to 15 days battery life</span>
              </>
            }
          />
        </RadioGroup>
      </div>
    </div>
  );
}
