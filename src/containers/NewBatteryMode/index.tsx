import React, { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import TabPanel from './tabPanel';

import { Hibernate, Timer, Scheduler } from './Components';
import { useStyles, TabStyle } from './styles';
import { firebaseLogEventRequest } from '@Utils/firebase';
interface Props {
  trackingModeRequest(settingId, setting): void;
  trackerSettings: any,
}

export default function NewBatteryMode(props: Props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { trackingModeRequest, trackerSettings } = props;

  useEffect(
    () => firebaseLogEventRequest('tracking_mode', 'battery_saver_mode'),
    []
  );

  const getFirebaseEventBateryMode = key => {
    switch (key) {
      case 1:
        return 'timer_battery_mode';
      case 2:
        return 'scheduler_battery_mode';
      default:
        return 'hibernation_battery_mode';
    }
  };

  const handleChange = (event, newValue: any) => {
    firebaseLogEventRequest(
      'battery_saver_mode',
      getFirebaseEventBateryMode(newValue)
    );
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
        variant="scrollable"
      >
        <TabStyle label="Hibernate" className={classes.tabItem} />
        {/* <TabStyle label="Timer" className={classes.tabItem} /> */}
        {/* <TabStyle label="Scheduler" className={classes.tabItem} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Hibernate
          trackingModeRequest={trackingModeRequest}
          trackerSettings={trackerSettings}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Timer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Scheduler />
      </TabPanel> */}
    </>
  );
}
