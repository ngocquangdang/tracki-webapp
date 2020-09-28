import React, { useState } from 'react';
import Modal from '@Components/modals';
import { useStyles } from './styles';
import { Switch } from '@material-ui/core';

export default function VibrationSetting(props) {
  const classes = useStyles();
  const { notificationVibration, handleCloseNotificationVibration } = props;
  const [begin, setBegin] = useState(false);
  const [end, setEnd] = useState(false);
  const handleModeBegin = e => setBegin(e.target.checked);
  const handleModeEnd = e => setEnd(e.target.checked);
  return (
    <div>
      <Modal
        title="Notifications"
        open={notificationVibration}
        handleClose={handleCloseNotificationVibration}
      >
        <>
          <p className={classes.title}>Virbation</p>
          <div className={classes.option}>
            <div className={classes.statusMode}>
              <div>At the beginning</div>
              <Switch
                name="begin"
                checked={begin}
                onChange={handleModeBegin}
                color="primary"
              />
            </div>
          </div>
          <div className={classes.option}>
            <div className={classes.statusMode}>
              <div>At the end</div>
              <Switch
                name="end"
                checked={end}
                onChange={handleModeEnd}
                color="primary"
              />
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}
