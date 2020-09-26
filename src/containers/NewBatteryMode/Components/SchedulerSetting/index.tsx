import React, { useState } from 'react';
import Modal from '@Components/modals';

import { useStyles } from './styles';
import { Switch } from '@material-ui/core';
import PushSetting from './components/Push';
import VibrationSetting from './components/Vibration';

export default function SchedulerSetting(props) {
  const classes = useStyles();
  const { handleCloseSetting, isSchedulerSettings } = props;

  const [modeStatus, setModeStatus] = useState(false);
  const [notificationPush, setNotificationPush] = useState(false);
  const [notificationVibration, setNotificationVibration] = useState(false);

  const handleModeStatus = e => setModeStatus(e.target.checked);
  const handleShowNotificationPush = () => setNotificationPush(true);
  const handleCloseNotificationPush = () => setNotificationPush(false);
  const handleShowNotificationVibration = () => setNotificationVibration(true);
  const handleCloseNotificationVibration = () =>
    setNotificationVibration(false);

  return (
    <>
      <Modal
        title="Settings"
        open={isSchedulerSettings}
        handleClose={handleCloseSetting}
      >
        <div>
          <div className={classes.settingCard}>
            <p className={classes.title}>Generate</p>
            <div className={classes.option}>
              <div className={classes.statusMode}>
                <div>24h Mode</div>
                <Switch
                  name="email_notifications"
                  checked={modeStatus}
                  onChange={handleModeStatus}
                  color="primary"
                />
              </div>
            </div>
          </div>
          <div className={classes.settingCard}>
            <p className={classes.title}>Notifications</p>
            <div className={classes.option}>
              <div
                className={classes.typeOption}
                onClick={handleShowNotificationPush}
              >
                Push
              </div>
              <hr className={classes.line} />
              <div
                className={classes.typeOption}
                onClick={handleShowNotificationVibration}
              >
                Vibration
              </div>
            </div>
          </div>
        </div>
        <PushSetting
          notificationPush={notificationPush}
          handleCloseNotificationPush={handleCloseNotificationPush}
        />
        <VibrationSetting
          notificationVibration={notificationVibration}
          handleCloseNotificationVibration={handleCloseNotificationVibration}
        />
      </Modal>
    </>
  );
}
