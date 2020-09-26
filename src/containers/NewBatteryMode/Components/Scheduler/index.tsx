import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

import { useStyles, ListItemStyle } from './styles';
import SchedulerSetting from '../SchedulerSetting';
import AddScheduler from '../AddScheduler';

export default function Scheduler(props) {
  const classes = useStyles();
  const [isSchedulerSettings, setIsSchedulerSetting] = useState(false);
  const [isAddScheduler, setAddScheduler] = useState(false);

  const handleShowSetting = () => setIsSchedulerSetting(true);
  const handleCloseSetting = () => setIsSchedulerSetting(false);
  const handleShowAddScheduler = () => setAddScheduler(true);
  const handleCloseAddScheduler = () => setAddScheduler(false);

  return (
    <div>
      <>
        <p className={classes.title}>Battery Saver Scheduler</p>
        <p className={classes.subTitle}>
          Create schedules by setting the day and time you want to set tracker
          OFF/ON from the schedule list like alarm
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
      <div className={classes.scheduleContainer}>
        <div className={classes.scheduleContent}>
          <ListItemStyle button>
            <div className={classes.scheduleCard}>
              <div className={classes.leftCard}>
                <div className={classes.scheduleDetail}>
                  <div className={classes.timer}>12:20 PM</div>
                  <div className={classes.activeCalender}>
                    MO TU WE TH FR SA SU
                  </div>
                </div>

                <div className={classes.scheduleSubDetail}>
                  <div className={classes.scheduleName}>"schedule 1"</div>
                  <div className={classes.scheduleNextStatus}>Turn OFF</div>
                </div>
              </div>
              <div className={classes.rightCard}>
                <div className={classes.scheduleStatus}>ON</div>
              </div>
            </div>{' '}
          </ListItemStyle>
          <div className={classes.scheduleAction}>
            <IconButton color="primary" onClick={handleShowSetting}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleShowAddScheduler}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <SchedulerSetting
        isSchedulerSettings={isSchedulerSettings}
        handleCloseSetting={handleCloseSetting}
      />
      <AddScheduler
        isAddScheduler={isAddScheduler}
        handleCloseAddScheduler={handleCloseAddScheduler}
      />
    </div>
  );
}
