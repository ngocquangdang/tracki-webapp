import React from 'react';

import { useStyles } from './styles';
export default function Timer(props) {
  const classes = useStyles();
  return (
    <div>
      <>
        <p className={classes.title}>Sleep Timer</p>
        <p className={classes.subTitle}>Set countdown timer to turn OFF/ON</p>
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
    </div>
  );
}
