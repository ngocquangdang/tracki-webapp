import React, { useState } from 'react';
import moment from 'moment';
import { IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SettingsIcon from '@material-ui/icons/Settings';

import { useStyles, ListItemStyle } from './styles';
import SchedulerSetting from '../SchedulerSetting';
import AddScheduler from '../AddScheduler';
import { DAY, initialScheduler } from '../../store/constants';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Scheduler(props) {
  const classes = useStyles();
  const [isSchedulerSettings, setIsSchedulerSetting] = useState(false);
  const [isAddScheduler, setAddScheduler] = useState(false);
  // const schedulerList = initialScheduler || [];
  const [initialSchedulerData, setInitialData] = useState(
    initialScheduler || []
  );
  console.log('Scheduler -> initialSchedulerData', initialSchedulerData);
  const [showSubNotification, setShowSubNotification] = useState('');

  const handleShowSetting = () => setIsSchedulerSetting(true);
  const handleCloseSetting = () => setIsSchedulerSetting(false);
  const handleShowAddScheduler = () => setAddScheduler(true);
  const handleCloseAddScheduler = () => setAddScheduler(false);

  const onInitialData = data => setInitialData([...initialSchedulerData, data]);

  const onChangeStatusOfSchedule = (id: number) => () => {
    const { type, status } = { type: 'ON', status: 'OFF' };
    const newStatus = {
      status: type,
      type: status,
    };
    console.log('onChangeStatusOfSchedule -> newStatus', newStatus);
  };

  const onShowSubNotifi = (typeNotify: string) => () =>
    setShowSubNotification(typeNotify);
  const onHiddenSubNotifi = () => setShowSubNotification('');

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
      <div className={classes.scheduleContainer}>
        <div className={classes.scheduleContent}>
          {initialSchedulerData &&
            initialSchedulerData.map(scheduler => (
              <ListItemStyle
                button
                className={`${scheduler.status === 'OFF' && classes.typeOff}`}
                key={scheduler.id}
              >
                <div className={classes.scheduleCard}>
                  <div className={classes.leftCard}>
                    <div className={classes.scheduleDetail}>
                      <div className={classes.timer}>
                        {scheduler.time.endTime ? (
                          <span>
                            {`${moment(scheduler.time.startTime * 1000).format(
                              'LT'
                            )} -  
                              ${moment(scheduler.time.endTime * 1000).format(
                                'LT'
                              )}`}
                          </span>
                        ) : (
                          <>
                            {moment(scheduler.time.startTime * 1000).format(
                              'LT'
                            )}
                          </>
                        )}
                      </div>
                      <div className={classes.activeCalender}>
                        {DAY.map(day => (
                          <p
                            key={day.key}
                            className={`${classes.day} ${
                              scheduler.day.includes(day.key)
                                ? classes.typeBold
                                : classes.typeNormal
                            }`}
                          >
                            {day.key}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className={classes.scheduleSubDetail}>
                      <div className={classes.scheduleName}>
                        {scheduler.name}
                      </div>
                      <div className={classes.scheduleNextStatus}>
                        Turn{' '}
                        {scheduler.status === 'ON' ||
                        scheduler.status === 'ON/OFF'
                          ? 'OFF'
                          : scheduler.type}
                      </div>
                    </div>
                  </div>
                  <div className={classes.rightCard}>
                    <div
                      className={classes.scheduleStatus}
                      onClick={onChangeStatusOfSchedule(scheduler.id)}
                    >
                      {scheduler.status}
                    </div>
                  </div>
                </div>
              </ListItemStyle>
            ))}

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
        onInitialData={onInitialData}
      />
    </div>
  );
}
