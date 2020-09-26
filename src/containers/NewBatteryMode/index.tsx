import React, { useState } from 'react';
import { Tabs } from '@material-ui/core';
import TabPanel from './tabPanel';

import { Hibernate, Timer, Scheduler } from './Components';

import { useStyles, TabStyle } from './styles';
export default function NewBatteryMode(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue: any) => {
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
        <TabStyle label="Timer" className={classes.tabItem} />
        <TabStyle label="Scheduler" className={classes.tabItem} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Hibernate />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Timer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Scheduler />
      </TabPanel>
    </>
  );
}
