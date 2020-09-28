import React, { useState } from 'react';
import Modal from '@Components/modals';
import { Switch } from '@material-ui/core';
import { useStyles } from './styles';
export default function PushSetting(props) {
  const classes = useStyles();
  const { notificationPush, handleCloseNotificationPush } = props;
  const [begin, setBegin] = useState(false);
  const [end, setEnd] = useState(false);
  const handleModeBegin = e => setBegin(e.target.checked);
  const handleModeEnd = e => setEnd(e.target.checked);
  return (
    <div>
      <Modal
        title="Notifications"
        open={notificationPush}
        handleClose={handleCloseNotificationPush}
      >
        <>
          <p className={classes.title}>Push</p>
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
