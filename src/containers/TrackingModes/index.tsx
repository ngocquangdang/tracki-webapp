import React, { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import Modal from '@Components/modals';

import { SNACK_PAYLOAD } from '@Containers/Snackbar/store/constants';

import { TabStyle, useStyles } from './styles';
import TabPanel from './tabPanel';

import TrackingMode from '@Containers/FastTracking';
// import BatteryMode from '@Containers/BatteryMode';
import NewBatteryMode from '@Containers/NewBatteryMode';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  showModal: boolean;
  handleCloseModal(): void;
  t(key: string): string;
  trackerSettings: any;
  tracker: any;
  extendsBatteryModeRequest(settingId, setting): void;
  showSnackbar(data: SNACK_PAYLOAD): void;
  isRequesting?: boolean;
  trackingModeRequest(settingId, setting): void;
}

export default function TrackingModes(props: Props) {
  const classes = useStyles();
  const {
    showModal,
    handleCloseModal,
    // t,
    trackerSettings,
    showSnackbar,
    // isRequesting,
    trackingModeRequest,
  } = props;

  const [value, setValue] = useState(0);

  useEffect(() => firebaseLogEventRequest('tracking_mode', ''), []);

  const handleChange = (event, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Modal
      title="Tracking Modes"
      open={showModal}
      handleClose={handleCloseModal}
      className={classes.modal}
    >
      <>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          <TabStyle label="Full Tracking Mode" className={classes.tabItem} />
          <TabStyle label="Battery Saver Mode" className={classes.tabItem} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TrackingMode
            trackerSettings={trackerSettings}
            trackingModeRequest={trackingModeRequest}
            showSnackbar={showSnackbar}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <BatteryMode
            t={t}
            trackerSettings={trackerSettings}
            tracker={tracker}
            extendsBatteryModeRequest={extendsBatteryModeRequest}
            showSnackbar={showSnackbar}
            isRequesting={isRequesting}
          /> */}
          <NewBatteryMode
            trackerSettings={trackerSettings}
            trackingModeRequest={trackingModeRequest}
            showSnackbar={showSnackbar}
          />
        </TabPanel>
      </>
    </Modal>
  );
}
